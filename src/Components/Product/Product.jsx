import React from 'react';
import { useParams } from 'react-router-dom';

const Product = (props) => {

    //***NEED TO GET FROM DATABASE IF NOT IN PROPS (user refreshed page)
    const { id } = useParams();
    const card = props.cards.find(findCard => findCard.id === id);

    const renderReserveButton = () => {
        if(card.reserved) {
            return <p>reserved</p>
        } else {
            return (
                <button 
                    onClick={() => props.startRes(card)}>
                    Reserve
                </button>
            )
        }
    }

    return (
        <>
            <p>{card.name}</p>
            {renderReserveButton()}
            {props.renderReserveForm()}
        </>
    );
};

export default Product;