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
  mutation CreateStaff($createStaff: CreateStaffInputType!){
    createStaff(createStaff: $createStaff){
        _id
        name
        email
        instituteId
    }
  }
`


export const GET_USERS_WITH_FILTERS = gql`
  query GetUsersWithFilters($data: UserFiltersInput!) {
    getUsersWithFilters(data: $data) {
      _id
      name
      email
      instituteId
      role
    }
  }
`;