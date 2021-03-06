import React from 'react';
import { Link } from 'react-router-dom';
import { OfferList } from '../OfferList/OfferList';
import { Carousel } from '../Carousel/Carousel';
import './Splash.css';


export const Splash = (props) => {

    return (
        <div className="splash">
            <header>
                <div className="heading">
                    <h4>Get Ahead. Stay Ahead.</h4>
                    <h2 className='subtitle'>Lease Your Graphics Card</h2>
                    <div className="buttons">
                        <button onClick={() => props.startRes({})}>Reserve</button>
                    </div>
                </div>
                <div className="headerBack"/>
            </header>
            <main className="centeredArea">
            <Carousel
                cards={props.cards} 
                startRes={props.startRes} />
            {/* <OfferList 
                cards={props.cards} 
                startRes={props.startRes} /> */}
            </main>
            {props.renderReserveForm()}
        </div>
    );
};