import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getGPU } from '../../util/graphql';

const Product = (props) => {

    let { id } = useParams();
    const { loading, error, data, refetch: refreshGPU } = useQuery(getGPU, { variables: { id }});
    if (error) { console.log(error) }
    const card = data ? data.gpu : null;

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

    return !card ? null : (
        <>
            <p>{card.name}</p>
            {renderReserveButton()}
            {props.renderReserveForm()}
        </>
    );
};

export default Product;