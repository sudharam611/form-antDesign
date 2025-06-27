import React from "react";
import styles from "./InputNumeric.module.css";
import PropTypes from "prop-types";

const InputNumeric = ({ min = 0, max = 100, value, onChange, status }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };
  return (
    <div className={styles["input-number-field"]}>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className={`${styles["form-input"]} ${styles["default"]} ${
          styles[`form-input-${status}`]
        }`}
      />
    </div>
  );
};

InputNumeric.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.oneOf(["success", "error", "warning", "info", "default"]),
};
export default InputNumeric;
