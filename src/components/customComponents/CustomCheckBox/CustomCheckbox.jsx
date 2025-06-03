import React from "react";
import styles from "./CustomCheckbox.module.css";
const CustomCheckbox = ({
  checked,
  onChange,
  disabled,
  children,
  name,
  id,
}) => {
  // console.log(checked);
  const checkboxId = id || name;

  return (
    <div className={styles["checkbox-section"]}>
      <label htmlFor={checkboxId} className={styles["checkbox-label"]}>
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles["checkbox"]}
        />
        {children}
      </label>
    </div>
  );
};

export default CustomCheckbox;
