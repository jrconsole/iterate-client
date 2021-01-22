import React from 'react';

const OfferCard = (props) => {

    return (
        <>
            <p>{props.card.name}</p>
            <button 
                onClick={() => props.startRes(props.card)}>
                    Reserve</button>
        </>
    );
};

export default OfferCard;