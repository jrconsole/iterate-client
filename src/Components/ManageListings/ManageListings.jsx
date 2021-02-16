import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditForm from '../EditForm/EditForm';
import { useQuery } from '@apollo/client';
import { getReservations } from '../../util/graphql';

const ManageListings = (props) => {
    const [ editFormActive, setEditFormActive ] = useState(false);
    const [selectedGPU, setSelectedGPU] = useState({});

    const startEdit = (gpu) => {
        setSelectedGPU(gpu);
        setEditFormActive(true);
    }

    const closeEditForm = () => {
        setEditFormActive(false);
    }

    const renderListings = () => {
        if(props.gpus.length) {
            return (
                <>
                    {props.gpus.map(gpu => {
                        return (
                            <>
                                <p>{gpu.id}, {gpu.name}</p>
                                <button onClick={() => startEdit(gpu)}>Edit</button>
                            </>
                        )
                    })}
                </>
            )
        } else {
            return 'Add a listing!'
        }
    }

    return (
        <>
            <Link to='/manage'><button>Dashboard</button></Link>
            {renderListings()}
            {editFormActive ? <EditForm gpu={selectedGPU} /> : null}
        </>
    );
};

export default ManageListings;