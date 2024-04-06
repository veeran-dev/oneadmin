// graphqlHooks.js
import { useUser } from '@/context/UserContext';
import { CREATE_BRANCH, EDIT_BRANCH, GET_BRANCH_BY_ID, GET_BRANCHES_BY_INSTITUTE_ID } from '@/pages/api/mutation/branch';
import { getUserData } from '@/utils/userStorage';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const useCreateBranch = () => {
  const [createBranchMutation, { data, loading, error }] = useMutation(CREATE_BRANCH);

  const createBranch = async (branchData: any) => {
    try {
      const response = await createBranchMutation({
        variables: { branchData },
      });

      return response.data.createBranch;
    } catch (error:any) {
      console.error('Error creating branch:', error.message);
      throw error;
    }
  };

  return { createBranch, data, loading, error };
};

const useBranchesByInstituteId = () => {
  const router = useRouter()
  const userData = getUserData()
  const { loading, error, data,refetch } = useQuery(GET_BRANCHES_BY_INSTITUTE_ID, {
      variables: {
          query: {
              instituteId: userData?.instituteId,
          },
      },
  });
  useEffect(() => {
    refetch();
  },[router.pathname])

  return { loading, error, branches: data?.getBranchesByInstituteId || [] };
};


const useBranchesById = () => {
    const router = useRouter()
    const { id } =router.query
    
    const { loading, error, data } = useQuery(GET_BRANCH_BY_ID, {
    variables: {
        query: {
            branchId: id,
        },
    },
    });
    if (id === "new" || !id) {
        return { loading: false, error: [], branch: [] };
    }
    return { loading, error, branch: data?.getBranchesById || [] };
};


const useEditBranch = () => {
    const router = useRouter();
    const { id } = router.query;
    const [editBranchMutation, {data:editData, loading:editLoading, error:editError}] = useMutation(EDIT_BRANCH);
    const editBranch = async(branchData:any)=>{
        try {
            const response = await editBranchMutation({
              variables: { branchId:id, branchData },
            });
      
            return response.data.editBranch;
        } catch (error:any) {
            console.error('Error creating branch:', error.message);
            throw error;
        }
    }
    return {editBranch, editData, editLoading, editError}
    
  };

export { useCreateBranch, useBranchesByInstituteId, useBranchesById, useEditBranch };
