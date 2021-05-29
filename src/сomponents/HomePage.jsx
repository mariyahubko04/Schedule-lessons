import React from "react";

import { MainPageSlider } from "./MainPageSlider";
import { SheduleBlock } from "./SheduleBlock";

export const HomePage = () => {
    return (
        <>
            <div className="header__additional-block">
                Розпочни відстеження своїх досягнень разом з нами!
            </div>

            <MainPageSlider />

            <SheduleBlock />
        </>
    );
};