import React from "react";

import { ExitBtn } from "../ProfilePageComponents/ExitBtn";
import { UserNameBlock } from "../ProfilePageComponents/UserNameBlock";

export const MenuBlock = () => {
    return (
        <div className="menu-block">
            <div>
                <UserNameBlock />

                <div className="menu-item">Редагувати власні дані</div>
                <div className="menu-item">Картотека викладачів</div>
                <div className="menu-item active">Редагування занять</div>
                <div className="menu-item">Редагування аудиторій</div>
                <div className="menu-item">Редагування предметів</div>
            </div>

            <ExitBtn />
        </div>
    );
};
