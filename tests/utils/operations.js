import { gql } from 'apollo-boost'

export const createUser = gql`
    mutation ($data: CreateUserInput!) {
        createUser(data: $data){
            token
            user {
                id
                name
                email
            }
        }
    }
`

export const loginUser = gql`
    mutation ($data: LoginUserInput!) {
        loginUser(data: $data) {
            token
        }
    }
`

export const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`
