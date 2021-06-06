import React from 'react';
import { useState } from 'react';

import { TeacherItem } from './TeacherItem';

export const TeachersInfo = ({ prevTeachers, academicStatus }) => {
  const [teachers, setTeachersInfo] = useState(prevTeachers);
  const [newTeachers, setNewTeachersInfo] = useState([]);

  const setUpdatedTeachers = (newValue, id) => {
    const updatedTeachers = teachers.map(item => {
      if (item.id !== id) return { ...item, ...newValue };
      return item;
    });
    setTeachersInfo(updatedTeachers);
  };

  const setUpdatedNewTeachers = (newValue, id) => {
    const updatedTeachers = newTeachers.map(item => {
      if (item.id !== id) return { ...item, ...newValue };
      return item;
    });
    setNewTeachersInfo(updatedTeachers);
  };

  const deleteTeacher = (id) => {
    const updatedTeachers = teachers.filter(item => item.id !== id);
    setTeachersInfo(updatedTeachers);
  };

  const deleteNewTeacher = (id) => {
    const updatedTeachers = newTeachers.filter(item => item.id !== id);
    setNewTeachersInfo(updatedTeachers);
  };

  const addNewTeacher = () => {
    setNewTeachersInfo([...newTeachers, {
      id: Date.now(),
      firstname: '',
      lastname: '',
      middlename: '',
      academ_status: (academicStatus.data || [])[0] || { id: '', name: ''},
      email: ''
    }]);
  };

  const isDisabled = () => {
    return teachers.some(item => !item.firstname || !item.lastname || !item.middlename) ||
      newTeachers.some(item => !item.firstname || !item.lastname || !item.middlename || !item.email);
  };

  return <div className='teachers'>
    <h1>Виберіть завірених викладачів</h1>

    <div className='teachers-block'>
      <p className='additional-text'>Завірений</p>

      {teachers.map(item =>
        <TeacherItem
          key={`teacher-${item.id}`}
          prevTeacher={item}
          academicStatus={academicStatus.data || []}
          setUpdatedTeacher={setUpdatedTeachers}
          deleteTeacher={deleteTeacher}
        />
      )}

      {newTeachers.map(item =>
        <TeacherItem
          key={`new-teacher-${item.id}`}
          isNewTeacher={true}
          prevTeacher={item}
          academicStatus={academicStatus.data || []}
          setUpdatedTeacher={setUpdatedNewTeachers}
          deleteTeacher={deleteNewTeacher}
        />
      )}
    </div>

    <div className='btn-block'>
        <button className="added-btn" onClick={addNewTeacher}>
            <img src="images/plus.svg" alt="added" />
        </button>

        <button
          className="teachers-save-btn"
          disabled={isDisabled()}
        >
          Зберегти
        </button>
    </div>
  </div>;
};