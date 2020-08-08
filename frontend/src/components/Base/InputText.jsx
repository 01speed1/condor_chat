import React from "react";

export default function InputText({
  placeholder,
  type,
  value,
  handleOnChange,
  errors,
  handleOnKeyUp,
}) {
  return (
    <div className="formField">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value } }) => handleOnChange(value)}
        onKeyUp={handleOnKeyUp}
      />
      <span>{errors && Object.values(errors)}</span>
    </div>
  );
}

InputText.defaultProps = {
  handleOnKeyUp: () => {},
};
