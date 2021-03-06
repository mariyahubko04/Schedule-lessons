import React, { useState } from "react";
import { useEffect } from "react";
import PhoneInput from 'react-phone-number-input/input';
import Select from "react-select"; 
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { setRegistration } from '../../actions/user';
import { getAllAcademicStatus } from '../../actions/shedule';

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

const RegistrationForm = ({ groups, setLoginStatus, dispatch }) => {
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
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const academicStatus = await dispatch(getAllAcademicStatus());

        const academicStatusOptions = academicStatus.map(item => ({ value: item.id, label: item.name }));
        setAcademicStatus(academicStatusOptions);
        setAcademStatusId(academicStatusOptions[0]);
      } catch (err) {
        if(err) setError(JSON.stringify(err));
        console.error(err);
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
      password_confirmation: passwordConfitmation,
      is_teacher: isTeacher,
    };

    if (isTeacher) {
      req['academ_status_id'] = academStatusId.value;
    } else {
      req['group_id'] = groupId.value;
    }

    try {
      const data = await dispatch(setRegistration(req));
      const { firstname, lastname, middlename, api_token, role } = data;
      sessionStorage.setItem("user", JSON.stringify({ firstname, lastname, middlename, email: data.email, token: api_token, role: role.name }));
      setLoginStatus(true);
      history.push('/profile');
    } catch(err) {
      setError(err.toString().replace('Error:', ''));
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
      <h2>??????????????????????????????</h2>

      <form className="authorization-block__form" onSubmit={saveUser}>
        <label
          className="authorization-block__form--field-label"
        >
          ?????????????? ???????? ???????????????? ????'?? ???? ????????????????
          <div className='authorization-block__form--field'>
            <input
              type="text"
              maxLength={50}
              required
              placeholder="????????????????"
              onChange={e => setFirstname(e.target.value)}
            />

            <input
              type="text"
              maxLength={50}
              required
              placeholder="????'??"
              onChange={e => setMiddlename(e.target.value)}
            />

            <input
              type="text"
              maxLength={50}
              required
              placeholder="???? ????????????????"
              onChange={e => setLastname(e.target.value)}
            />

            <div>
              <label className="authorization-block__form--field-label--checked">
                <input type='checkbox' onChange={() => setIsTeacher(isTeacher => !isTeacher)}/>
                ?????????????????????????????? ???? ????????????????
              </label>
            </div>
            </div>
        </label>

        <div className="authorization-block__form--field">
          <label
            className="authorization-block__form--field-label"
          >
            ?????????????? ???????? ???????????????????? ??????????
            <input
              type="email"
              maxLength={50}
              required
              placeholder="???????????????????? ??????????"
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label
            className="authorization-block__form--field-label"
          >
            ?????????????? ?????? ?????????? ????????????????
            <PhoneInput
              //country="UA"
              placeholder="?????????????????? ??????????????"
              required
              onChange={() => {}} 
            />
          </label>

          <label
            className="authorization-block__form--field-label"
          >
            ?????????????????? ????????????
            <input
              type="password"
              maxLength={50}
              required
              placeholder="????????????"
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <label
            className="authorization-block__form--field-label"
          >
            ?????????????????? ????????????
            <input
              type="password"
              maxLength={50}
              required
              placeholder="?????????????????? ????????????"
              onChange={e => setPasswordConfitmation(e.target.value)}
            />
          </label>
        </div>

        {!isTeacher ?
            <div className="authorization-block__form--field-label">
              ?????????????? ??????????
              <Select
                value={groupId}
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
              ?????????????? ?????????????????????? ????????????
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

        <div className='error-text'>
          {error}
        </div>

        <button
          className="btn authorization-block__form--field-btn-login"
          type="submit"
        >
          ??????????????????????????????
      </button>
      </form>
    </div>
  );
};


const connectedRegistrationForm = connect()(RegistrationForm);
export { connectedRegistrationForm as RegistrationForm };