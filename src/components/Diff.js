import React from "react";
import * as jsdiff from "diff";

const Diff = ({ oldValue, newValue }) => {
  const diff = jsdiff.diffWords(oldValue, newValue);
  const result = diff
    .filter((part) => !part.removed)
    .map(function (part, index) {
      const spanStyle = {
        color: part.added ? "#FF6075" : "grey",
      };
      return (
        <span key={index} style={spanStyle}>
          {part.value}
        </span>
      );
    });

  return <div className="diff-result">{result}</div>;
};

export default Diff;
