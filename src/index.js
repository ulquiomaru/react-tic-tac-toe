import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import "./style/index.css";

const boardSize = 5;

ReactDOM.render(<Game size={boardSize} />, document.getElementById("root"));
