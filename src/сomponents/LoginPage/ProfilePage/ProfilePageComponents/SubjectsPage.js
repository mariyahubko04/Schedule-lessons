import React, { useState } from 'react';

import { OneSubject } from './OneSubject';

export const SubjectsPage = ({ prevSubjects }) => {
  const [subjects, setSubjects] = useState(prevSubjects.data);
  const [newSubjects, setNewSubjects] = useState([]);

  const addNewSubject = () => {
    setNewSubjects([...newSubjects, { id: Date.now(), name: '' }]);
  };

  const deleteNewSubject = (id) => {
    setNewSubjects(newSubjects.filter((item) => item.id !== id));
  };

  const deleteCurrentSubject = (id) => {
    setSubjects(subjects.filter((item) => item.id !== id));
  };

  const setNewSubject = (id, name) => {
    setNewSubjects(newSubjects.map((item) => {
      if (item.id === id) return { ...item, name };
      return item;
    }));
  };

  const setSubject = (id, name) => {
    setSubjects(subjects.map((item) => {
      if (item.id === id) return { ...item, name };
      return item;
    }));
  };

  const isDisabled = () => {
    return subjects.some(item => !item.name) || newSubjects.some(item => !item.name);
  };

  return (
    <div className="subjects">
      <h1>Список всіх предметів</h1>

      <div className="subjects-block">
        {subjects.map(item => (
          <OneSubject
            key={item.id}
            id={item.id}
            prevSubject={item.name}
            setNewSubject={setSubject}
            deleteSubject={deleteCurrentSubject}
          />
        ))}

        {newSubjects.map((item, number) => (
          <OneSubject
            key={`new-subj-${number}`}
            id={item.id}
            prevSubject={item.name}
            setNewSubject={setNewSubject}
            deleteSubject={deleteNewSubject}
          />
        ))}
      </div>

      <div className='btn-block'>
        <button className="added-btn" onClick={addNewSubject}>
          <img src="images/plus.svg" alt="added" />
        </button>

        <button 
          className="subjects-save-btn"
          disabled={isDisabled()}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};