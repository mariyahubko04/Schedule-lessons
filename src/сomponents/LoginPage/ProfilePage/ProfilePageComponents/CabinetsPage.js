import React, { useEffect, useState } from "react";

import { CabinetItem } from "./CabinetItem";

export const CabinetsPage = ({ prevCabinets }) => {
    const [cabinets, setCabinets] = useState(prevCabinets.data);
    const [numbersFloor, setNumberLevel] = useState(0);

    const getCabinets = () => {
        const context = [];

        for (let i = 1; i <= numbersFloor; i++) {
            const filterCabinets = cabinets.filter(
                item => i * 100 <= item.number && item.number < (i + 1) * 100
            );
            context.push(
                <div key={i} className="one-floor">
                    {filterCabinets.map((item) =>
                        <CabinetItem prevNumber={item.number} floor={i} />
                    )}
                </div>
            );
        }

        return context;
    };

    useEffect(() => {
        (async () => {
            try {
                cabinets.sort((a, b) => a.number - b.number);
                setNumberLevel(Math.trunc(cabinets[cabinets.length - 1].number / 100));
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div className="cabinets">
            <h1>Редагуйте список доступних аудиторій</h1>

            <div className="cabinets-page">{getCabinets()}</div>

            <button className="cabinets-save-btn">Зберегти</button>
        </div>
    );
};
