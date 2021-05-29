import React from "react";

import { LoginForm } from "./LoginPage/LoginForm";
import { RegistrationForm } from "./LoginPage/RegistrationForm";

export const Login = () => {
    return (
        <div className="login-block">
            <div className="login-block__title">Увійти або Зареєструватися</div>

            <div className="login-block__section">
                <LoginForm />

                <div className='login-block__section--line' />

                <RegistrationForm />
            </div>
        </div>
    );
};
