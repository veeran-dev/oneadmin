import { gql } from "@apollo/client";

export const CREATE_BRANCH = gql`
  mutation CreateBranch($branchData: BranchInput!) {
    createBranch(branchData: $branchData) {
      _id
      instituteId
      name
      pocName
      pocMobile
    }
  }
`;



export const GET_BRANCHES_BY_INSTITUTE_ID = gql`
  query GetBranchesByInstituteId($query: getBranchesByInstituteId!) {
    getBranchesByInstituteId(query: $query) {
      _id
      instituteId
      name
      pocName
      pocMobile
    }
  }
`;

export const GET_BRANCH_BY_ID = gql`
  query GetBranchById($query: getBranchesById!) {
    getBranchesById(query: $query) {
      _id
      instituteId
      name
      pocName
      pocMobile
      streetAddress
      city
      state
      country
      pincode
    }
  }
`;


export const EDIT_BRANCH = gql`
  mutation EditBranch($branchId: String!, $branchData: BranchInput!) {
    editBranch(branchId: $branchId, branchData: $branchData) {
      _id
      instituteId
      name
      pocName
      pocMobile
    }
  }
`;
