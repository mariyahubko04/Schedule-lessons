import React, { useState } from 'react';
import { connect } from 'react-redux';

import { editSubject, deleteSubject, setNewSubjectsInServer } from '../../../../actions/shedule';
import { OneSubject } from './OneSubject';

const SubjectsPage = ({ prevSubjects, dispatch }) => {
  const [subjects, setSubjects] = useState(prevSubjects);
  const [newSubjects, setNewSubjects] = useState([]);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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

    if(isSuccess) setIsSuccess(false);
  };

  const isDisabled = () => {
    return subjects.some(item => !item.name) || newSubjects.some(item => !item.name);
  };

  const saveAllSubject = async () => {
    try {
      if (newSubjects.length > 0) {
        for (let i = 0; i < newSubjects.length; i++) {
          await dispatch(setNewSubjectsInServer({ name: newSubjects[i].name }));
          setNewSubject([]);
        }
      }
  
      for (let i = 0; i < prevSubjects.length; i++) {
        const prevSubject = prevSubjects[i];
        const nextSubject = subjects.find(item => item.id === prevSubject.id);
  
        if (!nextSubject) {
          await dispatch(deleteSubject(prevSubject.id));
          continue;
        }
  
        if (nextSubject.name !== prevSubject.name) {
          const req = { name: nextSubject.name };
          await dispatch(editSubject(prevSubject.id, req));
        }
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err.toString());
      console.error(err);
    }
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

      <div className={isSuccess ? 'success-text' : `error-text`}>
          {isSuccess ? 'Дані успішно оновлені' : error}
      </div>

      <div className='btn-block'>
        <button className="added-btn" onClick={addNewSubject}>
          <img src="images/plus.svg" alt="added" />
        </button>

        <button
          className="subjects-save-btn"
          disabled={isDisabled()}
          onClick={saveAllSubject}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

const connectedSubjectsPage = connect()(SubjectsPage);
export { connectedSubjectsPage as SubjectsPage };