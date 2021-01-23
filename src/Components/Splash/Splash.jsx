import React, { useState } from 'react';
import OfferList from '../OfferList/OfferList';
import ReserveForm from '../ReserveForm/ReserveForm';

const Splash = () => {

    const [reserveFormActive, setReserveFormActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [reservedCardArray, setReservedCardArray] = useState([]);

    const startReservation = (card) => {
        if (reservedCardArray.length > 0) {
            reserveCard(card);
        } else {
            setReserveFormActive(true);
        }

        setSelectedCard(card);
    }

    const reserveCard = (card) => {
        setReservedCardArray([ ...reservedCardArray, card ])
    }

    const submitReservation = (resInputs) => {
        setReservedCardArray([ resInputs.card ]);
    }

    const closeForm = () => {
        setReserveFormActive(false);
    }

    const renderReserveForm = () => {
        if (reserveFormActive) {
            return (
                <ReserveForm  
                    closeForm={closeForm} 
                    card={selectedCard} 
                    submitRes={submitReservation}/>
            )
        } else {
            return
        }    
    }

    return (
        <>
            <header>
                <h1>This is the header</h1>
            </header>
            <OfferList reservedCards={reservedCardArray} startRes={startReservation}/>
            {renderReserveForm()}
        </>
    );
};

export default Splash;