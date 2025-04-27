import React from "react";
import "../../styles/InputField.css";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  errorMessage = "",
  customClass = "",
  disabled = false,
}) => {
  return (
    <div className={`form-group ${customClass}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-control"
        disabled={disabled}
      />
      {errorMessage && <small className="text-danger">{errorMessage}</small>}
    </div>
  );
};

export default InputField;
