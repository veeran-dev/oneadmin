// graphqlHooks.js
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER, GET_USERS_WITH_FILTERS } from '../pages/api/mutation/user';
import { getUserData } from '@/utils/userStorage';



const useUsers = () => {
  // const instituteId = useUser()?.user?.instituteId;
  const user:any = getUserData()
  const { loading, error, data } = useQuery(GET_USERS_WITH_FILTERS,
     { variables: {
          data:{
            instituteId: user?.instituteId,
            staffName:"",
            batchName:""
          }
     } 
    });

  if (error) {
    console.error('Error fetching users:', error);
  }

  return {
    loading,
    error,
    users: data ? data.getUsersWithFilters : null,
  };
};


const useAddUser =() =>{

  const [CreateStaff,{ loading, error, data }] = useMutation(ADD_USER);

  const createStaffs = async (
    createStaff: any,
    onComplete?: (data:any) => void,
    onError?: (error:any) => void
  ) => {
    try {
        const response = await CreateStaff({
            variables: { createStaff },
        });

        if (onComplete && response.data) {
            onComplete(response.data.createUser);
        }


    } catch (error:any) {
      console.log("error is addUser ......",error)
      if (onError) {
        onError(error);
      }
    }
  };

  return { createStaffs, loading, error, data };

}

export { useAddUser, useUsers };
