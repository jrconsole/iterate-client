import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EditForm } from '../EditForm/EditForm';
import { OfferCard } from '../OfferCard/OfferCard';
import { useMutation } from '@apollo/client';
import { deleteGPU } from '../../util/graphql';
import './ManageListings.css';

export const ManageListings = (props) => {
    const [ editFormActive, setEditFormActive ] = useState(false);
    const [ deleteFormActive, setDeleteFormActive ] = useState(false);
    const [selectedGPU, setSelectedGPU] = useState({});

    const [dbDeleteGPU, { deleteError: error }] = useMutation(deleteGPU);

    const openForm = (gpu) => {
        setSelectedGPU(gpu);
        setEditFormActive(true);
    }

    const closeEditForm = () => {
        setEditFormActive(false);
    }

    const onDelete = (id) => {
        dbDeleteGPU({variables: { id }});
        props.refreshGPUs();
        closeDeleteForm();
    }

    const openDeleteForm = (gpu) => {
        setSelectedGPU(gpu);
        setDeleteFormActive(true);
    }

    const closeDeleteForm = () => {
        setDeleteFormActive(false);
    }

    const renderListings = () => {
        if(props.gpus.length) {
            return (
                <div className="listContainer">
                    {props.gpus.map(gpu => {
                        return (
                            <>
                                <OfferCard 
                                    view='manage'  
                                    card={gpu} 
                                    openForm={openForm} 
                                    confirmDelete={openDeleteForm}/>
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
            <div className="centeredArea">
                <div className="listContainer alignLeft">
                    <div><button onClick={() => openForm({})}>Add +</button></div>
                    {renderListings()}
                </div>
            </div>

            {editFormActive ? 
                <EditForm gpu={selectedGPU} closeForm={closeEditForm} refreshGPUs={props.refreshGPUs} /> 
            : null}
            
            {deleteFormActive ?
                <div className="formContainer deleteForm">
                    <div className="submitMessage card">
                        <h1>Woah!</h1>
                        <span>Are you sure you want to DELETE this card permanently?</span>
                        <p>{selectedGPU.supplier.name} - {selectedGPU.name}</p>
                        
                        <button onClick={closeDeleteForm} >Close</button>
                        <button className="warning" onClick={() => onDelete(selectedGPU.id)}>Delete</button>
                    </div>
                    <div className='formBack' onClick={closeDeleteForm}></div>
                </div> 
            : null}
        </>
    );
};