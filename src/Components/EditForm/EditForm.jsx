import React, { useEffect, useState } from 'react';
import './EditForm.css';
import { SpecForm } from '../SpecForm/SpecForm';
import { addGPU, updateGPU, addSupplier, getSuppliers } from '../../util/graphql';
import { useMutation, useQuery } from '@apollo/client';
import axios from 'axios';

const EditForm = (props) => {
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
    const [specs, setSpecs] = useState(JSON.parse(props.gpu.specs));

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
                url: 'http://localhost:4000/upload', 
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
    }

    const renderNewSupplierFields = () => {
        return (
            <>
                <input 
                    type="text"
                    id="supplierNameAdd"
                    name="supplierName"
                    placeholder="Supplier Name"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    required />
                <button type= "button" onClick={() => setNewSupplier(false)}>close</button>
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
                <button type= "button" onClick={() => setNewSupplier(true)}>New Supplier</button>
            </>
        )
    }

    const renderForm = () => {
        if (formSubmitted) {
            return <h1>thanks!</h1>
        } else {
            return (
                <form onSubmit={submitForm} >
                    <h2>{newGPU ? `Add a GPU Listing` : `Edit ${props.gpu.name}`}</h2> 
                    
                    <input 
                        type="text"
                        id="gpuNameEdit"
                        name="gpuName"
                        placeholder="GPU Name"
                        value={gpuName}
                        onChange={(e) => setGPUName(e.target.value)}
                        required />

                    {newSupplier ? renderNewSupplierFields() : renderSelectSupplier()}

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

                    <input type="file" accept="image/*" onChange={handleImgChange} />
                    <img className="imgPreview" src={previewURL} />

                    <SpecForm gpu={props.gpu} specs={specs} setSpecs={setSpecs} />

                    <input type='submit'/>
                </form>
            )
        }
    }

    return (
        <>
            <div className='formBack' onClick={props.closeForm}></div>
            {renderForm()}
            
        </>
    );
};

export default EditForm;