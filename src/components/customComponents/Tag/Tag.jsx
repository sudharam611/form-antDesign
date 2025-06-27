import React from "react";
import styles from "./Tag.module.css";
import PropTypes from "prop-types";

const Tag = ({ text, style }) => {
  return <span className={`${styles[style]}`}>{text}</span>;
};
Tag.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string,
};
export default Tag;
