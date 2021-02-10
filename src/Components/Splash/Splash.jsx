import React, { useState } from 'react';
import OfferList from '../OfferList/OfferList';
import ReserveForm from '../ReserveForm/ReserveForm';
import './Splash.css';
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

const Splash = () => {

    const [reserveFormActive, setReserveFormActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [reservedCardArray, setReservedCardArray] = useState([]);
    const [user, setUser] = useState({});

    const [createPerson, { personError }] = useMutation(addPerson);
    const [createReservation, { reservationError }] = useMutation(addReservation);

    const startReservation = (card) => {
        setSelectedCard(card);

        if (Object.keys(user).length) {
            submitReservation(user, card);
        } else {
            setReserveFormActive(true);
        }
    }

    const submitReservation = async (personInput, card) => {
        let person;
        //---check if there is an existing user to avoid creating duplicate
        if (Object.keys(user).length) {
            person = user;
        } else {
            const {data: {createPerson: newPerson}} = await createPerson({
                variables: personInput
            })
            setUser(newPerson);
            person = newPerson;
        }
        //---check if there is an existing user to avoid creating duplicate

        await createReservation({
            variables: { 
                boardId: card.id, 
                personId: person.id 
            }
        })

        if (personError || reservationError) {
            const error = personError ? personError : reservationError;
            console.log(error);
        }
        setReservedCardArray([ ...reservedCardArray, card ]);
    }

    const closeForm = () => {
        setReserveFormActive(false);
    }

    const renderReserveForm = () => {
        if (reserveFormActive) {
            return (
                <ReserveForm  
                    closeForm={closeForm} 
                    card={selectedCard} 
                    submitRes={submitReservation} />
            )
        } else {
            return
        }    
    }

    return (
        <>
            <header>
                <h1>This is the header</h1>
            </header>
            <OfferList reservedCards={reservedCardArray} startRes={startReservation}/>
            {renderReserveForm()}
        </>
    );
};

export default Splash;