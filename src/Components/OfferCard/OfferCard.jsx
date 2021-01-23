import React from 'react';

const OfferCard = (props) => {

    const renderReserveButton = () => {
        if(props.reserved) {
            return <p>reserved</p>
        } else {
            return (
                <button 
                    onClick={() => props.startRes(props.card)}>
                    Reserve
                </button>
            )
        }
    }

    return (
        <>
            <p>{props.card.name}</p>
            {renderReserveButton()}
        </>
    );
};

export default OfferCard;