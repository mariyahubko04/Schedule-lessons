import React, { useState } from "react";

export const CabinetItem = ({ prevNumber, floor }) => {
  const [cabinet, setCabinet] = useState(prevNumber);
  const [isError, setIsError] = useState(false);
  const max = (floor + 1) * 100 - 1;
  const min = floor * 100;

  const handleChange = (e) => {
    const { value } = e.target;

    if (value < min || value > max) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    setCabinet(value);
  };

  return (
    <label className={isError ? 'error' : ''}>
      <input
        max={max}
        min={min}
        type='number'
        value={cabinet}
        onChange={handleChange}
      />
    </label>
  );
};
