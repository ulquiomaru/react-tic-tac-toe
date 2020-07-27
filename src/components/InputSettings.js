import React from "react";

export default function InputSettings(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="number"
        id={props.name}
        name={props.name}
        className="size-input"
        value={props.value}
        onChange={props.onChange}
      />{" "}
    </>
  );
}
