import React from "react";
import styles from "./InputNumeric.module.css";
const InputNumeric = ({ min = 0, max = 100, value, onChange, status }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    //console.log(inputValue);

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

export default InputNumeric;
