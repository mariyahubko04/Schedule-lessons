import React, { useEffect, useState } from "react";

import { LoginForm } from "./LoginPage/LoginForm";
import { RegistrationForm } from "./LoginPage/RegistrationForm";
import { getDates } from "../api/getDates";

export const Login = () => {
    const [datas, setDates] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const datas = await getDates();
                setDates(datas);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

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
