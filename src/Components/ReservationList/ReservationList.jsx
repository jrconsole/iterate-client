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
                    <button className='primary' onClick={() => handleClick(reservation.id, 'LEASED')}>Lease</button>
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
                <div className="main">
                    <div className="personInfo">
                        <h4>{reservation.person.firstName} {reservation.person.lastName}</h4>
                        <span>{reservation.person.email}</span>
                        <span>{reservation.person.phone}</span>
                    </div>
                    <div className='cardInfo'>
                        <h4>{reservation.gpu.name}</h4>
                        <span>{reservation.foundersOnly ? 'Founders Only' : 'All Variants'}</span>
                    </div>
                </div>
                <div className="buttons">
                        {renderStatusButtons(reservation)}
                </div>
                <div className="reservationInfo">
                    <span>{date.toLocaleString()}</span>
                    <span>{reservation.id}</span>
                </div>
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
                    <h3>Active: {activeReservations.length}</h3>
                    <section className="listContainer">
                        {!activeReservations.length ? 
                            'No active reservations' : 
                            activeReservations.map(reservation => renderReservation(reservation) )}
                    </section>

                    <h3>Leased: {leasedReservations.length}</h3>
                    <section className="listContainer">
                        {!leasedReservations.length ? 
                            'No leased reservations' :
                            leasedReservations.map(reservation => renderReservation(reservation) )}
                    </section>

                    <h3>Removed: {removedReservations.length}</h3>
                    <section className="listContainer">
                        {!removedReservations.length ? 
                            'No removed reservations' :
                            removedReservations.map(reservation => renderReservation(reservation) )}
                    </section>
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