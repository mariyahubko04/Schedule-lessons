import React, { useState } from 'react';

export const OneSubject = ({ id, prevSubject, deleteSubject, setNewSubject }) => {
  const [subject, setSubject] = useState(prevSubject);

  const changeSubject = (e) => {
    const { value } = e.target;
    setSubject(value);
    setNewSubject(id, value);
  };

  return (
    <div className="subjects-block__item">
      <input
        value={subject}
        onChange={(e) => changeSubject(e)}
      />

      <button onClick={() => deleteSubject(id)}>
        <img src="images/delete.svg" alt="delete" />
      </button>
    </div>
  );
};