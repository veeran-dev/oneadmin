import { gql } from '@apollo/client';

export const SEND_INVITE = gql`
  mutation SendInvite($email: String!, $senderUserId: String!, $instituteId: String!) {
    sendInvite(email: $email, senderUserId: $senderUserId, instituteId: $instituteId){
        success,
        message
    }
  }
`;

export const GET_INVITATIONS = gql`
  query GetInvitationById($query: getInstituteId!) {
    getInvitationById(query: $query) {
        email
        createdAt
    }
  }
`;
