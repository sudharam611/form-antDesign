import React from "react";
import styles from "./Tag.module.css";
const Tag = ({ text, style }) => {
  return <span className={`${styles[style]}`}>{text}</span>;
};

export default Tag;
