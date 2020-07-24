import React from "react";

export default function Square(props) {
  return (
    <button
      className={props.winner ? "square highlighted" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
