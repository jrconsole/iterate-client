import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditForm from '../EditForm/EditForm';
import { useMutation } from '@apollo/client';
import { deleteGPU } from '../../util/graphql';

const ManageListings = (props) => {
    const [ editFormActive, setEditFormActive ] = useState(false);
    const [selectedGPU, setSelectedGPU] = useState({});

    const [dbDeleteGPU, { deleteError: error }] = useMutation(deleteGPU);

    const startEdit = (gpu) => {
        setSelectedGPU(gpu);
        setEditFormActive(true);
    }

    const onDelete = (id) => {
        dbDeleteGPU({variables: { id }});
        props.refresh();
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
                                <button onClick={() => onDelete(gpu.id)}>Delete</button>
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