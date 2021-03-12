import React from 'react';
import './ReservationList.css';

export const ReservationList = (props) => {

    const handleClick = (id, status) => {
        props.updateStatus({variables: { id, status}});
        props.refresh(); 
    }

    const renderStatusButtons = (reservation) => {
        if(reservation.status === 'ACTIVE') {
            return (
                <>
                    <button className='primary' onClick={() => handleClick(reservation.id, 'LEASED')}>Leased</button>
                    <button onClick={() => handleClick(reservation.id, 'REMOVED')}>Remove</button>
                </>
            )
        } else if (reservation.status === 'LEASED') {
            return (
                <>
                    <button onClick={() => handleClick(reservation.id, 'ACTIVE')}>Activate</button>
                    <button onClick={() => handleClick(reservation.id, 'REMOVED')}>Remove</button>
                </>
            )            
        } else if (reservation.status === 'REMOVED') {
            return (
                <>
                    <button onClick={() => handleClick(reservation.id, 'ACTIVE')}>Activate</button>
                </>
            )            
        }
    }

    const renderReservation = (reservation) => {
        const date = new Date(0)
        date.setUTCMilliseconds(reservation.date)
        return (
            <div className="reservation card"> 
                <div className="reservation main">
                    <div className="reservation personInfo">
                        <h4>{reservation.person.firstName} {reservation.person.lastName}</h4>
                        <span>{reservation.person.email}</span>
                        <span>{reservation.person.phone}</span>
                    </div>
                    <div className='reservation cardInfo'>
                        <h4>{reservation.gpu.name}</h4>
                        <span>{reservation.foundersOnly ? 'Founders Only' : 'All Variants'}</span>
                    </div>
                    {/*<span>{reservation.status}</span>*/}
                    <div className="reservation buttons">
                        {renderStatusButtons(reservation)}
                    </div>
                </div>
                <span className="reservation date">{date.toLocaleString()}</span>
            </div>
        )
    }

    const renderReservations = () => {
        if(props.reservations.length) {
            const activeReservations = [];
            const leasedReservations = [];
            const removedReservations = [];
            props.reservations.forEach(reservation => {
                if (reservation.status === 'ACTIVE') {
                    activeReservations.push(reservation);
                } else if (reservation.status === 'LEASED') {
                    leasedReservations.push(reservation);
                } else {
                    removedReservations.push(reservation);
                }
            })
            return (
                <>
                    <h3>You have {activeReservations.length} active reservations!</h3>

                    <h3>Active</h3>
                    {!activeReservations.length ? 
                        'No active reservations' : 
                        activeReservations.map(reservation => renderReservation(reservation) )}

                    <h3>Leased</h3>
                    {!leasedReservations.length ? 
                        'No leased reservations' :
                        leasedReservations.map(reservation => renderReservation(reservation) )}

                    <h3>Removed</h3>
                    {!removedReservations.length ? 
                        'No removed reservations' :
                        removedReservations.map(reservation => renderReservation(reservation) )}
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