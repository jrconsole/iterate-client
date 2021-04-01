import React, { useEffect, useState } from 'react';
import './EditForm.css';
import { SpecForm } from '../SpecForm/SpecForm';
import { serverURL, addGPU, updateGPU, addSupplier, getSuppliers } from '../../util/graphql';
import { useMutation, useQuery } from '@apollo/client';
import axios from 'axios';

export const EditForm = (props) => {
    const newGPU = props.gpu.id ? false : true;

    const [gpuName, setGPUName] = useState(newGPU ? null : props.gpu.name);
    const [gpuPriceDollars, setGPUPriceDollars] = useState(newGPU ? null : Math.floor(props.gpu.price)/100);
    const [gpuPriceCents, setGPUPriceCents] = useState(newGPU ? null : props.gpu.price % 100)
    const [selectedSupplier, setSelectedSupplier] = useState(newGPU ? null : props.gpu.supplier.id);
    const [supplierName, setSupplierName] = useState(null);
    const [newSupplier, setNewSupplier] = useState(false);
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [previewURL, setPreviewURL] = useState(newGPU ? null : props.gpu.imgURL);
    const [imgFile, setImgFile] = useState(null);
    const [specs, setSpecs] = useState(newGPU ? [] : JSON.parse(props.gpu.specs));

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

    const handleImgChange = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreviewURL(url);
        setImgFile(e.target.files[0]);
    }
    
    const uploadImg = async () => {    
        const imgData = new FormData();
        imgData.append("image", imgFile);
        try {
            const response = await axios({
                method: "post",
                url: `${serverURL}/upload`, 
                data: imgData,
                headers: { "Content-Type": "multipart/form-data"}
            });
            const imgURL = response.data.imgURL;
            
            return imgURL;
        } catch (error) {
            console.log(error);
        }
    }

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
        const gpuPrice = parseInt(gpuPriceDollars*100) + (gpuPriceCents ? parseInt(gpuPriceCents) : null);

        if (newGPU) {
            const imgURL = await uploadImg();

            gpuInput.variables.name = gpuName;
            gpuInput.variables.supplierId = supplierId;
            gpuInput.variables.price = gpuPrice;
            gpuInput.variables.imgURL = imgURL;
            gpuInput.variables.specs = JSON.stringify(specs);

            await createGPU(gpuInput)
        } else {
            gpuInput.variables.id = props.gpu.id;
            if (props.gpu.name !== gpuName) {
                gpuInput.variables.name = gpuName;
            }
            if (props.gpu.supplier.id !== supplierId) {
                gpuInput.variables.supplierId = supplierId
            }
            if (props.gpu.price !== gpuPrice) {
                gpuInput.variables.price = gpuPrice;
            }
            if (props.gpu.imgURL !== previewURL) {
                const imgURL = await uploadImg();

                gpuInput.variables.imgURL = imgURL;
            }
            if (props.gpu.specs !== specs) {
                gpuInput.variables.specs = JSON.stringify(specs);
            }
            console.log(gpuInput)
            await editGPU(gpuInput);
        }

        if(supplierError) { console.log(supplierError) };
        if(addGPUError) { console.log(addGPUError) };
        if(updateGPUError) { console.log(updateGPUError) };
        setFormSubmitted(true);
        props.refreshGPUs();
    }

    const renderNewSupplierFields = () => {
        return (
            <div>
                <input 
                    type="text"
                    id="supplierNameAdd"
                    name="supplierName"
                    placeholder="Supplier Name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    required />
                <button type= "button" onClick={() => setNewSupplier(false)}>Close</button>
            </div>
        )
    }

    const renderSelectSupplier = () => {
        if (loading) {return <p>loading suppliers...</p>};
        if (error) {
            console.log(error);
            return <p>Couldn't fetch suppliers!</p>
        }
        return (
                <div>
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
                    <button type= "button" onClick={() => setNewSupplier(true)}>New</button>
                </div>
        )
    }

    const renderForm = () => {
        if (formSubmitted) {
            return (
                <div className="submitMessage card">
                    <h1>Sweet!</h1>
                    <span>Your listings have been updated.</span>
                    
                    <button onClick={props.closeForm} >Close</button>
                </div>
            )
        } else {
            return (
                <form onSubmit={submitForm}>
                    <h2>{newGPU ? `Add a GPU Listing` : `Edit ${props.gpu.name}`}</h2> 
                    
                    <section className="main">
                        <label htmlFor="gpuNameEdit">GPU Name</label>
                        <input 
                            type="text"
                            id="gpuNameEdit"
                            name="gpuName"
                            placeholder="GPU Name"
                            value={gpuName}
                            onChange={(e) => setGPUName(e.target.value)}
                            required />

                        <label htmlFor="suppliers" >Supplier</label>
                        {newSupplier ? renderNewSupplierFields() : renderSelectSupplier()}

                        <label htmlFor="gpuPriceDollarsEdit">Price</label>
                        <div className="price">
                            <span>$</span>
                            <input
                                type="number"
                                id="gpuPriceDollarsEdit"
                                name="gpuPriceDollars"
                                placeholder="50"
                                value={gpuPriceDollars}
                                onChange={(e) => setGPUPriceDollars(e.target.value)}
                                required />
                            <span>.</span>
                            <input 
                                type="number"
                                id="gpuPriceCentsEdit"
                                name="gpuPriceCents"
                                placeholder="00"
                                value={gpuPriceCents}
                                onChange={(e) => setGPUPriceCents(e.target.value)}/>
                            <span> /mo</span>
                        </div>
                        
                        <label htmlFor="gpuImageUpload">Image</label>
                        <div>
                            <img className="imgPreview" src={previewURL} />
                            <input id="gpuImageUpload" type="file" accept="image/*" onChange={handleImgChange} required={previewURL ? false : true}/>
                        </div>
                    </section>

                    <hr/>

                    <section className="specForm">
                        <SpecForm gpu={props.gpu} specs={specs} setSpecs={setSpecs} />
                    </section>

                    <div className="buttons">
                        <button onClick={props.closeForm}>Cancel</button>
                        <button className='primary' type='submit'>Submit</button>
                    </div>
                </form>
            )
        }
    }

    return (
        <div className="formContainer editForm">
            {renderForm()}
            <div className='formBack' onClick={props.closeForm}></div>
        </div>
    );
};