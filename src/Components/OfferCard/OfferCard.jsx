import React from 'react';
import { Link } from 'react-router-dom';

const OfferCard = (props) => {

    const renderReserveButton = () => {
        if(props.card.reserved) {
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
        <div>
            <Link to={`/product/${props.card.id}`}>
                <p>{props.card.name}</p>
            </Link>
            {renderReserveButton()}
        </div>
    );
};

export default OfferCard;