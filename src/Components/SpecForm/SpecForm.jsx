import React, { useEffect, useState } from 'react';
import './SpecForm.css';
// import { addGPU, updateGPU, addSupplier, getSuppliers } from '../../util/graphql';
// import { useMutation, useQuery } from '@apollo/client';

export const SpecForm = (props) => {
    // const newGPU = props.gpu.id ? false : true;

    // const [gpuName, setGPUName] = useState(newGPU ? null : props.gpu.name);

    // const { loading, error, data } = useQuery(getSuppliers);
    // const [createSupplier, { error: supplierError }] = useMutation(addSupplier);

    const setCatLabel = (oldCatLabel, newCatLabel, catSpecs) => {
        const newSpecs = props.specs;
        delete newSpecs[oldCatLabel];

        props.setSpecs({
            ...newSpecs,
            [newCatLabel]: catSpecs
        })
    } 

    const setSpec = (category, oldSpecKey, newSpecKey, oldSpecValue, newSpecValue) => {
        const newSpecs = props.specs;
        newSpecs[category] = newSpecs[category].filter(spec => (spec[0] !== oldSpecKey || spec[1] !== oldSpecValue));

        props.setSpecs({
            ...newSpecs, 
            [category]: [
                ...props.specs[category],
                [newSpecKey, newSpecValue]
            ] 
        })
    }

    const addCategory = () => {
        props.setSpecs({
            ...props.specs,
            "New Category": []
        })
    }

    const addSpec = (category) => {
        props.setSpecs({
            ...props.specs,
            [category]: [
                ...props.specs[category],
                ["New Spec", '']
            ]
        })
    }

    const deleteCategory = (category) => {
        const newSpecs = props.specs;
        delete newSpecs[category];

        props.setSpecs({...newSpecs});
    }

    const deleteSpec = (category, spec) => {
        const newSpecs = props.specs;
        newSpecs[category] = newSpecs[category].filter(listSpec => (spec[0] !== listSpec[0] || spec[1] !== listSpec[1]))

        props.setSpecs({
            ...newSpecs,
            [category]: [ ...newSpecs[category] ]
        })
    }

    const renderCategories = () => {
        return Object.keys(props.specs).map(category => {
            return (
                <> 
                    <hr />
                    <button type= "button" onClick={() => deleteCategory(category)}>Delete Category</button>
                    <label htmlFor={`${category}CatInput`}>Label</label>
                    <input 
                        type="text"
                        id={`${category}CatInput`}
                        name={`${category}CatInput`}
                        placeholder={`Input Category Label`}
                        value={category}
                        onChange={(e) => setCatLabel(category, e.target.value, props.specs[category])}
                        required />
                    {renderSpecs(category)}
                    <button type= "button" onClick={() => addSpec(category)}>Add Spec</button>
                </>
            )
        })       
    }

    const renderSpecs = (category) => {
        return props.specs[category].map(spec => {
            return (
                <>
                    <label htmlFor={`${spec[0]}KeyInput`}>Label</label>
                    <input 
                        type="text"
                        id={`${spec[0]}KeyInput`}
                        name={`${spec[0]}KeyInput`}
                        placeholder={`Input Spec Label`}
                        value={spec[0]}
                        onChange={(e) => setSpec(category, spec[0], e.target.value, spec[1], spec[1])}
                        required />

                    <label htmlFor={`${spec[0]}ValueInput`}>Value</label>
                    <input 
                        type="text"
                        id={`${spec[0]}ValueInput`}
                        name={`${spec[0]}ValueInput`}
                        placeholder={`Input ${spec[0]} Value`}
                        value={spec[1]}
                        onChange={(e) => setSpec(category, spec[0], spec[0], spec[1], e.target.value)}
                        required />
                    <button type= "button" onClick={() => deleteSpec(category, spec)}>Delete Spec</button>
                </>
            )
        })
    }

    return (
        <>
            <h3>Specifications</h3>
            <button type= "button" onClick={addCategory}>Add Category</button>
            {renderCategories()}
        </>
    );
};
