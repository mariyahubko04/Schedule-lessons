import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-number-input/input';
import Select from "react-select";
import { connect } from 'react-redux';

import { setProfileInfo } from '../../../../actions/user';

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

const UserInfo = ({ groups, academicStatus, userInfoFromStore, dispatch }) => {
    const user = sessionStorage.getItem('user');
    const userInfo= JSON.parse(user);
    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [middlename, setMiddlename] = useState(userInfo.middlename);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState("");
    const [passwordConfitmation, setPasswordConfitmation] = useState("");
    const [academStatusId, setAcademStatusId] = useState({value: '', label: ''});
    const [groupId, setGroupId] = useState(groups[0]);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const isTeacher = userInfo.role === 'teacher';
    const isStudent = userInfo.role === 'student';

    const saveUserInfo = async () => {
        try {
            const req = {
                firstname,
                lastname,
                middlename,
                email
            };

            if (password) req['password'] = password;
            if (isTeacher) req['academ_status_id'] = academicStatus;
            if (isStudent) req['group_id'] = groupId;

            await dispatch(setProfileInfo(req));
            setIsSuccess(true);
        } catch(err) {
            setError(err.toString().replace('Error:', ''));
            console.error(err);
        }
    };

    useEffect(() => {
        const { firstname, lastname, middlename, email } = userInfoFromStore;
        setFirstname(userInfoFromStore.firstname);
        setLastname(userInfoFromStore.lastname);
        setMiddlename(userInfoFromStore.middlename);
        setEmail(userInfoFromStore.email);

        sessionStorage.setItem("user", JSON.stringify({ ...userInfo, firstname, lastname, middlename, email }));
    }, [userInfoFromStore]);

    useEffect(() => {
        if(error) setError('');
        if(isSuccess) setIsSuccess(false);
    }, [firstname, lastname, middlename, email, password, passwordConfitmation, groupId, academicStatus]);

    return (
        <div className='user-page'>
            <h2>Змінити дані</h2>

            <form className="authorization-block__form" onSubmit={saveUserInfo}>
                <label className="authorization-block__form--field-label">
                    Введіть ваше Прізвише Ім'я по батькові
                    <div className="authorization-block__form--field">
                        <input
                            type="text"
                            maxLength={50}
                            required
                            placeholder="Прізвище"
                            onChange={e => setFirstname(e.target.value)}
                            value={firstname}
                        />

                        <input
                            type="text"
                            maxLength={50}
                            required
                            placeholder="Ім'я"
                            onChange={e => setMiddlename(e.target.value)}
                            value={middlename}
                        />

                        <input
                            type="text"
                            maxLength={50}
                            required
                            placeholder="По батькові"
                            onChange={e => setLastname(e.target.value)}
                            value={lastname}
                        />
                    </div>
                </label>

                <div className="authorization-block__form--field">
                    <label className="authorization-block__form--field-label">
                        Введіть вашу електронну пошту
                        <input
                            type="email"
                            maxLength={50}
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Електронна пошта"
                        />
                    </label>

                    <label className="authorization-block__form--field-label">
                        Введіть ваш номер телефону
                        <PhoneInput
                            //country="UA"
                            placeholder="Мобільний телефон"
                            onChange={() => {}}
                        />
                    </label>

                    <label className="authorization-block__form--field-label">
                        Вигадайте пароль
                        <input
                            type="password"
                            maxLength={50}
                            placeholder="Пароль"
                            value={password}
                            autoComplete={'off'}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>

                    <label className="authorization-block__form--field-label">
                        Повторіть пароль
                        <input
                            type="password"
                            maxLength={50}
                            placeholder="Повторіть пароль"
                            value={passwordConfitmation}
                            autoComplete={'off'}
                            onChange={e => setPasswordConfitmation(e.target.value)}
                        />
                    </label>

                    {isStudent &&
                        <div className="authorization-block__form--field-label">
                            Оберіть групу
                            <Select
                                value={groupId}
                                onChange={setGroupId}
                                options={groups}
                                id={"groups"}
                                className="groups"
                                styles={customStyles('44px')}
                            />
                        </div>
                    }
                    {isTeacher && <div
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

                <div className={isSuccess ? 'success-text' : `error-text`}>
                    {isSuccess ? 'Дані успішно оновлені' : error}
                </div>

                <button
                    className="btn authorization-block__form--field-btn-login"
                    type="submit"
                >
                    Зберегти
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfoFromStore: state.users,
    };
};

const connectedUserInfo = connect(mapStateToProps)(UserInfo);
export { connectedUserInfo as UserInfo };