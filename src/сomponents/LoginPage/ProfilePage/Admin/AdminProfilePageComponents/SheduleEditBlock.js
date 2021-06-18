import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { OneDayShedule } from '../../../../SheduleComponents/OneDayShedule';
import { SelectGroup } from '../../../../SheduleComponents/SelectGroup';
import { WeeksBlock } from '../../../../SheduleComponents/WeeksBlock';

import { getSheduleByGroup } from '../../../../../actions/shedule';

const days = {
  1: { label: "Понеділок", abbreviation: "Пн", value: 1 },
  2: { label: "Вівторок", abbreviation: "Вт", value: 2 },
  3: { label: "Середа", abbreviation: "Ср", value: 3 },
  4: { label: "Четвер", abbreviation: "Чт", value: 4 },
  5: { label: "П'ятниця", abbreviation: "Пт", value: 5 },
  6: { label: "Субота", abbreviation: "Сб", value: 6 },
};

const SheduleEditBlock = ({ isAdmin, groups, prevSubjects, prevCabinets, prevTeachers, prevLessonTypes, sheduleFromStore, dispatch }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [sheduleByGroup, setSheduleByGroup] = useState({ 1: {}, 2: {} });
  const [subjectNames, setSubjectNames] = useState([]);
  const [cabinets, setCabinets] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [lessonTypes, setLessonTypes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const getSheduleByGroupId = async (groupId) => {
    if (!groupId ) return;

    try {
      const sheduleByGroup = await dispatch(getSheduleByGroup(groupId));
      getSheduleObj(sheduleByGroup);
    } catch (err) {
      console.error(err);
    }
  };

  const getSheduleObj = (sheduleByGroup) => {
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
          id
        } = lesson;
        const { day_number } = week_day;
        const { academ_status, firstname, lastname, middlename } =
          teacher;
        if (!result[parity][day_number])
          result[parity][day_number] = {};
        result[parity][day_number][lesson_number] = {
          id,
          name: { value: (subject || {}).id, label: (subject || {}).name },
          lessonType: { value: (lesson_type || {}).id, label: (lesson_type || {}).name },
          teacher: {
            status: { value: (academ_status || {}).id, label: (academ_status || {}).name },
            fio: { value: (teacher || {}).id, label: `${firstname} ${middlename} ${lastname}` },
          },
          cabinet: { value: (audience || {}).id, label: (audience || {}).number },
        };
      }

      setSheduleByGroup(result);
    }
  };

  const getSubjectsOptions = (subjects) => {
    const data = subjects || [];
    return data.map(item => ({ value: item.id, label: item.name }));
  };

  const getCabinetsOptions = (cabinets) => {
    const data = cabinets || [];
    return data.map(item => ({ value: item.id, label: item.number }));
  };

  const getTeachersOptions = (teachers) => {
    const data = teachers || [];
    return data.map(item => ({ value: item.id, label: `${item.firstname} ${item.middlename} ${item.lastname} (${item.academ_status.name})` }));
  };

  const getAllData = async () => {
    try {
      setSubjectNames(getSubjectsOptions(prevSubjects));
      setCabinets(getCabinetsOptions(prevCabinets));
      setTeachers(getTeachersOptions(prevTeachers));
      setLessonTypes(getSubjectsOptions(prevLessonTypes));
    } catch (err) {
      console.error(err);
    }
  };

  const cancelChanged = () => {
    setIsEdit(false);
    setIsCancel(isCancel => !isCancel);
  };

  const saveLesson = () => {
    setIsSave(true);
    setIsEdit(false);
  };

  const handleNexDay = (isNext) => {
    let newSelectedDay = +selectedDay;

    if (isNext) {
      newSelectedDay = +selectedDay === Object.keys(days).length ? 1 : +selectedDay + 1;
    } else {
      newSelectedDay = +selectedDay === 1 ? Object.keys(days).length : +selectedDay - 1;
    }

    setSelectedDay(newSelectedDay);
  };

  useEffect(() => {
    const defoultGroup = groups[0];

    setSelectedGroup(defoultGroup);
    getAllData();
  }, []);

  useEffect(() => { getSheduleObj(sheduleFromStore); }, [sheduleFromStore]);

  useEffect(() => {
    // при выборе группы запрашиваем новое расписание
    if (selectedGroup) getSheduleByGroupId(selectedGroup.value);
  }, [selectedGroup]);

  return (
      <div className={`shedule-edit ${isEdit ? 'edit-mode': ''}`}>
          <SelectGroup
              isEdit={isEdit}
              groups={groups}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
          />

          <div className="setting-block">
              <WeeksBlock
                  isEdit={isEdit}
                  selectedWeek={selectedWeek}
                  setSelectedWeek={setSelectedWeek}
              />

              <div className={`day-week ${ isEdit ? 'disabled' : ''}`}>
                  {Object.keys(days).map((day) => (
                      <span
                        key={day}
                        onClick={() => !isEdit ? setSelectedDay(day) : {}}
                        className={day == selectedDay ? "active" : ""}
                      >
                          {days[day].abbreviation}
                      </span>
                  ))}
              </div>

              {isAdmin && <div className="btn-block">
                  <button
                    className="red"
                    disabled={!isEdit}
                    onClick={cancelChanged}
                  >
                    <img src="images/cancel.png" alt="cancel" />
                  </button>

                  <button
                    className="blue"
                    disabled={!isEdit}
                    onClick={saveLesson}
                  >
                    <img src="images/save.png" alt="save" />
                  </button>

                  <button
                    className="blue"
                    disabled={isEdit}
                    onClick={() => setIsEdit(isEdit => !isEdit)}
                  >
                    <img src="images/edit.png" alt="edit" />
                  </button>
              </div>}
          </div>

          {!isEdit && <button
            className="prev-btn"
            onClick={() => handleNexDay(false)}
          />}

          {<OneDayShedule
              isActive={true}
              isSave={isSave}
              isEdit={isEdit}
              isCancel={isCancel}
              day={days[selectedDay].label}
              sheduleByDay={sheduleByGroup[selectedWeek][selectedDay]}
              subjectNames={subjectNames}
              cabinets={cabinets}
              teachers={teachers}
              lessonTypes={lessonTypes}
              week_day_id={selectedDay}
              parity={selectedWeek}
              selectedGroup={selectedGroup}
          />}

          {!isEdit && <button
            className="next-btn"
            onClick={() => handleNexDay(true)}
          />}
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sheduleFromStore: state.shedule.shedules,
    groupsFromStore: state.shedule.groups
  };
};

const connectedSheduleEditBlock = connect(mapStateToProps)(SheduleEditBlock);
export { connectedSheduleEditBlock as SheduleEditBlock };