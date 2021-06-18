import React, { useState } from "react";

export const CabinetItem = ({ id, prevNumber, floor, setCabinets, setIsSuccess }) => {
  const [cabinet, setCabinet] = useState(prevNumber);
  const [isError, setIsError] = useState(false);
  const max = floor ? (floor + 1) * 100 - 1 : 999;
  const min = floor ? floor * 100 : 1;

  const handleChange = (e) => {
    const { value } = e.target;

    if (value && (value < min || value > max)) {
      setIsError(true);
    } else {
      setIsError(false);
      setCabinets(items => items.map(item => {
        if (item.id == id) return { ...item, number: value };
        return item;
      }))
    }

    setIsSuccess(false);
    setCabinet(value);
  };

  return (
    <label className={(isError || !cabinet) ? 'error' : ''}>
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
