import { gql } from '@apollo/client';

export const GET_INSTITUTE_BY_ID = gql`
  query GetInstitute($id: String!) {
    getInstitute(instituteId: $id) {
        _id
        name
        about
        streetAddress
        city
        pincode
        state
        country
        pocName
        pocMobile
    }
  }
`;


export const CREATE_INSTITUTE = gql`
mutation CreateInstitute($instituteData: InstituteInput!) {
    createInstitute(instituteData: $instituteData) {
      _id
    }
  }`


export const EDIT_INSTITUTE = gql`
  mutation EditInstitute($instituteId: String!, $instituteData: InstituteInput!) {
    editInstitute(instituteId: $instituteId, instituteData: $instituteData) {
      _id
      name
      streetAddress
      city
      pocMobile
      pocName
    }
  }
`;