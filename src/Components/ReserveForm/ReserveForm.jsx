import React, { useState } from 'react';
import './ReserveForm.css';

export const ReserveForm = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [founders, setFounders] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [reservation, setReservation] = useState({});

    const submitForm = async (e) => {
        e.preventDefault();
        const userInput = { 
            info: { firstName, lastName, email, phone }, 
            foundersOnly: founders 
        };

        const reservation = await props.submitRes(userInput, props.card);

        setFormSubmitted(true);
        setReservation(reservation);
    }

    const renderForm = () => {
        if (formSubmitted) {
            return (
                <div className="submitMessage card">
                    <h1>Thanks!</h1>
                    <span>Your reservation number is:</span>
                    <h4> {reservation.id}</h4>
                    <span>We'll notify you when your card is available.</span>
                    <button onClick={props.closeForm} >Close</button>
                </div>
            )
        } else {
            return (
                <form onSubmit={submitForm} >
                    <h2>Reserve - {props.card.name}</h2>
                    
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
                    {/* <label htmlFor="foundersChoiceTrue">Founders Edition Only</label> */}
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
                        <button onClick={props.closeForm}>Cancel</button>
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