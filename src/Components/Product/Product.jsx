import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getGPU } from '../../util/graphql';
import './Product.css';


export const Product = (props) => {

    let { id } = useParams();
    const { loading, error, data, refetch: refreshGPU } = useQuery(getGPU, { variables: { id }});
    if (error) { console.log(error) }
    const card = data ? data.gpu : null;

    const renderSpecs = (allSpecs, category) => {
        const specs = allSpecs[category];
        return specs.map(spec => {
            return <span>{spec[0]}: {spec[1]}</span>
        })
    }

    const renderSpecCategories = () => {
        const specs = JSON.parse(card.specs);
        return Object.keys(specs).map(category => {
            return (
                <div className='product category'>
                    <h4>{category}</h4>
                    {renderSpecs(specs, category)}
                </div>
            )
        })
    }

    const renderReserveButton = () => {
        if(card.reserved) {
            return <p>reserved</p>
        } else {
            return (
                <button 
                    className='primary'
                    onClick={() => props.startRes(card)}>
                    Reserve
                </button>
            )
        }
    }

    return !card ? null : (
        <div className="product">
            <Link to='/'><button>Home</button></Link>
            <h2>{card.name}</h2>
            <img src={card.imgURL} />
            <h3>Specifications</h3>
            {renderSpecCategories()}
            {renderReserveButton()}
            {props.renderReserveForm()}
        </div>
    );
};

