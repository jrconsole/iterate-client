import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                        const d = new Date(0)
                        d.setUTCMilliseconds(reservation.date)
                        return <p>{reservation.id}, {reservation.gpu.name}, {reservation.person.firstName}, {d.toString()}</p>
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