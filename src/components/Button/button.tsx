import React from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import "./button.scss";
import { ButtonProps } from "../../models/types";

const Button: React.FC<ButtonProps> = ({ text, color = "primary", disabled = false, onClick, type }): React.JSX.Element => {
  let buttonClass = `btn btn--${color}`;
  if (type) {
    buttonClass += ` btn--${type}`;
  }

  if (disabled) {
    buttonClass += " btn--disabled";
  }

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {type === "previous" && <FaAngleDoubleLeft />}
      {text}
      {type === "next" && <FaAngleDoubleRight />}
    </button>
  );
};

export default Button;
