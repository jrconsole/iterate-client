import React from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.css';

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
        <div className="offerCard">
            <img src="https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-09-19-12-39/RTX_2080_Ti.JPG/EG11/resize/690x-1/quality/75/format/jpg"/>
            <span className="offerTitle">{props.card.supplier.name} {props.card.name}</span>
            <div className="buttons">
                <Link to={`/product/${props.card.id}`}>
                    <button>Info</button>
                </Link>
                {renderReserveButton()}
            </div>
            <div className="offerDetails">
                <div><span className="offerPrice">$50</span><span> /mo</span></div>
                <span className="offerTerm">2yr term</span>
            </div>
        </div>
    );
};

export default OfferCard;