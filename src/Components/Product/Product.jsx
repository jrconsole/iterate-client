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
            return (
                <div className='spec'>
                    <span>{spec[0]}</span>
                    <span>{spec[1]}</span>
                </div>
            )
        })
    }

    const renderSpecCategories = () => {
        const specs = JSON.parse(card.specs);
        return Object.keys(specs).map(category => {
            return (
                <>
                    <h4>{category}</h4>
                    <div className='specs'>
                        {renderSpecs(specs, category)}
                    </div>
                </>
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
        <>
        <Link to='/'><button>Home</button></Link>
            <div className="product">

                <h2>{card.supplier.name} {card.name}</h2>
                <img src={card.imgURL} />
                {renderReserveButton()}

                <div className="card">
                    <h3>Specifications</h3>
                    <div className="categories">
                        {renderSpecCategories()}
                    </div>
                    {renderReserveButton()}
                </div>

            </div>
            {props.renderReserveForm()}
        </>
    );
};

