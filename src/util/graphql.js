import { gql } from '@apollo/client';

export const serverURL = process.env.REACT_APP_ENV === 'production' ? 
'https://iterate-server-x7jsd.ondigitalocean.app' :
    (process.env.REACT_APP_ENV === 'portfolio' ? 
        'https://iterate-server-dev-mxvdn.ondigitalocean.app' : 
            'http://localhost:4000');

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
            imgURL
            specs
        }
    }
`

export const getGPU = gql`
    query gpu ($id: String!) {
        gpu(id: $id) {
            id
            name
            supplier {
                id
                name
            }
            price
            imgURL
            specs
        }
    }
`

export const addGPU = gql`
    mutation addGPU (
        $name: String!,
        $supplierId: String!,
        $price: Int!,
        $imgURL: String!,
        $specs: String!
    ) {
        createGPU(
            gpu: { 
                name: $name, 
                supplierId: $supplierId, 
                price: $price,
                imgURL: $imgURL,
                specs: $specs
            }
        ) {
            id
            name
            supplier {
                id
                name
            }
            price
            imgURL,
            specs
        } 
    }
`

export const updateGPU = gql`
        mutation updateGPU (
        $id: String!
        $name: String,
        $supplierId: String,
        $price: Int,
        $imgURL: String,
        $specs: String
    ) {
        updateGPU(
            gpuUpdate: { 
                id: $id
                name: $name, 
                supplierId: $supplierId, 
                price: $price,
                imgURL: $imgURL,
                specs: $specs
            }
        ) {
            id
            name
            supplier {
                id
                name
            }
            price
            imgURL
            specs
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
        $gpuIds: [String!]!,
        $personId: String!,
        $foundersOnly: Boolean!
    ) {
        createReservation(
            reservation: { 
                gpuIds: $gpuIds, 
                personId: $personId,
                foundersOnly: $foundersOnly 
            }
    ) {
        id
        gpus {
            id
            name
            supplier {
                name
            }
        }
        person {
            id
            firstName
            lastName
            email
            phone
        }
        foundersOnly
        date
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