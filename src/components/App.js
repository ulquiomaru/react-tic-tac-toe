import React, { useState } from "react";
import Game from "./Game";

export default function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [match, setMatch] = useState(3);

  const changeBoardSize = (e) => {
    const val = e.target.value;
    if (val >= 3) setBoardSize(parseInt(val));
  };

  const changeMatchCondition = (e) => {
    const val = e.target.value;
    if (val >= 3 && val <= boardSize) setMatch(parseInt(val));
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
      <label htmlFor="boardMatch">Match Condition:</label>
      <input
        type="number"
        id="boardMatch"
        name="boardMatch"
        className="size-input"
        value={match}
        onChange={changeMatchCondition}
      />
      <Game key={`${boardSize},${match}`} boardSize={boardSize} match={match} />
    </>
  );
}
