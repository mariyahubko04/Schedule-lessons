import React from 'react';
import { useState } from 'react';

export const TeachersInfo = ({ prevTeachers }) => {
  const [teachers, setTeachersInfo] = useState(prevTeachers);

  return <div className='teachers'>
    <h1>Виберіть завірених викладачів</h1>

    <div className='subjects-block'>
      {teachers.map(item =>
        <div key={item.id} className='teachers-block__item'>
          <input disabled={true} value={`${item.firstname} ${item.middlename} ${item.lastname}`} />

          <button>x</button>

          <input type='checkbox'></input>
        </div>
      )}
    </div>

    <button className="teachers-save-btn">Зберегти</button>
  </div>;
};