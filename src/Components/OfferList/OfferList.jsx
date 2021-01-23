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
        return cards.map(card => {
            let reserved = false;
            props.reservedCards.forEach(reservedCard => {
                if(card.name === reservedCard.name) {
                    reserved = true;
                }
            })
            return <OfferCard card={card} startRes={props.startRes} reserved={reserved} />
        })
    }

    return (
        <>
            {renderCards(cardOfferings)}
        </>
    );
};

export default OfferList;