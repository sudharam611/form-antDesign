import React from "react";
import { useFormContext } from "../../Form/Form";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({
  type,
  variant = "secondary",
  children,
  disabled: propDisabled,
}) => {
  const { resetForm, fillForm, disabled: formDisabled } = useFormContext();

  const isDisabled = formDisabled || propDisabled;
  const handleClick = (e) => {
    if (isDisabled) return;
    if (type === "reset") {
      e.preventDefault();
      resetForm();
    } else if (type === "fill") {
      e.preventDefault();
      fillForm();
    }
  };

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={handleClick}
      className={`${styles["button-item"]} ${styles[variant]}`}
      disabled={isDisabled}
    >
      {children || type}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "reset", "fill"]).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  children: PropTypes.node,
  disabled: PropTypes.bool,
};
export default Button;
