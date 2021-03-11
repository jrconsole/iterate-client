import React from 'react';


export const ReservationList = (props) => {

    const handleClick = (id, status) => {
        props.updateStatus({variables: { id, status}});
        props.refresh(); 
    }

    const renderStatusButtons = (reservation) => {
        if(reservation.status === 'ACTIVE') {
            return (
                <>
                    <button onClick={() => handleClick(reservation.id, 'REMOVED')}>remove</button>
                    <button onClick={() => handleClick(reservation.id, 'LEASED')}>leased</button>
                </>
            )
        } else if (reservation.status === 'LEASED') {
            return (
                <>
                    <button onClick={() => handleClick(reservation.id, 'REMOVED')}>remove</button>
                    <button onClick={() => handleClick(reservation.id, 'ACTIVE')}>activate</button>
                </>
            )            
        } else if (reservation.status === 'REMOVED') {
            return (
                <>
                    <button onClick={() => handleClick(reservation.id, 'ACTIVE')}>activate</button>
                </>
            )            
        }
    }

    const renderReservations = () => {
        if(props.reservations.length) {
            return (
                <>
                    <h4>You have {props.reservations.length} reservations!</h4>
                    {props.reservations.map(reservation => {
                        const date = new Date(0)
                        date.setUTCMilliseconds(reservation.date)
                        return (
                            <>
                                <p>{reservation.id}, {reservation.gpu.name}, {reservation.person.firstName}, {date.toString()}, {reservation.status}</p>
                                {renderStatusButtons(reservation)}
                            </>
                        )
                    })}
                </>
            )
        } else {
            return 'Go get some Reservations!'
        }
    }

    return (
        <>
            {renderReservations()}
        </>
    );
};