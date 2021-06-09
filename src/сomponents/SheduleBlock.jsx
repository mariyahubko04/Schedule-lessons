import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { getSheduleByGroup } from "../api/getDates";
import { SelectGroup } from "./SheduleComponents/SelectGroup";
import { OneDayShedule } from './SheduleComponents/OneDayShedule';
import { WeeksBlock } from './SheduleComponents/WeeksBlock';

const days = [
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
];

export const SheduleBlock = ({groups}) => {
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedGroup, setSelectedGroup] = useState();
    const [sheduleByGroup, setSheduleByGroup] = useState({ 1: {}, 2: {} });
    const date = new Date();
    // счет начинается с воскресенья, а у проекте с пн, поэтому отнимаем 1 день
    const currendDayWeek = date.getDay() - 1;

    const getSheduleByGroupId = async (groupId) => {
        if (!groupId) return;

        try {
            const sheduleByGroup = await getSheduleByGroup(groupId);
            if (sheduleByGroup) {
                const result = { 1: {}, 2: {} };

                for (let i = 0; i < sheduleByGroup.length; i++) {
                    const lesson = sheduleByGroup[i];
                    const {
                        parity,
                        week_day,
                        lesson_number,
                        subject,
                        lesson_type,
                        teacher,
                        audience,
                        id,
                    } = lesson;
                    const { day_number } = week_day;
                    const { academ_status, firstname, lastname, middlename } =
                        teacher;
                    if (!result[parity][day_number])
                        result[parity][day_number] = {};
                    result[parity][day_number][lesson_number] = {
                        id,
                        name: {
                            value: (subject || {}).id,
                            label: (subject || {}).name,
                        },
                        lessonType: {
                            value: (lesson_type || {}).id,
                            label: (lesson_type || {}).name,
                        },
                        teacher: {
                            status: {
                                value: (academ_status || {}).id,
                                label: (academ_status || {}).name,
                            },
                            fio: {
                                value: (teacher || {}).id,
                                label: `${firstname} ${middlename} ${lastname}`,
                            },
                        },
                        cabinet: {
                            value: (audience || {}).id,
                            label: (audience || {}).number,
                        },
                    };
                }

                setSheduleByGroup(result);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const defoultGroup = groups[0];
        setSelectedGroup(defoultGroup);
    }, []);

    useEffect(() => {
        // при выборе группы запрашиваем новое расписание
        if (selectedGroup) getSheduleByGroupId(selectedGroup.value);
    }, [selectedGroup]);

    return (
        <div className="shedule-block">
            <div className="shedule-block__title">
                Що чекає на тижні?
            </div>

            <SelectGroup
                groups={groups}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
            />

            <WeeksBlock
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
            />

            <div className="shedule-block__section">
                {days.map((day, number) => {
                    const isActive = number === currendDayWeek;

                    return <OneDayShedule
                        key={`1-${number}`}
                        sheduleByDay={(sheduleByGroup[selectedWeek] || {})[number + 1]}
                        day={day}
                        isActive={isActive}
                    />;
                })}
            </div>
        </div>
    );
};
