import React from 'react';
import OfferList from '../OfferList/OfferList';
import './Splash.css';


const Splash = (props) => {



    return (
        <>
            <header>
                <h1>ITERATE</h1>
                <h4 className='subtitle'>Lease your card. Stay ahead of the game.</h4>
            </header>
            <OfferList 
                cards={props.cards} 
                startRes={props.startRes} />
            {props.renderReserveForm()}
        </>
    );
};

export default Splash;