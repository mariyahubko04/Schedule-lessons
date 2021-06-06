import React from "react";

import { OneLesson } from './OneLesson';

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

export const OneDayShedule = ({ day, isActive, sheduleByDay, isEdit, subjectNames, cabinets, teachers, lessonTypes}) => {
    return (
        <div
            className={`shedule-block__section--one-day ${isActive ? "active" : ""}`}
        >
            <span className="shedule-block__section--one-day--name">
                {day}
            </span>

            {lessons.map((lesson, numberLesson) => (
                <OneLesson
                    key={`edit-${numberLesson}${subjectNames}${day}`}
                    isEdit={isEdit}
                    lesson={lesson}
                    lessonInfo={(sheduleByDay || {})[numberLesson + 1]}
                    subjectNames={subjectNames}
                    cabinets={cabinets}
                    teachers={teachers}
                    lessonTypes={lessonTypes}
                />
            ))}
        </div>
    );
};