import React, { useState } from "react";
import { useEffect } from "react";
import PhoneInput from 'react-phone-number-input/input';
import Select from "react-select"; 

import { getAllAcademicStatus, setRegistration } from '../../api/getDates';

const customStyles = (height, background) => ({
  control: (provided, state) => ({
      ...provided,
      background: background || '#fff',
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

export const RegistrationForm = ({ groups }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfitmation, setPasswordConfitmation] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [academStatusId, setAcademStatusId] = useState({value: '', label: ''});
  const [groupId, setGroupId] = useState(groups[0]);
  const [academicStatus, setAcademicStatus] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const academicStatus = await getAllAcademicStatus();

        const academicStatusOptions = academicStatus.data.map(item => ({ value: item.id, label: item.name }));
        setAcademicStatus(academicStatusOptions);
        setAcademStatusId(academicStatusOptions[0]);
      } catch (err) {
        if(err) setError(JSON.stringify(err));
        console.log(err);
      }
    })();
  }, [])

  const saveUser = async () => {
    const req = {
      firstname,
      lastname,
      middlename,
      email,
      password,
      password_confitmation: passwordConfitmation,
      is_teacher: isTeacher,
    };

    if (isTeacher) {
      req['academ_status_id'] = academStatusId.value;
    } else {
      req['group_id'] = groupId.value;
    }

    try {
      const result = await setRegistration(req);
      console.log('result', result, req);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setError('');
  }, [firstname,
    lastname,
    middlename,
    email,
    password,
    passwordConfitmation,
    isTeacher,
    academStatusId,
    groupId]);

  return (
    <div>
      <h2>Зареєструватися</h2>

      <form className="authorization-block__form" onSubmit={saveUser}>
        <label
          className="authorization-block__form--field-label"
        >
          Введіть ваше Прізвише Ім'я по батькові
          <div className='authorization-block__form--field'>
            <input
              type="text"
              maxLength={50}
              required
              placeholder="Прізвище"
              onChange={e => setFirstname(e.target.value)}
            />

            <input
              type="text"
              maxLength={50}
              required
              placeholder="Ім'я"
              onChange={e => setMiddlename(e.target.value)}
            />

            <input
              type="text"
              maxLength={50}
              required
              placeholder="По батькові"
              onChange={e => setLastname(e.target.value)}
            />

            <div>
              <label className="authorization-block__form--field-label--checked">
                <input type='checkbox' onChange={() => setIsTeacher(isTeacher => !isTeacher)}/>
                Зареєструватися як викладач
              </label>
            </div>
            </div>
        </label>

        <div className="authorization-block__form--field">
          <label
            className="authorization-block__form--field-label"
          >
            Введіть вашу електронну пошту
            <input
              type="email"
              maxLength={50}
              required
              placeholder="Електронна пошта"
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label
            className="authorization-block__form--field-label"
          >
            Введіть ваш номер телефону
            <PhoneInput
              //country="UA"
              placeholder="Мобільний телефон"
              required
              onChange={() => {}} 
            />
          </label>

          <label
            className="authorization-block__form--field-label"
          >
            Вигадайте пароль
            <input
              type="password"
              maxLength={50}
              required
              placeholder="Пароль"
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <label
            className="authorization-block__form--field-label"
          >
            Повторіть пароль
            <input
              type="password"
              maxLength={50}
              required
              placeholder="Повторіть пароль"
              onChange={e => setPasswordConfitmation(e.target.value)}
            />
          </label>

          {!isTeacher ?
            <div className="authorization-block__form--field-label">
              Оберіть групу
              <Select
                value={groups[0]}
                onChange={setGroupId}
                options={groups}
                id={"groups"}
                className="groups"
                styles={customStyles('44px')}
              />
            </div>
            : <div
                className="authorization-block__form--field-label"
              >
              Оберіть академічний статус
              <Select
                value={academStatusId}
                onChange={setAcademStatusId}
                options={academicStatus}
                id={"academic-status"}
                className="academic-status"
                styles={customStyles('44px')}
              />
            </div>
          }
        </div>

        <div className='error-text'>
          {error}
        </div>

        <button
          className="btn authorization-block__form--field-btn-login"
          type="submit"
        >
          Зареєструватися
      </button>
      </form>
    </div>
  );
};