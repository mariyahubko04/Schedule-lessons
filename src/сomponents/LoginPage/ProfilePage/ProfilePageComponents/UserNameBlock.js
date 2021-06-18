import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'; 

const UserNameBlock = ({ userInfoFromStore }) => {
    const user = sessionStorage.getItem("user");
    const [data, setData] = useState(userInfoFromStore.firstname ? userInfoFromStore : JSON.parse(user));
    const { firstname, lastname, middlename, role } = data;
    const roleTranslated =
        role === "admin"
            ? "Адміністратор"
            : role === "teacher"
            ? "Викладач"
            : "Студент";
    
    useEffect(() => {
        setData(userInfoFromStore);
    }, [userInfoFromStore]);

    return (
        <div className="user-block">
            <div className="user-info">
                <div className="photo-block">
                    <img src="images/profile.png" />
                </div>
                <div className="user-name">
                    <p>{firstname}</p>
                    <p>{lastname}</p>
                    <p>{middlename}</p>
                    <p className="user-name__role">{roleTranslated}</p>
                </div>
            </div>

            <div className="user-block__title">Особистий кабінет</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfoFromStore: state.users,
    };
};

const connectedUserNameBlock = connect(mapStateToProps)(UserNameBlock);
export { connectedUserNameBlock as UserNameBlock };