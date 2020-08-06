import React, { useState } from "react";
import PropTypes from "prop-types";

function Checkbox({onChange, label}) {

  const [checked, setChecked] = useState(false)


  const handleOnCheck = () => {
    setChecked(!checked)
    onChange(label)
  }

  return (
    <div className="Checkbox">
      <label>
        <input
          type="checkbox"
          value={label}
          checked={checked}
          onChange={handleOnCheck}
        />

        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default Checkbox;
