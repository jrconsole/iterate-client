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

    useEffect(() => {
        refreshReservations()
    }, [])

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
            return <ManageListings gpus={props.gpus} refreshGPUs={props.refreshGPUs} />
        }
    }

    const renderSelectOptions = () => {
        return (
            <div className='selections'>
                    <button 
                        className={`
                            dashboard 
                            selection 
                            ${dataSelection === 'reservations' ? 'primary' : null}
                            ${dataSelection ? null : 'preview'}`}
                        onClick={() => setDataSelection('reservations')}>
                        Reservations
                    </button>
                    <button 
                        className={`
                            dashboard 
                            selection 
                            ${dataSelection === 'listings' ? 'primary' : null}
                            ${dataSelection ? null : 'preview'}`}
                        onClick={() => setDataSelection('listings')}>
                        Listings
                    </button>
            </div>
        )
    }

    return (
        <div className="dashboard">
            <Link to='/'><button className="nav">Live Page</button></Link>
            {renderSelectOptions()}
            {renderSelection()}
        </div>
    );
};