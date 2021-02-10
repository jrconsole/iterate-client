import React, { useState } from 'react';
import './ReserveForm.css';
import { gql, useMutation } from '@apollo/client';

const addPerson = gql`
    mutation addPerson (
        $firstName: String!,
        $lastName: String!,
        $email: String!
        $phone: String!
    ) {
        createPerson(
        person: { 
        firstName: $firstName, 
        lastName: $lastName, 
        email: $email, 
        phone: $phone
        }
    ) {
        id
        firstName
        lastName
        email
        phone
    }
}
`

const addReservation = gql`
    mutation addReservation (
        $boardId: String!,
        $personId: String!
    ) {
        createReservation(
        reservation: { 
        boardId: $boardId, 
        personId: $personId, 
        }
    ) {
        id
        board {
            id
        }
        person {
            id
        }
    }
}
`

const ReserveForm = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [founders, setFounders] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [createPerson, { personError }] = useMutation(addPerson);
    const [createReservation, { reservationError }] = useMutation(addReservation);

    const submitForm = (e) => {
        e.preventDefault();
        const userInput = { 
            info: { firstName, lastName, email, phone }, 
            foundersOnly: founders 
        };

        props.submitRes(userInput, props.card);
        setFormSubmitted(true);
    }

    const renderForm = () => {
        if (formSubmitted) {
            return <h1>thanks!</h1>
        } else {
            return (
                <form onSubmit={submitForm} >
                    <h4>reserve a {props.card.name}</h4>
                    
                    <input
                        type="radio"
                        id="foundersChoiceTrue"
                        name="founders"
                        value={true}
                        onClick={() => setFounders(true)}
                        required/>
                    <label htmlFor="foundersChoiceTrue">Founders Edition Only</label>
                    <input
                        type="radio"
                        id="foundersChoiceFalse"
                        name="founders"
                        value={false}
                        onClick={() => setFounders(false)}
                        required/>
                    <label htmlFor="foundersChoiceFalse">All Variants</label>
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

                    <input type='submit'/>
                </form>
            )
        }
    }

    return (
        <>
            {renderForm()}
            {/*<div className='formBack' onClick={props.closeForm}></div>*/}
        </>
    );
};

export default ReserveForm;