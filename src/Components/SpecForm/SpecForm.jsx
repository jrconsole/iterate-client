import React, { useEffect, useState } from 'react';
import './SpecForm.css';
// import { addGPU, updateGPU, addSupplier, getSuppliers } from '../../util/graphql';
// import { useMutation, useQuery } from '@apollo/client';

export const SpecForm = (props) => {
    // const newGPU = props.gpu.id ? false : true;

    // const [gpuName, setGPUName] = useState(newGPU ? null : props.gpu.name);

    // const { loading, error, data } = useQuery(getSuppliers);
    // const [createSupplier, { error: supplierError }] = useMutation(addSupplier);

    const setCatLabel = (catIndex, newCatLabel) => {
        const newSpecs = [...props.specs];
        newSpecs[catIndex][0] = newCatLabel;

        props.setSpecs( newSpecs )
    } 

    const setSpec = (catIndex, specIndex, newSpecKey, newSpecValue) => {
        const newSpecs = [...props.specs];
        newSpecs[catIndex][1][specIndex][0] = newSpecKey;
        newSpecs[catIndex][1][specIndex][1] = newSpecValue;

        props.setSpecs( newSpecs )
    }

    const addCategory = () => {
        props.setSpecs([
            ...props.specs,
            ['', []]
        ])
    }

    const addSpec = (catIndex) => {
        const newSpecs = [...props.specs];
        newSpecs[catIndex][1].push(['', ''])

        props.setSpecs( newSpecs )
    }

    const deleteCategory = (catIndex) => {
        const newSpecs = [...props.specs];
        newSpecs.splice(catIndex, 1);

        props.setSpecs( newSpecs );
    }

    const deleteSpec = (catIndex, specIndex) => {
        const newSpecs = [...props.specs];
        newSpecs[catIndex][1].splice(specIndex, 1);

        props.setSpecs( newSpecs )
    }

    const renderCategories = () => {
        return props.specs.map((category, index) => {
            return (
                <> 
                    <div className="category">
                        <input 
                            type="text"
                            id={`CatInput${index}`}
                            name={`Category Input - ${category}`}
                            placeholder='Category Label'
                            value={category[0]}
                            onChange={(e) => setCatLabel(index, e.target.value)}
                            required />
                        <button type= "button" onClick={() => deleteCategory(index)}>Delete</button>
                    </div>
                    {renderSpecs(index)}
                    <button className="addSpec" type= "button" onClick={() => addSpec(index)}>+</button>
                </>
            )
        })       
    }

    const renderSpecs = (catIndex) => {
        return props.specs[catIndex][1].map((spec, index) => {
            const lastSpec = index === (props.specs[catIndex][1].length -1) ? "last" : null;
            return (
                <div className={`spec ${lastSpec}`}>
                    {/* <label htmlFor={`${spec[0]}KeyInput`}>Label</label> */}
                    <input 
                        type="text"
                        id={`${spec[0]}KeyInput`}
                        name={`${spec[0]} Key Input`}
                        placeholder='Spec Label'
                        value={spec[0]}
                        onChange={(e) => setSpec(catIndex, index, e.target.value, spec[1])}
                        required />

                    {/* <label htmlFor={`${spec[0]}ValueInput`}>Value</label> */}
                    <input 
                        type="text"
                        id={`${spec[0]}ValueInput`}
                        name={`${spec[0]} Value Input`}
                        placeholder={`${spec[0]} Value`}
                        value={spec[1]}
                        onChange={(e) => setSpec(catIndex, index, spec[0], e.target.value)}
                        required />
                    <button type= "button" onClick={() => deleteSpec(catIndex, index)}>Delete</button>
                </div>
            )
        })
    }

    return (
        <>
            <div className="header">
                <h3>Specifications</h3>
            </div>
            {renderCategories()}
            <button className="texty" type= "button" onClick={addCategory}>Add Category +</button>
        </>
    );
};
