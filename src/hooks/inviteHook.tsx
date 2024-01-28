// src/hooks/useInvitations.js
import { useMutation, useQuery } from '@apollo/client';
import { SEND_INVITE, GET_INVITATIONS } from '@api/invitation';
import { useUser } from '@/context/UserContext';

const useInvitations = () => {
  const [sendInviteMutation] = useMutation(SEND_INVITE);
  const {user} = useUser();
  console.log("user in useInvitations...",user)
  const sendInvite = async (email: string) => {
    try {
      const instituteId = user?.instituteId;
      const senderUserId = user?._id
      await sendInviteMutation({
        variables: { email, senderUserId, instituteId},
      });
      return true
    } catch (error) {
      console.error('Error sending invite:', error);
      // Handle error as needed
    }
  };

  const useGetInvitations = () => {
    const instituteId = user?.instituteId;
    const { loading, error, data } = useQuery(GET_INVITATIONS, {
      variables: { query:{
        instituteId
      } },
    });

    return {
      loading,
      error,
      invitations: data ? data.getInvitationById : null,
    };
  };

  return { sendInvite, useGetInvitations };
};

export default useInvitations;
