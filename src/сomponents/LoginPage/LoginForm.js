import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

import { setLogin } from '../../api/getDates';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      setIsProgress(true);
      const isLoginSucces = await setLogin({ email, password });

      const { data } = isLoginSucces;
      const { firstname, lastname, middlename, api_token, role } = data;
      sessionStorage.setItem("user", JSON.stringify({ firstname, lastname, middlename, token: api_token, role: role.name }));
      history.push('/profile');
    } catch (err) {
      setIsError(true);
      console.error(err);
    } finally {
      setIsProgress(false);
    }
  };

  useEffect(() => setIsError(false), [email, password]);

  return (
    <>
      <div className="login-block__info">
        <h2>Увiйти</h2>

        <form className="login-block__form" onSubmit={handleLogin}>
          <div className="login-block__form--field">
            <label
              htmlFor="email"
              className="login-block__form--field-label"
            >
              Введіть вашу пошту або номер телефону
            </label>
            <input
              type="email"
              id="email"
              maxLength={50}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Пошта або номер телефону"
            />
          </div>

          <div className="login-block__form--field">
            <label
              className="login-block__form--field-label"
              htmlFor="password"
            >
              Введіть пароль від облікового запису
            </label>
            <input
              id="password"
              maxLength={50}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Пароль"
            />
          </div>

          <div className={`error-text ${isError ? 'show' : 'hidden'}`}>
            Невірний логін або пароль
        </div>

          <button
            className="btn login-block__form--field-btn-login"
            type="submit"
            onClick={handleLogin}
            disabled={isProgress || (!password || !email)}
          >
            Увійти
          </button>
        </form>

        <RingLoader loading={isProgress} />
      </div>
    </>
  );
};