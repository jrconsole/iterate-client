import React from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.css';

const OfferCard = (props) => {
    const priceDollars = Math.floor(props.card.price/100);
    let priceCents = props.card.price % 100;
    priceCents = priceCents < 10 ? '0' + priceCents.toString() : priceCents;

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

    //https://d2skuhm0vrry40.cloudfront.net/2018/articles/2018-09-19-12-39/RTX_2080_Ti.JPG/EG11/resize/690x-1/quality/75/format/jpg


    return (
        <div className="offerCard">
            <img src="https://lh3.googleusercontent.com/pw/ACtC-3dfdXXgT_QM7IX-AOpUow5tV0-aMSwDNGgGdczCgvxHX4URAI1b-6BFR2DzlbbzZSNr_8ZSb24hWYILDJXTYm1FNswv_hFrqehyMJyD_q1KXmv1FXydItL5d4xUCKPUXVHHGGO3TZU5CYSUNXOQO_NnFQ=w511-h680-no?authuser=0"/>
            <span className="offerTitle">{props.card.supplier.name} {props.card.name}</span>
            <div className="buttons">
                <Link to={`/product/${props.card.id}`}>
                    <button>Info</button>
                </Link>
                {renderReserveButton()}
            </div>
            <div className="offerDetails">
                <div><span className="offerPrice">${priceDollars}</span><span>.{priceCents}</span><span> /mo</span></div>
                <span className="offerTerm">2yr term</span>
            </div>
        </div>
    );
};

export default OfferCard;