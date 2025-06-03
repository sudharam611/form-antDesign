import React from "react";
import styles from "./Header.module.css";
const Header = ({ heading, description }) => {
  return (
    <div>
      <h3 className={styles["heading"]}>{heading}</h3>
      <p className={styles["description"]}>{description}</p>
    </div>
  );
};

export default Header;
