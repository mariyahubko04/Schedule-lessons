import React from "react";
import PhoneInput from 'react-phone-number-input/input';

export const RegistrationForm = () => {
  return (
    <div>
      <h2>Зареєструватися</h2>

      <form className="authorization-block__form">
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
            />

            <input
              type="text"
              maxLength={50}
              required
              placeholder="Ім'я"
            />

            <input
              type="text"
              maxLength={50}
              required
              placeholder="По батькові"
            />

            <div>
              <label className="authorization-block__form--field-label--checked">
                <input type='checkbox' />
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
            />
          </label>
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