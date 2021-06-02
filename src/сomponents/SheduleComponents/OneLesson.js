import React from "react";

export const OneLesson = (lesson, numberLesson, sheduleByGroup ) => {
  const lessonInfo =
  (sheduleByGroup[selectedWeek][number + 1] ||
    {})[numberLesson + 1] || {};
const { name, cabinet, teacher, lessonType } =
  lessonInfo;

    return (
        <div
            key={`lesson-${number}-${numberLesson}`}
            className={`shedule-block__section--one-day--lesson-block ${
                name ? "" : "empty"
            }`}
        >
            <div className="shedule-block__section--one-day--lesson-block--time">
                <span>{lesson.timeStart}</span>
                <span>{lesson.timeFinish}</span>
            </div>
            <div className="shedule-block__section--one-day--lesson-block--subject">
                <div className="shedule-block__section--one-day--lesson-block--subject-name">
                    <p className="subject-name">{name || "Пусто"}</p>
                    <p className="teacher">
                        {name ? `${teacher.fio} (${teacher.status})` : ""}
                    </p>
                </div>
                <div className="shedule-block__section--one-day--lesson-block--subject-cabinet">
                    {name ? `${lessonType || ""} / ауд. ${cabinet}` : ""}
                </div>
            </div>
        </div>
    );
};
