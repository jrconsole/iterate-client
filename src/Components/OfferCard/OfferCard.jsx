import React from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.css';

export const OfferCard = (props) => {
    const priceDollars = Math.floor(props.card.price/100);
    let priceCents = props.card.price % 100;
    priceCents = priceCents < 10 ? '0' + priceCents.toString() : priceCents;

    const renderButtons = () => {
        if (props.view === 'manage') {
            return (
                <>
                    <button onClick={() => props.openForm(props.card)}>Edit</button>
                    <button onClick={() => props.onDelete(props.card.id)}>Delete</button>
                </>
            )
        } else {
            return (
                <>
                    <Link to={`/product/${props.card.id}`}>
                        <button>Info</button>
                    </Link>
                    {renderReserveButton()}
                </>
            )
        }
    }

    const renderReserveButton = () => {
        if(props.card.reserved) {
            return <p>reserved</p>
        } else {
            return (
                <button
                    className='primary' 
                    onClick={() => props.startRes(props.card)}>
                    Reserve
                </button>
            )
        }
    }

    return (
        <div className="offerCard card">
            <img src={props.card.imgURL} />
            <span className="offerTitle">{props.card.supplier.name} {props.card.name}</span>
            <div className="buttons">
                {renderButtons()}
            </div>
            <div className="offerDetails">
                <div><span className="offerPrice">${priceDollars}</span><span>.{priceCents}</span><span> /mo</span></div>
                <span className="offerTerm">2yr term</span>
            </div>
        </div>
    );
};