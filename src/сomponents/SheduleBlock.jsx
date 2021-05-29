import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";

import { getGroups, getSheduleByGroup } from "../api/getDates";

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

export const SheduleBlock = () => {
    const [groups, setGroups] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedGroup, setSelectedGroup] = useState();
    const [sheduleByGroup, setSheduleByGroup] = useState([]);

    const getSheduleByGroupId = async (groupId) => {
        try {
            const sheduleByGroup = await getSheduleByGroup(groupId);
            if (sheduleByGroup) setSheduleByGroup(sheduleByGroup);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const groups = await getGroups();
                console.log("groups", groups);
                if (groups) {
                    //{ value: 'VG-67', label: 'VG-67' },
                    setGroups(groups);
                    const defoultGroup = groups[0];
                    setSelectedGroup({
                        label: defoultGroup,
                        value: defoultGroup,
                    });

                    //await getSheduleByGroupId(defoultGroup);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        // при выборе группы запрашиваем новое расписание
        if(selectedGroup) getSheduleByGroupId(selectedGroup);
    }, [selectedGroup]);

    return (
        <div className="shedule-block">
            <div className="shedule-block__title">Що чекає на тижні?</div>

            <label
                className="shedule-block__select-group--lable"
                htmlFor={"group"}
            >
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
                        key={`1-${number}`}
                        className={`shedule-block__section--one-day ${
                            number === 2 ? "active" : ""
                        }`}
                    >
                        <span className="shedule-block__section--one-day--name">
                            {day}
                        </span>

                        {lessons.map((lesson, numberLesson) => (
                            <div
                                key={`lesson-${number}-${numberLesson}`}
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
