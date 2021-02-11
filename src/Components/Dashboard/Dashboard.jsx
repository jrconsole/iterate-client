import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const getReservations = gql`
    query {
        reservations {
            id
            gpu {
                id
                name
            }
            person {
                id
                firstName
                lastName
                email
                phone
            }
        }
    }
`

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
            {renderReservations()}
        </>
    );
};

export default Dashboard;