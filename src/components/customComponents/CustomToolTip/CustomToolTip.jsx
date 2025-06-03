import React from "react";
import styles from "./CustomToolTip.module.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
const CustomToolTip = ({ tooltip }) => {
  return (
    <span className={styles["tooltip-container"]}>
      <QuestionCircleOutlined />
      <span className={styles["tooltip-text"]}>{tooltip}</span>
    </span>
  );
};
export default CustomToolTip;
