import React, { useEffect, useState } from 'react';
import './EditForm.css';
import { addGPU, addSupplier, getSuppliers } from '../../util/graphql';
import { useMutation, useQuery } from '@apollo/client';

const EditForm = (props) => {

    const [gpuName, setGPUName] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState({});
    const [supplierName, setSupplierName] = useState(null);
    const [newSupplier, setNewSupplier] = useState(false);
    const [allSuppliers, setAllSuppliers] = useState([]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { loading, error, data } = useQuery(getSuppliers);
    const [createSupplier, { error: supplierError }] = useMutation(addSupplier);
    const [createGPU, { error: gpuError }] = useMutation(addGPU);

    useEffect(() => {
        if (data) {
            const dbSuppliers = data.suppliers;
            setAllSuppliers(dbSuppliers);
        }
    }, [data])

    const submitForm = async (e) => {
        e.preventDefault();

        let supplierId;
        if (newSupplier) {
            const {data: {createSupplier: newSupplier}} = await createSupplier({
                variables: { name: supplierName }
            })
            supplierId = newSupplier.id;
        } else {
            supplierId = selectedSupplier;
        }

        await createGPU({
            variables: {
                name: gpuName,
                supplierId
            }
        })

        if (supplierError || gpuError) {
            const error = supplierError ? supplierError : gpuError;
            console.log(error);
        }
        setFormSubmitted(true);
    }

    const renderNewSupplierFields = () => {
        return (
            <>
                <button onClick={() => setNewSupplier(false)}>close</button>
                <input 
                        type="text"
                        id="supplierNameAdd"
                        name="supplierName"
                        placeholder="Supplier Name"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        required />
            </>
        )
    }

    const renderSelectSupplier = () => {
        if (loading) return <p>loading suppliers...</p>;
        if (error) {
            console.log(error);
            return <p>Couldn't fetch suppliers!</p>
        }
        return (
            <>
                <select 
                    name="suppliers" 
                    id="suppliers" 
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    required>
                <option value='' disabled selected hidden>supplier</option>
                    {allSuppliers.map(dbSupplier => {
                        return (
                            <option 
                                value={dbSupplier.id}>
                                    {dbSupplier.name}</option>
                        )
                    })}
                </select>
                <button onClick={() => setNewSupplier(true)}>New Supplier</button>
            </>
        )
    }

    const renderForm = () => {
        if (formSubmitted) {
            return <h1>thanks!</h1>
        } else {
            return (
                <form onSubmit={submitForm} >
                    <h4>Edit {props.gpu.name}</h4>
                    
                    <input 
                        type="text"
                        id="gpuNameEdit"
                        name="gpuName"
                        placeholder="GPU Name"
                        value={gpuName}
                        onChange={(e) => setGPUName(e.target.value)}
                        required />

                    {newSupplier ? renderNewSupplierFields() : renderSelectSupplier()}

                    <input type='submit'/>
                </form>
            )
        }
    }

    return (
        <>
            {renderForm()}
            {/*<div className='formBack' onClick={props.closeForm}></div>*/}
        </>
    );
};

export default EditForm;