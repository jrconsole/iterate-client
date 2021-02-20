import React, { useEffect, useState } from 'react';
import './EditForm.css';
import { addGPU, updateGPU, addSupplier, getSuppliers } from '../../util/graphql';
import { useMutation, useQuery } from '@apollo/client';

const EditForm = (props) => {
    const newGPU = props.gpu.id ? false : true;

    const [gpuName, setGPUName] = useState(newGPU ? null : props.gpu.name);
    const [selectedSupplier, setSelectedSupplier] = useState(newGPU ? null : props.gpu.supplier.id);
    const [supplierName, setSupplierName] = useState(null);
    const [newSupplier, setNewSupplier] = useState(false);
    const [allSuppliers, setAllSuppliers] = useState([]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { loading, error, data } = useQuery(getSuppliers);
    const [createSupplier, { error: supplierError }] = useMutation(addSupplier);
    const [createGPU, { error: addGPUError }] = useMutation(addGPU);
    const [editGPU, { error: updateGPUError}] = useMutation(updateGPU);

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

        const gpuInput = { variables: {} }

        if (newGPU) {
            gpuInput.variables.name = gpuName;
            gpuInput.variables.supplierId = supplierId;

            await createGPU(gpuInput)
        } else {
            gpuInput.variables.id = props.gpu.id;
            if (props.gpu.name !== gpuName) {
                gpuInput.variables.name = gpuName;
            }
            if (props.gpu.supplier.id !== supplierId) {
                gpuInput.variables.supplierId = supplierId
            }
            console.log(gpuInput)
            await editGPU(gpuInput);
        }

        if(supplierError) { console.log(supplierError) };
        if(addGPUError) { console.log(addGPUError) };
        if(updateGPUError) { console.log(updateGPUError) };
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
        if (loading) {return <p>loading suppliers...</p>};
        if (error) {
            console.log(error);
            return <p>Couldn't fetch suppliers!</p>
        }
        return (
            <>
                <button onClick={() => setNewSupplier(true)}>New Supplier</button>
                <select 
                    name="suppliers" 
                    id="suppliers" 
                    defaultValue=''
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    required>
                <option value='' disabled hidden>supplier</option>
                    {allSuppliers.map(dbSupplier => {
                        return (
                            <option 
                                value={dbSupplier.id}>
                                    {dbSupplier.name}</option>
                        )
                    })}
                </select>
            </>
        )
    }

    const renderForm = () => {
        if (formSubmitted) {
            return <h1>thanks!</h1>
        } else {
            return (
                <form onSubmit={submitForm} >
                    <h4>{newGPU ? `Add a GPU Listing` : `Edit ${props.gpu.name}`}</h4> 
                    
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