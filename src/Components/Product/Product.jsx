import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getGPU } from '../../util/graphql';
import './Product.css';


export const Product = (props) => {

    let { id } = useParams();
    const { loading, error, data, refetch: refreshGPU } = useQuery(getGPU, { variables: { id }});
    if (error) { console.log(error) }

    let card, priceDollars, priceCents;
    if (data) {
        card = data.gpu;
        priceDollars = Math.floor(card.price/100);
        priceCents = card.price % 100;
        priceCents = priceCents < 10 ? '0' + priceCents.toString() : priceCents;
    }

    const renderSpecs = (specs) => {
        return specs.map((spec, index) => {
            const lastSpec = index === (specs.length -1) ? "last" : null;
            return (
                <div className={`spec ${lastSpec}`}>
                    <span>{spec[0]}</span>
                    <span>{spec[1]}</span>
                </div>
            )
        })
    }

    const renderSpecCategories = () => {
        const specs = JSON.parse(card.specs);
        return specs.map((category, index) => {
            return (
                <>
                    <h4>{category[0]}</h4>
                    <div className='specs'>
                        {renderSpecs(specs[index][1])}
                    </div>
                </>
            )
        })
    }

    const renderReserveButton = () => {
        const stateCard = props.cards.filter(stateCard => stateCard.id === card.id);
        const reserved = stateCard.length ? stateCard[0].reserved : false;
        if(reserved) {
            return <button className='disabled'>Reserved</button>
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

    return !card ? ("Sorry, we're having trouble finding that product.") : (
        <>
            <Link to='/'><button className="nav">Home</button></Link>
            <div className="product">

                <h2>{card.supplier.name} {card.name}</h2>
                <img src={card.imgURL} />
                <p><span className="offerPrice">${priceDollars}</span>.{priceCents}/mo</p>
                <span className="offerTerm">2yr term</span>
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

