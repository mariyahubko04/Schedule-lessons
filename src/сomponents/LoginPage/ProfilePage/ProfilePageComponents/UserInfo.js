import React, { useState } from "react";
import PhoneInput from 'react-phone-number-input/input';

export const UserInfo = () => {
    const user = sessionStorage.getItem('user');
    const userInfo= JSON.parse(user);
    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [middlename, setMiddlename] = useState(userInfo.middlename);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState("");
    const [passwordConfitmation, setPasswordConfitmation] = useState("");
    const [isTeacher, setIsTeacher] = useState(userInfo.role === 'teacher');
    const [academStatusId, setAcademStatusId] = useState("");
    const [groupId, setGroupId] = useState("");

    const saveUserInfo = () => {

    };

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
                            required
                            onChange={() => {}}
                        />
                    </label>

                    <label className="authorization-block__form--field-label">
                        Вигадайте пароль
                        <input
                            type="password"
                            maxLength={50}
                            required
                            placeholder="Пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>

                    <label className="authorization-block__form--field-label">
                        Повторіть пароль
                        <input
                            type="password"
                            maxLength={50}
                            required
                            placeholder="Повторіть пароль"
                            value={passwordConfitmation}
                            onChange={e => setPasswordConfitmation(e.target.value)}
                        />
                    </label>
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
