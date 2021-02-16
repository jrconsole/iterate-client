import React, { useState } from 'react';
//import './EditForm.css';

const dbSuppliers = [ {name: 'supplier1'}, {name: 'supplier2'} ]

const EditForm = (props) => {

    const [gpuName, setGPUName] = useState(null);
    const [supplier, setSupplier] = useState({});
    const [supplierName, setSupplierName] = useState(null);

    const [formSubmitted, setFormSubmitted] = useState(false);

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     const userInput = { 
    //         info: { firstName, lastName, email, phone }, 
    //         foundersOnly: founders 
    //     };

    //     props.submitRes(userInput, props.card);
    //     setFormSubmitted(true);
    // }

    const renderForm = () => {
        if (formSubmitted) {
            return <h1>thanks!</h1>
        } else {
            return (
                <form onSubmit={''/*submitForm*/} >
                    <h4>Edit {props.gpu.name}</h4>
                    
                    <input 
                        type="text"
                        id="gpuNameEdit"
                        name="gpuName"
                        placeholder="GPU Name"
                        value={gpuName}
                        onChange={(e) => setGPUName(e.target.value)}
                        required />
                    <select name="suppliers" id="suppliers" defaultValue={'default'} onChange={(e) => setSupplier(e.target.value)}>
                    <option value='default' disabled >supplier</option>
                        {dbSuppliers.map(dbSupplier => {
                            return (
                                <option 
                                    value={dbSupplier}>
                                        {dbSupplier.name}</option>
                            )
                        })}
                    </select>
                        
                    {/* <input 
                        type="text"
                        id="lastNameRes"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required />
                    <input 
                        type="text"
                        id="emailRes"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <input 
                        type="text"
                        id="phoneRes"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required /> */}

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