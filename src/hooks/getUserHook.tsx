// graphqlHooks.js
import { useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../pages/api/mutation/user';
import { useUser } from '@context/UserContext';
import { useRouter } from 'next/router';

const useUserData = () => {
  const { updateUser } = useUser();
  const router = useRouter();
  const invalidUser = 'User is not available';

  const { loading, error, data } = useQuery(GET_USER_BY_EMAIL, {
    onCompleted: (data) => {
      console.log("get user data is ...", data);
      if (data && data.getUserByEmail) {
        updateUser(data.getUserByEmail);
      }
    },
    onError: (error) => {
      console.log("get user error is ...", error);
      if (error?.message === invalidUser) {
        router.push('/settings/new?force=true');
      } else if (error) {
        router.push('/auth/login');
      }
    }
  });

  return { loading, error, data };
};

export { useUserData };
