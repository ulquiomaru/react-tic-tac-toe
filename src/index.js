import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const boardSize = 5;

function Square(props) {
  return (
    <button
      className={props.winner ? "square highlighted" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Board(props) {
  const size = Math.sqrt(props.squares.length);

  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        winner={props.winningSquares ? props.winningSquares.includes(i) : null}
        key={i}
      />
    );
  };

  const board = [];
  for (let row = 0; row < size; row++) {
    let boardRow = [];
    for (let col = row * size; col < size * (row + 1); col++) {
      boardRow.push(renderSquare(col));
    }
    board.push(
      <div className="board-row" key={row}>
        {boardRow}
      </div>
    );
  }

  return <div>{board}</div>;
}

function Game(props) {
  const nSquares = Math.pow(props.size, 2);

  const winningCombinations = getTicTacToeCombinations(props.size);

  const [history, setHistory] = useState([
    {
      squares: Array(nSquares).fill(null),
      lastMove: [],
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const xIsNext = () => {
    return stepNumber % 2 === 0;
  };

  const calculateWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const line = winningCombinations[i];
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { player: squares[a], winningSquares: line };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const h = history.slice(0, stepNumber + 1);
    const current = h[h.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext() ? "X" : "O";
    const row = Math.floor(i / props.size);
    const col = i % props.size;
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
        <div>{status}</div>
        <div>
          <i
            className={ascendingOrder ? "arrow up" : "arrow down"}
            onClick={() => setAscendingOrder(!ascendingOrder)}
          ></i>
        </div>
        <ol start={0}>{moves}</ol>
      </div>
    </div>
  );
}

function getTicTacToeCombinations(size) {
  let rows = [];
  let columns = [];
  let diagonals = [];

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      let x = col + row * size;
      if (col < size - 2) {
        rows.push([x, x + 1, x + 2]);
        if (row < size - 2)
          diagonals.push([x, x + 1 + 1 * size, x + 2 + 2 * size]);
      }
      if (row < size - 2) {
        columns.push([x, x + 1 * size, x + 2 * size]);
        if (col >= 2) diagonals.push([x, x - 1 + 1 * size, x - 2 + 2 * size]);
      }
    }
  }

  return [...rows, ...columns, ...diagonals];
}

// ========================================

ReactDOM.render(<Game size={boardSize} />, document.getElementById("root"));
