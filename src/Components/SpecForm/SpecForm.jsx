import React, { useEffect, useState } from 'react';
import './SpecForm.css';
import { addGPU, updateGPU, addSupplier, getSuppliers } from '../../util/graphql';
import { useMutation, useQuery } from '@apollo/client';

export const SpecForm = (props) => {
    const newGPU = props.gpu.id ? false : true;

    const [gpuName, setGPUName] = useState(newGPU ? null : props.gpu.name);

    const { loading, error, data } = useQuery(getSuppliers);
    const [createSupplier, { error: supplierError }] = useMutation(addSupplier);

    const setSpec = (category, oldSpecKey, specKey, specValue) => {
        const allSpecs = props.specs;
        delete allSpecs[category][specKey];
        props.setSpecs({
            ...props.specs, 
            [props.specs[category]]: {
                ...props.specs[category],
                [specKey]: specValue
            } 
        })
    }

    const renderCategories = () => {
        return Object.keys(props.specs).map(category => {
            return (
                <> 
                    <hr />
                    <h4>{category}</h4>
                    {renderSpecs(category)}
                    <hr />
                </>
            )
        })       
    }

    const renderSpecs = (category) => {
        return Object.entries(props.specs[category]).map(spec => {
            return (
                <>
                    <input 
                        type="text"
                        id={`${spec[0]}KeyInput`}
                        name={`${spec[0]}KeyInput`}
                        placeholder={`Input Spec Label`}
                        value={spec[0]}
                        onChange={(e) => setSpec(category, spec[0], e.target.value, spec[1])}
                        required />
                    
                    <input 
                        type="text"
                        id={`${spec[0]}ValueInput`}
                        name={`${spec[0]}ValueInput`}
                        placeholder={`Input ${spec[0]} Value`}
                        value={spec[1]}
                        onChange={(e) => setSpec(category, spec[0], spec[0], e.target.value)}
                        required />
                        
                    {spec[0]}: {spec[1]}
                        
                    <input />
                </>
            )
        })
    }

    return (
        <>
            <h3>Specifications</h3>
            {renderCategories()}
        </>
    );
};
