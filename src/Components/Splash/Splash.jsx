import React from 'react';
import { Link } from 'react-router-dom';
import { OfferList } from '../OfferList/OfferList';
import './Splash.css';


export const Splash = (props) => {

    return (
        <div className="splash">
            <header>
                <div class="heading">
                    <h1>ITERATE</h1>
                    <h4 className='subtitle'>Lease your card. Stay ahead of the game.</h4>
                </div>
            </header>
            <main className="centeredArea">
            <OfferList 
                cards={props.cards} 
                startRes={props.startRes} />
            </main>
            {props.renderReserveForm()}
        </div>
    );
};