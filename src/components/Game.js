import React, { useState } from "react";
import Board from "./Board";

export default function Game(props) {
  const nSquares = Math.pow(props.boardSize, 2);

  const winningCombinations = getTicTacToeCombinations(
    props.boardSize,
    props.match
  );

  const getInitialBoard = () => {
    return [
      {
        squares: Array(Math.pow(props.boardSize, 2)).fill(null),
        lastMove: [],
      },
    ];
  };

  const [history, setHistory] = useState(getInitialBoard());
  const [stepNumber, setStepNumber] = useState(0);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const xIsNext = () => stepNumber % 2 === 0;

  const calculateWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const line = winningCombinations[i];
      const player = squares[line[0]];
      if (!player) continue;
      const boardLine = line.map((index) => squares[index]);
      const set = [...new Set(boardLine)];
      if (set.length === 1 && set[0] === player)
        return { player: squares[line[0]], winningSquares: line };
    }
    return null;
  };

  const handleClick = (i) => {
    const h = history.slice(0, stepNumber + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext() ? "X" : "O";
    const row = Math.floor(i / props.boardSize);
    const col = i % props.boardSize;
    setHistory(
      h.concat([
        {
          squares: squares,
          lastMove: [row, col],
        },
      ])
    );
    setStepNumber(h.length);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((h, step) => {
    const desc = step
      ? `Go to move #${step} (${h.lastMove[0]}, ${h.lastMove[1]})`
      : "Go to game start";
    return (
      <li key={step}>
        <button
          style={
            stepNumber === step
              ? { fontWeight: "bold" }
              : { fontWeight: "normal" }
          }
          onClick={() => setStepNumber(step)}
        >
          {desc}
        </button>
      </li>
    );
  });

  if (!ascendingOrder) moves.sort((a, b) => b.key - a.key);

  let status;
  if (winner) {
    status = "Winner: " + winner.player;
  } else if (nSquares === stepNumber) {
    status = "Game ended in a DRAW";
  } else {
    status = "Next player: " + (xIsNext() ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningSquares={winner ? winner.winningSquares : null}
        />
      </div>
      <div className="game-info">
        <div>
          <i
            className={ascendingOrder ? "arrow up" : "arrow down"}
            onClick={() => setAscendingOrder(!ascendingOrder)}
          />
        </div>
        <div>{status}</div>
        <ol start={0}>{moves}</ol>
      </div>
    </div>
  );
}

function getTicTacToeCombinations(size, match) {
  let rows = [];
  let columns = [];
  let diagonals = [];
  const threshold = size - match;

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      let x = col + row * size;
      if (col <= threshold) {
        let row = [];
        for (let i = 0; i < match; i++) {
          row.push(x + i);
        }
        rows.push(row);
      }
      if (row <= threshold) {
        let column = [];
        for (let i = 0; i < match; i++) {
          column.push(x + i * size);
        }
        columns.push(column);
        if (col >= match - 1) {
          let diagonal = [];
          for (let i = 0; i < match; i++) {
            diagonal.push(x - i + i * size);
          }
          diagonals.push(diagonal);
        }
        if (col <= threshold) {
          let diagonal = [];
          for (let i = 0; i < match; i++) {
            diagonal.push(x + i + i * size);
          }
          diagonals.push(diagonal);
        }
      }
    }
  }

  console.log(diagonals);
  return [...rows, ...columns, ...diagonals];
}
