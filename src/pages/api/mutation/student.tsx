import { gql } from "@apollo/client";

export const CREATE_STUDENT = gql`
  mutation CreateStudent($studentData: StudentInput!) {
    createStudent(studentData: $studentData) {
      _id
      instituteId
      firstName
    }
  }
`;

export const EDIT_STUDENT = gql`
  mutation EditStudent($studentId: String!, $studentData: StudentInput!) {
    editStudent(studentId: $studentId, studentData: $studentData) {
      instituteId
      firstName
    }
  }
`;

export const ADD_STUDENT_TO_BATCH = gql`
  mutation AddStudentToBatch($data: AddBatch!) {
    addStudentToBatch(data: $data) {
      message
      success
    }
  }
`;

export const REMOVE_STUDENT_FROM_BATCH = gql`
  mutation RemoveStudentFromBatch($data: AddBatch!) {
    removeStudentFromBatch(data: $data) {
      message
      success
    }
  }
`;

export const GET_STUDENTS_BY_BRANCH = gql`
  query GetStudentsByBranch($data: StudentsByBranch!) {
    getStudentsByBranchId(data: $data) {
      instituteId
      firstName
    }
  }
`;

export const GET_BATCH_BY_ID = gql`
  query GetBatchesByStudentID($studentId: String!){
    getBatchesByStudentID(studentId: $studentId){
      _id
      name
      type
      description
      startTime
      endTime
      days
    }
  }
`


export const GET_STUDENTS_BY_BATCH = gql`
  query GetStudentsByBatch($data: StudentsByBatch!) {
    getStudentsByBatch(data: $data) {
      _id
      firstName
      lastName
      contact1
    }
  }
`;

export const GET_STUDENTS_BY_ID = gql`
  query GetStudentsById($data: StudentsByID!) {
    getStudentsById(data: $data) {
      instituteId
      firstName
      lastName
      fatherName
      motherName
      school
      dob
      contact1
      contact2
      addressLine1
      addressLine2
      city
      state
      pincode
      country
      joinedOn
    }
  }
`;


export const GET_STUDENTS_BY_INSTITUTE_ID=gql`
query GetStudentsByInstituteId($instituteId: String!, $name: String!, $pagination: StudentPaginationInput!){
    getStudentsByInstituteId(instituteId: $instituteId, name: $name, pagination:$pagination){
        _id
        firstName,
        lastName,
        fatherName,
        motherName,
        contact1,
        contact2
    }
    
}
`