import React from "react";

export const UserNameBlock = () => {
    const user = sessionStorage.getItem("user");
    const { firstname, lastname, middlename, role } = JSON.parse(user);
    const roleTranslated = role === 'admin' ? 'Адмін' : 'Студент';

    return (
        <div className="user-block">
            <div className='user-info'>
                <div className='photo-block'>
                  <img src='images/profile.png'/>
                </div>
                <div className='user-name'>
                    <p>{firstname}</p>
                    <p>{lastname}</p>
                    <p>{middlename}</p>
                    <p className='user-name__role'>{roleTranslated}</p>
                </div>
            </div>

            <div className="user-block__title">Особистий кабінет</div>
        </div>
    );
};
