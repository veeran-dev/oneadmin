import { gql } from "@apollo/client";

export const GET_PAYMENT_LIST = gql`
  query GetPayments($instituteId: String!, $studentName: String!, $pagination: PaymentPaginationInput!) {
    getPayments(instituteId: $instituteId, studentName:$studentName, pagination:$pagination) {
     _id,
     studentName,
     batchName,
     studentId,
     batchId,
     amount,
     paymentStatus,
     paymentType,
     paymentDate,
     formattedPaymentDate,
     formattedPaidTo
    }
  }
`;


export const ADD_PAYMENT = gql`
  mutation AddPayment($paymentInput:PaymentInput!){
    addPayment(paymentInput:$paymentInput){
        _id
    }
  }
`


export const GET_PAYMENT_LIST_BY_SID = gql`
query GetPaymentsWithSid($studentId: String!, $pagination: PaymentPaginationInput!){
  getPaymentsWithSid(studentId:$studentId, pagination:$pagination){
    _id,
    studentName,
    batchName,
    studentId,
    batchId,
    amount,
    paymentStatus,
    paymentType,
    paymentDate,
    formattedPaymentDate,
    formattedPaidTo, 
  }
}`


export const GET_PAYMENT_LIST_BY_BATCH_ID =  gql`
query GetBatchWiseAnalytics($batchId: String!, $date:String!){
  getBatchWiseAnalytics(batchId:$batchId, date:$date){
    studentId,
    studentName,
    isPaid
    paymentDate
  }
}`