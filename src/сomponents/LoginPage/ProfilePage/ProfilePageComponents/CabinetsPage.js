import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { CabinetItem } from "./CabinetItem";
import { setNewCabinet, editCabinet, deleteCabinet } from "../../../../actions/shedule";

const CabinetsPage = ({ prevCabinets, dispatch }) => {
    const [cabinets, setCabinets] = useState(prevCabinets);
    const [newCabinets, setNewCabinets] = useState([]);
    const [numbersFloor, setNumberLevel] = useState(0);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess]= useState(false);

    const getCabinets = () => {
        const context = [];

        for (let i = 1; i <= numbersFloor; i++) {
            const filterCabinets = cabinets.filter(
                item => i * 100 <= item.number && item.number < (i + 1) * 100
            ).sort((a, b) => a.number - b.number);
            context.push(
                <div key={i} className="one-floor">
                    {filterCabinets.map((item) =>
                        <CabinetItem
                            key={item.id}
                            id={item.id}
                            prevNumber={item.number}
                            floor={i}
                            setCabinets={setCabinets}
                            setIsSuccess={setIsSuccess}
                        />
                    )}
                </div>
            );
        }

        return context;
    };

    const addNewCabinets = () => {
        setNewCabinets(items => [...items, { id: Date.now(), number: 0 }]);
        if(isSuccess) setIsSuccess(false);
    };

    const deleteNewItem = (id) => {
        setNewCabinets(items => items.filter(item => item.id !== id));
    };

    const saveCabinets = async () => {
        try {
            if (newCabinets.length > 0) {
                for (let i = 0; i < newCabinets.length; i++) {
                    dispatch(setNewCabinet({number : newCabinets[i].number}));
                }
            }

            for (let i = 0; i < prevCabinets.length; i++) {
                const prevCabinet = prevCabinets[i];
                const nextCabinet = cabinets.find(item => item.id === prevCabinet.id);
          
                if (!nextCabinet.number) {
                  await dispatch(deleteCabinet(prevCabinet.id));
                  continue;
                }
          
                if (nextCabinet.number !== prevCabinet.number) {
                  const req = { number: nextCabinet.number };
                  await dispatch(editCabinet(prevCabinet.id, req));
                }
              }

            setIsSuccess(true);
            setNewCabinets([]);
        } catch (err) {
            setError(err.toString());
            console.error(err);
        }
    };

    const isDisabled = () => {
        return newCabinets.some(item => !item.number || item < 100 || item > 999);
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

    useEffect(() => { setCabinets(prevCabinets) }, [prevCabinets]);

    useEffect(() => { 
        if (error) setError('');
    }, [cabinets, newCabinets]);

    return (
        <div className="cabinets">
            <h1>Редагуйте список доступних аудиторій</h1>

            <div className='btn-block'>
                <button
                    className="added-btn"
                    onClick={addNewCabinets}
                >
                    <img src="images/plus.svg" alt="added" />
                </button>
            </div>

            {newCabinets.map(item => {
                return (
                    <div key={item.id} className='new-cabinet'>
                        <CabinetItem
                            id={item.id}
                            prevNumber={item.number}
                            setCabinets={setNewCabinets}
                            setIsSuccess={setIsSuccess}
                        />

                        <button className='delete-new-cabinet' onClick={_ => deleteNewItem(item.id)}>
                            <img src="images/delete.svg" alt="delete" />
                        </button>
                    </div>
                );
            })}

            <div className="cabinets-page">{getCabinets()}</div>

            <div className={isSuccess ? 'success-text' : `error-text`}>
                {isSuccess ? 'Дані успішно оновлені' : error}
            </div>

            <button
                className="cabinets-save-btn"
                onClick={saveCabinets}
                disabled={isDisabled()}
            >
                Зберегти
            </button>
        </div>
    );
};

const connectedCabinetsPage = connect()(CabinetsPage);
export { connectedCabinetsPage as CabinetsPage };