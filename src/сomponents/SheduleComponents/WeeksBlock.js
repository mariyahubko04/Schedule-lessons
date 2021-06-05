import React from "react";

export const WeeksBlock = ({ selectedWeek, setSelectedWeek, isEdit }) =>
    <div className={`shedule-block__section--weeks ${ isEdit ? 'disabled' : ''}`}>
        <span
            className={`shedule-block__section--weeks-item ${selectedWeek === 1 ? "active" : ""}`}
            onClick={() => isEdit ? {} : setSelectedWeek(1)}
        >
            1 тиждень
        </span>
        <span
            className={`shedule-block__section--weeks-item ${selectedWeek === 2 ? "active" : ""}`}
            onClick={() => isEdit ? {} : setSelectedWeek(2)}
        >
            2 тиждень
        </span>
    </div>;