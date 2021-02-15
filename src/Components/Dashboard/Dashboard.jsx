import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getReservations } from '../../util/graphql';

const Dashboard = (props) => {
    const { loading, error, data } = useQuery(getReservations);
    const [ reservations, setReservations ] = useState([]);
    useEffect(() => {
        if(data) {
            setReservations(data.reservations);
        }
    }, [data])

    const renderReservations = () => {
        if(reservations.length) {
            return reservations.map(reservation => {
                return <p>{reservation.id}, {reservation.gpu.name}, {reservation.person.firstName}</p>
            })
        } else {
            return 'Go get some Reservations!'
        }
    }

    if (loading) return <p>loading ...</p>;
    if (error) {
        console.log(error);
        return <p>nooo</p>;
    }
    return (
        <>
            <h4>You have {reservations.length} reservations!</h4>
            {renderReservations()}
        </>
    );
};

export default Dashboard;