import React from 'react';
import OfferCard from '../OfferCard/OfferCard';

const cardOfferings = [
    {
        name: 'card1'
    },
    {
        name: 'card2'
    }
]

const OfferList = (props) => {

    const renderCards = (cards) => {
        return cards.map(card => <OfferCard card={card} startRes={props.startRes}/>)
    }

    return (
        <>
            {renderCards(cardOfferings)}
        </>
    );
};

export default OfferList;