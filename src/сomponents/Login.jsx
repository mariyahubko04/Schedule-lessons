import React from "react";

import { LoginForm } from "./LoginPage/LoginForm";
import { RegistrationForm } from "./LoginPage/RegistrationForm";

export const Login = ({ groups, setLogin }) => {
    return (
        <div className="login-block">
            <div className="login-block__title">Увійти або Зареєструватися</div>

            <div className="login-block__section">
                <LoginForm setLoginStatus={setLogin} />

                <div className='login-block__section--line' />

                <RegistrationForm groups={groups}/>
            </div>
        </div>
    );
};
