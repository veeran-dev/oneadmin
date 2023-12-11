// graphqlHooks.js
import { useUser } from '@/context/UserContext';
import { CREATE_BRANCH, EDIT_BRANCH, GET_BRANCH_BY_ID, GET_BRANCHES_BY_INSTITUTE_ID } from '@/pages/api/mutation/branch';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';


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
    const {user} = useUser()
    console.log("instituteId....",user?.instituteId)
    const { loading, error, data } = useQuery(GET_BRANCHES_BY_INSTITUTE_ID, {
    variables: {
        query: {
        instituteId: user?.instituteId,
        },
    },
    });
    console.log(data)
    return { loading, error, branches: data?.getBranchesByInstituteId || [] };
};

const useBranchesById = () => {
    const router = useRouter()
    const { id } =router.query
    console.log("GET_BRANCH_BY_ID....",id)
    
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
    console.log(data)
    return { loading, error, branch: data?.getBranchesById || [] };
};


const useEditBranch = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log("branch id is....", id)
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
