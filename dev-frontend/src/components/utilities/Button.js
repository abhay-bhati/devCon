import React from "react";
import "../../styles/Button.css";

function Button(props) {
  return (
    <div className="button">
      <button style={props.style} onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
