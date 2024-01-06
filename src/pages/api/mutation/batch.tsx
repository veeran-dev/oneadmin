import { gql } from '@apollo/client';

export const CREATE_BATCH = gql`
  mutation CreateBatch($batchData: BatchInput!) {
    createBatch(batchData: $batchData) {
      _id
      name
    }
  }
`;

export const EDIT_BATCH = gql`
  mutation EditBatch($batchId: String!, $batchData: BatchInput!) {
    editBatch(batchId: $batchId, batchData: $batchData) {
      _id
      name
    }
  }
`;



export const GET_BATCHES_BY_INSTITUTE_AND_NAME = gql`
  query GetBatchesByInstituteAndBatchName($query:GetBatchByID!, $pagination: PaginationInput!) {
    getBatchesByInstituteAndBatchName(query: $query, pagination:$pagination) {
        _id
        name
        branchId
        courseId
        type
        staffIds
        courseName
        branchName
        staffName
        startTime
        days
    }
  }
`;


export const GET_BATCH_BY_ID = gql`
  query GetBatchById($query: BatchId!) {
    getBatchByID(query: $query) {
      _id
      name
      branchId
      courseId
      type
      staffIds
      description
      startTime
      endTime
      days
    }
  }
`;



export const GET_BATCHES_BY_INSTITUTE_AND_PARTIAL_NAME = gql`
  query GetBatchesByInstituteAndPartialName($instituteId: ID!, $name: String!) {
    getBatchesByInstituteAndBatchName(query: { instituteId: $instituteId, name: $name }) {
      name
    }
  }
`;



export const GET_BATCHES_BY_BRANCH_AND_PARTIAL_NAME = gql`
  query GetBatchesByBranchAndPartialName($branchId: ID!, $name: String!) {
    getBatchesByBranchAndBatchName(query: { branchId: $branchId, name: $name }) {
      name
    }
  }
`;



export const GET_BATCHES_BY_COURSE_ID_AND_PARTIAL_NAME = gql`
  query GetBatchesByCourseIdAndPartialName($courseId:String!, $name: String!) {
    getBatchesByCourseId(query: { courseId:$courseId, name:$name }) {
      _id
      name
    }
  }
`;


