import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

const PositiveInteger = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    var newValue = Number(e.target.value);
    if (isNaN(newValue) || newValue < 0) { // not integer or negative
      return;
    }
    if (newValue === 0) { // empty input
      setValue("");
    }
    else { // positive integer
      setValue(newValue.toFixed(0));
    }
  };

  return <TextField value={value} onChange={handleChange} />;
};

export default PositiveInteger;