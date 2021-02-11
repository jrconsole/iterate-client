import React, { useEffect, useState } from 'react';
import OfferCard from '../OfferCard/OfferCard';
import { useQuery, gql } from '@apollo/client';

const getGPUs = gql`
    query {
        gpus {
            id
            name
            supplier {
                id
                name
            }
        }
    }
`

const OfferList = (props) => {
    const { loading, error, data } = useQuery(getGPUs);
    const [ gpus, setGPUs ] = useState([]);
    useEffect(() => {
        if(data) {
            setGPUs(data.gpus);
        }
    }, [data])

    const renderCards = () => {
        if(gpus.length) {
            return gpus.map(gpu => {
                let reserved = false;
                props.reservedCards.forEach(reservedGPU => {
                    if(gpu.name === reservedGPU.name) {
                        reserved = true;
                    }
                })
                return <OfferCard key={gpu.id} card={gpu} startRes={props.startRes} reserved={reserved} />
            })
        }
    }

    if (loading) return <p>loading ...</p>;
    if (error) {
        console.log(error);
        return <p>nooo</p>;
    }
    return (
        <>
            {renderCards()}
        </>
    );
};

export default OfferList;