import { gql } from '@apollo/client';

export const getGPUs = gql`
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

export const getReservations = gql`
    query {
        reservations {
            id
            gpu {
                id
                name
            }
            person {
                id
                firstName
                lastName
                email
                phone
            },
            foundersOnly,
            date
        }
    }
`

export const addPerson = gql`
    mutation addPerson (
        $firstName: String!,
        $lastName: String!,
        $email: String!
        $phone: String!
    ) {
        createPerson(
        person: { 
        firstName: $firstName, 
        lastName: $lastName, 
        email: $email, 
        phone: $phone
        }
    ) {
        id
        firstName
        lastName
        email
        phone
    }
}
`

export const addReservation = gql`
    mutation addReservation (
        $gpuId: String!,
        $personId: String!,
        $foundersOnly: Boolean!
    ) {
        createReservation(
        reservation: { 
        gpuId: $gpuId, 
        personId: $personId,
        foundersOnly: $foundersOnly 
        }
    ) {
        id
        gpu {
            id
        }
        person {
            id
        }
    }
}
`