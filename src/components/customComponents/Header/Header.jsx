import React from "react";
import styles from "./Header.module.css";
import PropTypes from "prop-types";

const Header = ({ heading, description }) => {
  return (
    <div>
      <h3 className={styles["heading"]}>{heading}</h3>
      <p className={styles["description"]}>{description}</p>
    </div>
  );
};
Header.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
};
export default Header;
