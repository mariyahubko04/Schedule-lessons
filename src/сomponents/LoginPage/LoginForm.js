import React, { useState } from "react";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <h2>Увiйти</h2>

      <form className="login-block__form">
        <div className="login-block__form--field">
          <label
            for="email"
            className="login-block__form--field-label"
          >
            Введіть вашу пошту або номер телефону
        </label>
          <input
            type="email"
            id="email"
            maxLength={50}
            required
            placeholder="Пошта або номер телефону"
          />
        </div>

        <div className="login-block__form--field">
          <label
            className="login-block__form--field-label"
            for="password"
          >
            Введіть пароль від облікового запису
        </label>
          <input
            id="password"
            maxLength={50}
            type={showPassword ? "text" : "password"}
            required
            placeholder="Пароль"
          />
        </div>

        <button
          className="btn login-block__form--field-btn-login"
          type="submit"
        >
          Увійти
      </button>
      </form>
    </div>
  );
};