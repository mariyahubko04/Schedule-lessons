import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { connect } from 'react-redux';

import { setLogin } from '../../actions/user';

const LoginForm = ({ setLoginStatus, dispatch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProgress, setIsProgress] = useState(false);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      setIsProgress(true);
      const data = await dispatch(setLogin({ email, password }));
      const { firstname, lastname, middlename, api_token, role } = data;
      sessionStorage.setItem("user", JSON.stringify({ firstname, lastname, middlename, email: data.email, token: api_token, role: role.name }));
      setLoginStatus(true);
      history.push('/profile');
    } catch (err) {
      setError(err.toString().replace('Error:', ''));
      console.error(err);
    } finally {
      setIsProgress(false);
    }
  };

  useEffect(() => setError(''), [email, password]);

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

          <div className={`error-text ${error ? 'show' : 'hidden'}`}>
            {error}
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

const connectedLoginForm = connect()(LoginForm);
export { connectedLoginForm as LoginForm };