import React from "react";

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

export default Flex;
