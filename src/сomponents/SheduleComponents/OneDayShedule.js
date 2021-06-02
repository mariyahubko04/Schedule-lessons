import React from "react";

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

export const SheduleBlock = (days, currendDayWeek) => {
    return (
        <div className="shedule-block__section">
            {days.map((day, number) => {
                return (
                    <div
                        key={`1-${number}`}
                        className={`shedule-block__section--one-day ${
                            number === currendDayWeek ? "active" : ""
                        }`}
                    >
                        <span className="shedule-block__section--one-day--name">
                            {day}
                        </span>

                        {lessons.map((lesson, numberLesson) => (
                            <OneLesson
                                lesson={lesson}
                                numberLesson={numberLesson}
                                sheduleByGroup={sheduleByGroup}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
