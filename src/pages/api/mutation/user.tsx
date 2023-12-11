import { gql } from '@apollo/client';


export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail {
    getUserByEmail {
      _id
      name
      email
      instituteId
    }
  }
`;


export const ADD_USER = gql`
  mutation CreateUser($createUser: CreateUserInputType!){
    createUser(createUser: $createUser){
        _id
    }
  }
`