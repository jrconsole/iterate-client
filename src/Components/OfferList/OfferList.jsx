import React from 'react';

import { OfferCard } from '../OfferCard/OfferCard';

export const OfferList = (props) => {
    const gpus = props.cards;

    const renderCards = () => {
        if(gpus.length) {
            return gpus.map(gpu => {
                return (
                    <OfferCard 
                        key={gpu.id} 
                        card={gpu} 
                        startRes={props.startRes} />
                )
            })
        }
    }

    return (
        <>
            {renderCards()}
        </>
    );
};