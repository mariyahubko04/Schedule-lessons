import React, { useState, useEffect } from "react";
import Select from "react-select";

import { setNewLesson, editLesson, deleteLesson } from '../../api/getDates';

export const OneLesson = ({ lesson, lessonInfo, isCancel, selectedGroup, isSave, isEdit, subjectNames, cabinets, teachers, lessonTypes, parity, week_day_id }) => {
    const emptyValue = { value: null, label: "Пусто" };
    const { id, name, cabinet, teacher, lessonType } = lessonInfo || { name: '', cabinet: '', teacher: '', lessonType: '' };
    const [selectedName, setName] = useState(name || emptyValue);
    const [selectedCabinet, setCabinet] = useState(cabinet || emptyValue);
    const [selectedTeacherFio, setTeacherFio] = useState(teacher.fio || emptyValue);
    const [selectedTeacherStatus, setTeacherStatus] = useState(teacher.status || emptyValue);
    const [selectedLessonType, setLessonType] = useState(lessonType || emptyValue);

    const setLessonInfo = () => {
        setName(name || emptyValue);
        setTeacherFio(teacher.fio || emptyValue);
        setTeacherStatus(teacher.status || emptyValue);
        setCabinet(cabinet || emptyValue);
        setLessonType(lessonType || emptyValue);
    };

    const setEmptyLessonInfo = () => {
        setName(emptyValue);
        setTeacherFio(emptyValue);
        setTeacherStatus(emptyValue);
        setCabinet(emptyValue);
        setLessonType(emptyValue);
    };


    useEffect(() => setLessonInfo(), [lessonInfo]);

    useEffect(() => {
        setLessonInfo();
    }, [isCancel]);

    useEffect(() => {
        if(!selectedName.value) setEmptyLessonInfo();
    }, [selectedName.value]);

    useEffect(() => {
        (async () => {
            try {
                if (isSave) {
                    if(!selectedName.value && id) {
                        await deleteLesson(id);
                    }

                    if(!selectedName.value ||
                        !selectedTeacherFio.value ||
                        !lesson.number ||
                        !selectedLessonType.value ||
                        !selectedCabinet.value ||
                        !parity ||
                        !week_day_id
                    ) return;

                    const req = {
                        subject_id: selectedName.value,
                        teacher_id: selectedTeacherFio.value,
                        time_id: lesson.number,
                        lesson_type_id: selectedLessonType.value,
                        audience_id: selectedCabinet.value,
                        group_id: selectedGroup.value,
                        parity,
                        week_day_id,
                    };

                    if (!id) {
                        await setNewLesson(req);
                    } else {
                        await editLesson(id, req);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [isSave]);

    const customStyles = (height, background) => ({
        control: (provided, state) => ({
            ...provided,
            background: background || '#fff',
            border: 'none',
            minHeight: height,
            height,
            boxShadow: state.isFocused ? null : null,
            cursor: 'pointer'
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            height,
            padding: '0 13px',
        }),

        input: (provided, state) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height,
            transform: 'scale(2)'
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'inherit'
        }),
        option: (base, state) => ({
            ...base,
            color: 'black',
            fontSize: '17px'
        })
    });

    return (
        <div
            className={`shedule-block__section--one-day--lesson-block ${name ? "" : "empty"}`}
        >
            <div className="shedule-block__section--one-day--lesson-block--time">
                <span>{lesson.timeStart}</span>
                <span>{lesson.timeFinish}</span>
            </div>

            <div className="shedule-block__section--one-day--lesson-block--subject">
                <div className="shedule-block__section--one-day--lesson-block--subject-name">
                    {isEdit ? <Select
                        value={selectedName}
                        onChange={setName}
                        options={[{ value: null, label: 'Пусто'} , ...subjectNames]}
                        id={"group"}
                        className="shedule-block__select-group subject-name"
                        isDisabled={!isEdit}
                        styles={customStyles('35px')}
                    /> : <p className="subject-name">{selectedName.label}</p>}

                    {isEdit ? (
                        <>
                            <Select
                                value={selectedTeacherFio}
                                onChange={setTeacherFio}
                                options={teachers}
                                id={"teacher"}
                                className="teacher"
                                styles={customStyles('24px')}
                            />
                        </>
                    ) : selectedName.label && <p className="teacher">
                        {`${selectedTeacherFio.label}(${selectedTeacherStatus.label})`}
                    </p>}
                </div>

                <div className="shedule-block__section--one-day--lesson-block--subject-cabinet">
                    {isEdit ? (
                        <>
                            <Select
                                value={selectedLessonType}
                                onChange={setLessonType}
                                options={lessonTypes}
                                id={"lessonType"}
                                className="lessonType"
                                styles={customStyles('25px', 'transparent')}
                            />
                            <Select
                                value={selectedCabinet}
                                onChange={setCabinet}
                                options={cabinets}
                                id={"cabinet"}
                                className="cabinet"
                                styles={customStyles('25px', 'transparent')}
                            />
                        </>
                    ): selectedName.label && `${selectedLessonType.label || ""} / ауд. ${selectedCabinet.label}`}
                </div>
            </div>
        </div>
    );
};