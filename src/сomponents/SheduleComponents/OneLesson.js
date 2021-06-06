import React, { useState, useEffect } from "react";
import Select from "react-select";

export const OneLesson = ({ lesson, lessonInfo, isEdit, subjectNames, cabinets, teachers, lessonTypes }) => {
    const emptyValue = { value: null, label: "Пусто" };
    const { name, cabinet, teacher, lessonType } = lessonInfo || { name: '', cabinet: '', teacher: '', lessonType: '' };
    const [selectedName, setName] = useState(emptyValue);
    const [selectedCabinet, setCabinet] = useState(emptyValue);
    const [selectedTeacherFio, setTeacherFio] = useState(emptyValue);
    const [selectedTeacherStatus, setTeacherStatus] = useState(emptyValue);
    const [selectedLessonType, setLessonType] = useState(emptyValue);

    const setLessonInfo = () => {
        setName(name ? { value: name, label: name } : emptyValue);
        setTeacherFio(teacher ? { value: teacher.fio, label: teacher.fio } : emptyValue);
        setTeacherStatus(teacher ? { value: teacher.status, label: teacher.status } : emptyValue);
        setCabinet(cabinet ? { value: cabinet, label: cabinet } : emptyValue);
        setLessonType(lessonType ? { value: lessonType, label: lessonType } : emptyValue);
    };

    useEffect(() => setLessonInfo(), [lessonInfo]);

    useEffect(() => {
        if (!isEdit) setLessonInfo();
    }, [isEdit]);

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
                        options={subjectNames}
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
                    ) : name && <p className="teacher">
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
                    ): name && `${lessonType || ""} / ауд. ${cabinet}`}
                </div>
            </div>
        </div>
    );
};