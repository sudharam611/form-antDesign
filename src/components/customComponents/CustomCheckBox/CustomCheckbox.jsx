import React from "react";
import styles from "./CustomCheckbox.module.css";
import PropTypes from "prop-types";

const CustomCheckbox = ({
  checked,
  onChange,
  disabled,
  children,
  name,
  id,
}) => {
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
CustomCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
};
export default CustomCheckbox;
