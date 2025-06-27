import React from "react";
import styles from "./CustomToolTip.module.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const CustomToolTip = ({ tooltip }) => {
  return (
    <span className={styles["tooltip-container"]}>
      <QuestionCircleOutlined />
      <span className={styles["tooltip-text"]}>{tooltip}</span>
    </span>
  );
};
CustomToolTip.propTypes = {
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default CustomToolTip;
