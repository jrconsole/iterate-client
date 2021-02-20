import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { getReservations, updateReservation } from '../../util/graphql';

const Dashboard = (props) => {
    const { loading, error, data, refetch: refreshReservations } = useQuery(getReservations);
    const [changeResStatus, { error: statusError }] = useMutation(updateReservation);
    const [ reservations, setReservations ] = useState([]);
    useEffect(() => {
        if(data) {
            setReservations(data.reservations);
        }
    }, [data])

    const handleClick = (id, status) => {
        changeResStatus({variables: { id, status}});
        refreshReservations(); 
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
        if (loading) return <p>loading reservations...</p>;
        if (error) {
            console.log(error);
            return <p>There was an error loading the reservations. Check the developer console for more info...</p>;
        }
        if(reservations.length) {
            return (
                <>
                    <h4>You have {reservations.length} reservations!</h4>
                    {reservations.map(reservation => {
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
            <Link to='/manage/listings'><button>Manage Listings</button></Link>
            {renderReservations()}
        </>
    );
};

export default Dashboard;