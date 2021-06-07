import React from "react";
import Select from "react-select";

import { LoginForm } from "./LoginPage/LoginForm";
import { RegistrationForm } from "./LoginPage/RegistrationForm";

export const Login = ({ groups, setLogin }) => {
    return (
        <div className="login-block">
            <div className="login-block__title">
                Увійти або Зареєструватися
            </div>

            <div className="login-block__section">
                <LoginForm setLoginStatus={setLogin} />

                <div className='login-block__section--line' />

                {groups && <RegistrationForm groups={groups} setLoginStatus={setLogin}/>}
            </div>
        </div>
    );
};
