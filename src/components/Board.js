import React from "react";
import Square from "./Square";

export default function Board(props) {
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
