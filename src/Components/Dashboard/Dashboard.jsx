import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { getReservations, updateReservation } from '../../util/graphql';
import { ReservationList } from '../ReservationList/ReservationList';
import { ManageListings } from '../ManageListings/ManageListings';

export const Dashboard = (props) => {
    const [ dataSelection, setDataSelection ] = useState(null);
    const { loading, error, data, refetch: refreshReservations } = useQuery(getReservations);
    const [changeResStatus, { error: statusError }] = useMutation(updateReservation);
    const [ reservations, setReservations ] = useState([]);

    useEffect(() => {
        if(data) {
            setReservations(data.reservations);
        }
    }, [data])

    const renderSelection = () => {
        if (dataSelection === 'reservations') {
            if (loading) { return <p>loading reservations...</p> };
            if (error) {
                console.log(error);
                return <p>There was an error loading the reservations. Check the developer console for more info...</p>;
            }
            if (statusError) {
                console.log(statusError);
                return <p>There was an error updating the reservation status. Please refresh the page and try again.</p>
            }
            return <ReservationList 
                        reservations={reservations} 
                        refresh={refreshReservations} 
                        updateStatus={changeResStatus}/>
        } else if (dataSelection === 'listings') {
            return <ManageListings gpus={props.gpus} refresh={props.refresh} />
        }
    }

    const renderDashboard = () => {
        if (dataSelection) {
            return (
                <>
                    <button 
                        className={`dashboard ${dataSelection === 'reservations' ? 'active' : null}`}
                        onClick={() => setDataSelection('reservations')}>
                        Reservations</button>
                    <button 
                        className={`dashboard ${dataSelection === 'listings' ? 'active' : null}`}
                        onClick={() => setDataSelection('listings')}>
                        Listings</button>
    
                    {renderSelection()}
                </>
            )
        } else {
            return (
                <div className='dashboard container'>
                    <div 
                        className='dashboard selection' 
                        onClick={() => setDataSelection('reservations')}>
                        Reservations</div>
                    <div 
                        className='dashboard selection'
                        onClick={() => setDataSelection('listings')}>
                        Listings</div>
                </div>
            )
        }
    }

    return (
        <>
            <Link to='/'><button>Live Page</button></Link>
            
            {renderDashboard()}
        </>
    );
};