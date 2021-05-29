import React from "react";
import { useState } from "react";
import Select from 'react-select';

export const SheduleBlock = () => {
  const groups = [
    { value: 'RT-21', label: 'RT-21' },
    { value: 'GH-11', label: 'GH-11' },
    { value: 'VG-67', label: 'VG-67' },
  ];
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
    const days = [
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четверг",
        "П'ятниця",
        "Субота",
    ];
    const lessons = [
        { number: 1, timeStart: "8:30", timeFinish: "9:50" },
        { number: 2, timeStart: "10:00", timeFinish: "11:20" },
        { number: 3, timeStart: "11:30", timeFinish: "12:50" },
        { number: 4, timeStart: "13:10", timeFinish: "14:30" },
        { number: 5, timeStart: "14:40", timeFinish: "16:00" },
        { number: 6, timeStart: "16:10", timeFinish: "17:30" },
        { number: 7, timeStart: "17:40", timeFinish: "19:00" },
        { number: 8, timeStart: "19:10", timeFinish: "20:30" },
    ];

    const shedules = [];

    return (
        <div className="shedule-block">
            <div className="shedule-block__title">Що чекає на тижні?</div>

            <label className="shedule-block__select-group--lable" for={"group"}>
                Оберіть вашу групу:
            </label>
            <Select
                value={selectedGroup}
                onChange={setSelectedGroup}
                id={"group"}
                className="shedule-block__select-group"
                options={groups}
            />

            <div className="shedule-block__section--weeks">
                <span
                    className={`shedule-block__section--weeks-item ${
                        selectedWeek === 1 ? "active" : ""
                    }`}
                    onClick={() => setSelectedWeek(1)}
                >
                    1 тиждень
                </span>
                <span
                    className={`shedule-block__section--weeks-item ${
                        selectedWeek === 2 ? "active" : ""
                    }`}
                    onClick={() => setSelectedWeek(2)}
                >
                    2 тиждень
                </span>
            </div>

            <div className="shedule-block__section">
                {days.map((day, number) => (
                    <div
                        className={`shedule-block__section--one-day ${
                            number === 2 ? "active" : ""
                        }`}
                    >
                        <span className="shedule-block__section--one-day--name">
                            {day}
                        </span>
                        {lessons.map((lesson, numberLesson) => (
                            <div
                                className={`shedule-block__section--one-day--lesson-block ${
                                    numberLesson > 3 ? "empty" : ""
                                }`}
                            >
                                <div className="shedule-block__section--one-day--lesson-block--time">
                                    <span>{lesson.timeStart}</span>
                                    <span>{lesson.timeFinish}</span>
                                </div>
                                <div className="shedule-block__section--one-day--lesson-block--subject">
                                    <div className="shedule-block__section--one-day--lesson-block--subject-name">
                                        {numberLesson <= 3
                                            ? "Computing"
                                            : "Пусто"}
                                    </div>
                                    <div className="shedule-block__section--one-day--lesson-block--subject-cabinet">
                                        Building 1, ауд. 564
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
