import React, { useState } from 'react';
import OfferList from '../OfferList/OfferList';
import ReserveForm from '../ReserveForm/ReserveForm';

const Splash = () => {

    const [reserveFormActive, setReserveFormActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});

    const startReservation = (card) => {
        setReserveFormActive(true);
        setSelectedCard(card);
    }

    const submitReservation = (resInputs) => {
        //setReserveFormActive(false);
        console.log(resInputs);
    }

    const closeForm = () => {
        console.log('this ran');
        setReserveFormActive(false);
    }

    const renderReserveForm = () => {
        if (reserveFormActive) {
            return <ReserveForm closeForm={closeForm} card={selectedCard} submitRes={submitReservation}/>
        } else {
            return
        }    
    }

    return (
        <>
            <header>
                <h1>This is the header</h1>
            </header>
            <OfferList startRes={startReservation}/>
            {renderReserveForm()}
        </>
    );
};

export default Splash;