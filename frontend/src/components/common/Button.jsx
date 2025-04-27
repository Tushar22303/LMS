import React from "react";
import "../../styles/Button.css";

const Button = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn btn btn-${variant} btn-${size}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
