import React, { useState } from "react";
import InputSettings from "./InputSettings";
import Game from "./Game";

export default function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [match, setMatch] = useState(3);

  const changeBoardSize = (e) => {
    const val = e.target.value;
    if (val < 3) return;
    setBoardSize(parseInt(val));
    if (val < match) setMatch(val);
  };

  const changeMatchCondition = (e) => {
    const val = e.target.value;
    if (val >= 3 && val <= boardSize) setMatch(parseInt(val));
  };

  return (
    <>
      <InputSettings
        name="boardSize"
        label="Board Size:"
        value={boardSize}
        onChange={changeBoardSize}
      />
      <InputSettings
        name="winCondition"
        label="Win Condition:"
        value={match}
        onChange={changeMatchCondition}
      />
      <Game key={`${boardSize},${match}`} boardSize={boardSize} match={match} />
    </>
  );
}
