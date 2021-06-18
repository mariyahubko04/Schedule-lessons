import React from 'react';
import { useState } from 'react';
import { connect } from "react-redux";

import { TeacherItem } from './TeacherItem';
import { deleteUsers, editTeachers } from '../../../../actions/shedule';

const TeachersInfo = ({ prevTeachers, academicStatus, dispatch }) => {
  const [teachers, setTeachersInfo] = useState(prevTeachers);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess]= useState(false);
  console.log('academicStatus', academicStatus);

  const setUpdatedTeachers = (newValue, id) => {
    const updatedTeachers = teachers.map(item => {
      if (item.id === id) return { ...item, ...newValue };
      return item;
    });
    setTeachersInfo(updatedTeachers);
    if(isSuccess) setIsSuccess(false);
    if(error) setError('');
  };

  const deleteTeacher = (id) => {
    const updatedTeachers = teachers.filter(item => item.id !== id);
    setTeachersInfo(updatedTeachers);
  };

  const saveTeacherInfo = async () => {      
    try {
      for (let i = 0; i < prevTeachers.length; i++) {
        const prevTeacher = prevTeachers[i];
        const nextTeacher = teachers.find(item => +item.id === +prevTeacher.id);
  
        if (!nextTeacher) {
          await dispatch(deleteUsers(prevTeacher.id));
          continue;
        }
  
        if (nextTeacher.firstname !== prevTeacher.firstname ||
          nextTeacher.lastname !== prevTeacher.lastname ||
          nextTeacher.middlename !== prevTeacher.middlename ||
          nextTeacher.academ_status.id !== prevTeacher.academ_status.id
        ) {
          const req = {
            firstname: nextTeacher.firstname,
            lastname: nextTeacher.lastname,
            middlename: nextTeacher.middlename,
            academ_status_id: nextTeacher.academ_status.id
          };
          await dispatch(editTeachers(prevTeacher.id, req));
        }
      }
      setIsSuccess(true);
    } catch (err) {
      setError(error.toString());
      console.error(err);
    }
  };

  const isDisabled = () => {
    return teachers.some(item => !item.firstname || !item.lastname || !item.middlename);
  };

  return <div className='teachers'>
    <h1>Виберіть завірених викладачів</h1>

    <div className='teachers-block'>
      <p className='additional-text'>Завірений</p>

      {teachers.map(item =>
        <TeacherItem
          key={`teacher-${item.id}`}
          prevTeacher={item}
          academicStatus={academicStatus || []}
          setUpdatedTeacher={setUpdatedTeachers}
          deleteTeacher={deleteTeacher}
        />
      )}
    </div>

    <div className={isSuccess ? 'success-text' : `error-text`}>
        {isSuccess ? 'Дані успішно оновлені' : error}
    </div>

    <div className='btn-block'>
        <button
          className="teachers-save-btn"
          disabled={isDisabled()}
          onClick={saveTeacherInfo}
        >
          Зберегти
        </button>
    </div>
  </div>;
};

const connectedTeachersInfo = connect()(TeachersInfo);
export { connectedTeachersInfo as TeachersInfo };