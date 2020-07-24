import React, { useState } from "react";
import Game from "./Game";

export default function App() {
  const [boardSize, setBoardSize] = useState(3);

  const changeBoardSize = (e) => {
    const val = e.target.value;
    if (val >= 3) setBoardSize(parseInt(val));
  };

  return (
    <>
      <label htmlFor="boardSize">Board Size:</label>
      <input
        type="number"
        id="boardSize"
        name="boardSize"
        className="size-input"
        value={boardSize}
        onChange={changeBoardSize}
      />
      <Game key={boardSize} boardSize={boardSize} />
    </>
  );
}