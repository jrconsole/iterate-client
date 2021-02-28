import { gql } from '@apollo/client';

export const getSuppliers = gql`
    query {
        suppliers {
            id
            name
        }
    }
`

export const addSupplier = gql`
    mutation addSupplier (
        $name: String!
    ) {
        createSupplier(
            supplier: {
                name: $name
            }
        ) {
            id
            name
        }
    } 
`

export const getGPUs = gql`
    query {
        gpus {
            id
            name
            supplier {
                id
                name
            }
            price
        }
    }
`

export const addGPU = gql`
    mutation addGPU (
        $name: String!,
        $supplierId: String!
        $price: Int!
    ) {
        createGPU(
            gpu: { 
                name: $name, 
                supplierId: $supplierId, 
                price: $price
            }
        ) {
            id
            name
            supplier {
                id
                name
            }
            price
        } 
    }
`

export const updateGPU = gql`
        mutation updateGPU (
        $id: String!
        $name: String,
        $supplierId: String,
        $price: Int!
    ) {
        updateGPU(
            gpuUpdate: { 
                id: $id
                name: $name, 
                supplierId: $supplierId, 
                price: $price
            }
        ) {
            id
            name
            supplier {
                id
                name
            }
            price
        } 
    }
`

export const deleteGPU = gql`
    mutation deleteGPU ($id: String!) {
        deleteOneGPU(id: $id) {
            id
            name
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
            date,
            status
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

export const updateReservation = gql`
    mutation updateReservation( 
        $id: String!, 
        $status: ReservationStatus! 
    ) {
        updateReservation( 
            reservationUpdate: { 
                id: $id, 
                status: $status 
            } 
        ) {
            id
            gpu {
                id
            }
            person {
                id
            }
            status
        }
    }
`

export const addPerson = gql`
    mutation addPerson (
        $firstName: String!,
        $lastName: String!,
        $email: String!,
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