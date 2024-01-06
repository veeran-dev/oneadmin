import { gql } from '@apollo/client';

export const ADD_ATTENDANCE = gql`
  mutation markAttendance($attendanceData: AttendanceInput!) {
    markAttendance(attendanceData: $attendanceData) {
      _id
    }
  }
`;

export const TOGGLE_ATTENDANCE = gql`
  mutation toggleAttendance($attendanceId: String!) {
    toggleAttendance(attendanceId: $attendanceId) {
      _id
    }
  }
`;

export const GET_ATTENDANCE = gql`
  query getAttendance($instituteId:String!, $batchId: String!, $date: String!){
    getAttendance(instituteId:$instituteId, batchId:$batchId, date:$date){
      _id
      instituteId
      branchId
      batchId
      studentId
      dateTime
      fullName
      status
    }
  }
`

export const GET_ATTENDANCE_BY_SID = gql`
  query GetAttendanceWithSid($studentId: String!, $pagination:AttendancePaginationInput!){
    getAttendanceWithSid(studentId:$studentId, pagination:$pagination){
      dateTime
      batchName
      status
    }
  }
`

