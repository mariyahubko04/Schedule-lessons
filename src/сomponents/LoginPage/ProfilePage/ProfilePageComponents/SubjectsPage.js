import React, { useState } from 'react';

export const SubjectsPage = ({ prevSubjects }) => {
  const [subject, setSubjects] = useState(prevSubjects.data);

  return <div className='subjects'>
    <h1>Список всіх предметів</h1>

    <div className='subjects-block'>
      {subject.map(item =>
        <div key={item.id} className='subjects-block__item'>
          <input disabled={true} value={item.name} />

          <button>x</button>

          <input type='checkbox'></input>
        </div>
      )}
    </div>

    <button className="subjects-save-btn">Зберегти</button>
  </div>;
};