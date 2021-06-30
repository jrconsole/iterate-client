import React, { useState } from 'react';
import './ReserveForm.css';

export const ReserveForm = (props) => {
    const multiReserve = Object.keys(props.card).length > 0 ? false : true;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [resList, setResList] = useState([]);
    const [founders, setFounders] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [reservation, setReservation] = useState({});
    const [error, setError] = useState(false);

    const submitForm = async (e) => {
        if (!resList.length) {
            e.preventDefault();
            setError(true);
        } else {
            e.preventDefault();
            const userInput = { 
                info: { firstName, lastName, email, phone }, 
                foundersOnly: founders 
            };

            const reservation = await props.submitRes(userInput, resList);

            setFormSubmitted(true);
            setReservation(reservation);
        }
    }

    const updateResList = (e, cardId) => {
        const listIndex = resList.indexOf(cardId);

        if (listIndex >= 0) {
            const newList = [...resList];
            newList.splice(listIndex, 1);
            setResList(newList);
        } else {
            setResList([ ...resList, cardId ])
        }
    }

    const renderForm = () => {
        if (formSubmitted) {
            return (
                <div className="submitMessage card">
                    <h1>Thanks!</h1>
                    <span>Your reservation number is:</span>
                    <h4> {reservation.id}</h4>
                    <span>We'll notify you when one of your cards is available.</span>
                    <button onClick={props.closeForm} >Close</button>
                </div>
            )
        } else {
            return (
                <form onSubmit={submitForm} >
                    <h2>Reserve {multiReserve ? 'a Card' : `- ${props.card.name}`}</h2>

                    {!error ? null : <span>Please select at least one card</span>}
                    
                    {!multiReserve ? null :
                        props.cards.map(card => {
                            return (
                                <>
                                    <label class="checkbox">
                                        <span className="checkboxInput">
                                            <input
                                                type="checkbox"
                                                id={card.id}
                                                name="cardSelect"
                                                value={true}
                                                onClick={(e) => updateResList(e, card.id)}/>
                                            <span className="checkboxControl"></span>
                                        </span>
                                        <span class="checkboxLabel">{card.supplier.name} - {card.name}</span>
                                    </label>
                                </>
                            )
                        })
                    }

                    <label class="radio">
                        <span className="radioInput">
                            <input
                                type="radio"
                                id="foundersChoiceTrue"
                                name="founders"
                                value={true}
                                onClick={() => setFounders(true)}
                                required/>
                            <span className="radioControl"></span>
                        </span>
                        <span class="radioLabel">Founders Edition Only</span>
                    </label>
                    <label class="radio">
                        <span className="radioInput">
                            <input
                                type="radio"
                                id="foundersChoiceFalse"
                                name="founders"
                                value={false}
                                onClick={() => setFounders(false)}
                                required/>
                            <span className="radioControl"></span>
                        </span>
                        <span className="radioLabel">All Variants</span>
                    </label>
                    <input 
                        type="text"
                        id="firstNameRes"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required />
                    <input 
                        type="text"
                        id="lastNameRes"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required />
                    <input 
                        type="text"
                        id="emailRes"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <input 
                        type="text"
                        id="phoneRes"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required />

                    <div className="buttons">
                        <button type="button" onClick={props.closeForm}>Cancel</button>
                        <button className='primary' type='submit'>Submit</button>
                    </div>
                    
                </form>
            )
        }
    }

    return (
        <div className="formContainer resForm">
            {renderForm()}
            <div className='formBack' onClick={props.closeForm}></div>
        </div>
    );
};