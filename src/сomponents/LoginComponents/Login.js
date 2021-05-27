import React, { useEffect, useState } from 'react';

import { getDates } from '../../api/getDates';

export const Login = () => {
  const [datas, setDates] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const datas = await getDates();
        setDates(datas);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [])

  return <div className='login-block'>
    <div className='login-block__img'>
      <img src="images/login.png" alt='login' />
    </div>

    <form className='login-block__form'>
      <div className='login-block__form--field'>
        <input type='email'
          id='email'
          maxLength={50}
          required
        />
        <label
          for='email'
          className='login-block__form--field-label'
        >
          Email
        </label>
      </div>

      <div className='login-block__form--field'>
        <input
          id='password'
          maxLength={50}
          type={showPassword ? 'text' : 'password'}
        />
        <label
          className='login-block__form--field-label'
          for='password'
        >
          Password
      </label>
      </div>

      <button
        className="btn login-block__form--field-btn-login"
        type="submit"
      >
        Login
        </button>
    </form>
  </div>;
};