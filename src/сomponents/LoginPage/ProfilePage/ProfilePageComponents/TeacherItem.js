import React from 'react';
import { useState } from 'react';

import Select from "react-select";

export const TeacherItem = ({ isNewTeacher, prevTeacher, academicStatus, deleteTeacher, setUpdatedTeacher }) => {
  const { id, name } = prevTeacher.academ_status || {};
  const [item, setTeacher] = useState(prevTeacher);
  const [status, setStatus] = useState({ value: id, label: name });
  const [fio, setFio] = useState(`${item.firstname} ${item.middlename} ${item.lastname}`);
  const [email, setEmail] = useState(item.email);
  const [isActiveTeacher, setIsActiveTeacher] = useState(true);
  const optionsStatus = academicStatus.map(item => ({ value: item.id, label: item.name }));

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

  const setNewName = (e) => {
    const { value } = e.target;
    setFio(value);
    const names = value.split(' ');
    setUpdatedTeacher({
      firstname: names[0],
      middlename: names[1],
      lastname: names[2],
    }, id)
  };

  const changeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    setUpdatedTeacher({ email: value }, id)
  };

  const setNewStatus = (value) => {
    setStatus(value);
    setUpdatedTeacher({ academ_status: { id: value.value, name: value.label } }, id);
  }

  return <div className='one-teacher'>
    <div key={item.id} className='teachers-block__item'>
      <input
        type='text'
        onChange={setNewName}
        value={fio}
        // placeholder={'Введіть ПІБ викладача'}
      />

      <button onClick={() => deleteTeacher(item.id)}>
        <img src='images/delete.svg' alt='delete' />
      </button>

      <input
        className='active-teacher'
        type='checkbox'
        checked={isActiveTeacher}
        onChange={() => setIsActiveTeacher(!isActiveTeacher)}
      />
    </div>

    <div className='teachers-info'>
      <Select
        value={status}
        onChange={setNewStatus}
        options={optionsStatus}
        id={"status"}
        className="status"
        styles={customStyles('23px', 'transparent')}
      />

      {!isNewTeacher ?
        <div>
          {item.email}
        </div> 
        : <input
        type='text'
        value={email}
        onChange={changeEmail}
        //placeholder='Введіть електронну адресу'
      />}
    </div>
  </div>
};