import React, { useEffect, useState } from 'react';
import OfferCard from '../OfferCard/OfferCard';
import { useQuery, gql } from '@apollo/client';

const getBoards = gql`
    query {
        boards {
            id
            name
            supplier {
            id
            name
            }
            gpu {
            id
            name
            supplier {
                id
                name
            }
            }
            price
            inventory
            quantity
        }
    }
`

const OfferList = (props) => {
    const { loading, error, data } = useQuery(getBoards);
    const [ boards, setBoards ] = useState([]);
    useEffect(() => {
        if(data) {
            setBoards(data.boards);
        }
    }, [data])

    const renderCards = () => {
        if(boards.length) {
            return boards.map(board => {
                let reserved = false;
                props.reservedCards.forEach(reservedBoard => {
                    if(board.name === reservedBoard.name) {
                        reserved = true;
                    }
                })
                return <OfferCard key={board.id} card={board} startRes={props.startRes} reserved={reserved} />
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