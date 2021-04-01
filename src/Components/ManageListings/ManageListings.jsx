import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EditForm } from '../EditForm/EditForm';
import { OfferCard } from '../OfferCard/OfferCard';
import { useMutation } from '@apollo/client';
import { deleteGPU } from '../../util/graphql';
import './ManageListings.css';

export const ManageListings = (props) => {
    const [ editFormActive, setEditFormActive ] = useState(false);
    const [selectedGPU, setSelectedGPU] = useState({});

    const [dbDeleteGPU, { deleteError: error }] = useMutation(deleteGPU);

    const openForm = (gpu) => {
        setSelectedGPU(gpu);
        setEditFormActive(true);
    }

    const onDelete = (id) => {
        dbDeleteGPU({variables: { id }});
        props.refreshGPUs();
    }

    const closeEditForm = () => {
        setEditFormActive(false);
    }

    const renderListings = () => {
        if(props.gpus.length) {
            return (
                <div className="listContainer">
                    {props.gpus.map(gpu => {
                        return (
                            <>
                                <OfferCard view='manage' card={gpu} openForm={openForm} onDelete={onDelete} />
                            </>
                        )
                    })}
                </div>
            )
        } else {
            return 'Add a listing!'
        }
    }

    return (
        <>
            <button onClick={() => openForm({})}>Add Listing</button>
            {renderListings()}
            {editFormActive ? <EditForm gpu={selectedGPU} closeForm={closeEditForm} refreshGPUs={props.refreshGPUs} /> : null}
        </>
    );
};