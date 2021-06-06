import React from "react";
import { useEffect } from "react";

import { MainPageSlider } from "./MainPageSlider";
import { SheduleBlock } from "./SheduleBlock";

export const HomePage = ({ groups }) => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <>
            <div className="header__additional-block">
                Розпочни відстеження своїх досягнень разом з нами!
            </div>

            <MainPageSlider />

            {groups && <SheduleBlock groups={groups}/>}
        </>
    );
};