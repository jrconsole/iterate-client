import React from 'react';
import OfferList from '../OfferList/OfferList';
import './Splash.css';


const Splash = (props) => {



    return (
        <>
            <header>
                <h1>This is the header</h1>
            </header>
            <OfferList 
                cards={props.cards} 
                startRes={props.startRes} />
            {props.renderReserveForm()}
        </>
    );
};

export default Splash;