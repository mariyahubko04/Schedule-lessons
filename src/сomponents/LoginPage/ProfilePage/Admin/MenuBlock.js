import React from "react";

import { ExitBtn } from "../ProfilePageComponents/ExitBtn";
import { UserNameBlock } from "../ProfilePageComponents/UserNameBlock";

export const MenuBlock = ({ activeMenu, setActiveMenu }) => {
    return (
        <div className="menu-block">
            <div>
                <UserNameBlock />

                <div
                    className={`menu-item ${activeMenu === 1 ? "active" : ""}`}
                    onClick={() => setActiveMenu(1)}
                >
                    Налаштування чат-бота
                </div>
                <div
                    className={`menu-item ${activeMenu === 2 ? "active" : ""}`}
                    onClick={() => setActiveMenu(2)}
                >
                    Редагувати власні дані
                </div>
                <div
                    className={`menu-item ${activeMenu === 3 ? "active" : ""}`}
                    onClick={() => setActiveMenu(3)}
                >
                    Картотека викладачів
                </div>
                <div
                    className={`menu-item ${activeMenu === 4 ? "active" : ""}`}
                    onClick={() => setActiveMenu(4)}
                >
                    Редагування занять
                </div>
                <div
                    className={`menu-item ${activeMenu === 5 ? "active" : ""}`}
                    onClick={() => setActiveMenu(5)}
                >
                    Редагування аудиторій
                </div>
                <div
                    className={`menu-item ${activeMenu === 6 ? "active" : ""}`}
                    onClick={() => setActiveMenu(6)}
                >
                    Редагування предметів
                </div>
            </div>

            <ExitBtn />
        </div>
    );
};
