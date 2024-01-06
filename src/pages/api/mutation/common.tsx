import { gql } from "@apollo/client";


export const GET_STEPS_BY_INSTITUTE_ID = gql`
  query GetStepsByInstituteId($instituteId: String!) {
    getStepsByInstituteId(instituteId: $instituteId) {
      steps
    }
  }
`;


export const GET_BATCHES_ANALYTICS_BY_INSTITUTE = gql`
  query getBatchAnalytics($instituteId: String!) {
    getBatchAnalytics(instituteId: $instituteId) {
        batchId,
        batchName,
        presentCount,
        absentCount,
        studentsCount,
        startTime
    }
  }
`