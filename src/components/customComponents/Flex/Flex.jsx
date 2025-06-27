import React from "react";
import PropTypes from "prop-types";

const Flex = ({ justify, children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
};
Flex.propTypes = {
  justify: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
    "start",
    "end",
    "left",
    "right",
  ]),
  children: PropTypes.node.isRequired,
};
export default Flex;
