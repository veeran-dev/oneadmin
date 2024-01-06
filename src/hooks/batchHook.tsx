// graphqlHooks.js
import { useUser } from '@/context/UserContext';
import { CREATE_BATCH, EDIT_BATCH, GET_BATCH_BY_ID, GET_BATCHES_BY_COURSE_ID_AND_PARTIAL_NAME, GET_BATCHES_BY_INSTITUTE_AND_NAME } from '@/pages/api/mutation/batch';
import { pagination } from '@/types/common';
import { getUserData } from '@/utils/userStorage';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { off } from 'process';


const useCreateBatch = () => {
  const [createBatchMutation, { data, loading, error }] = useMutation(CREATE_BATCH);

  const createBatch = async (batchData: any) => {
    try {
      const response = await createBatchMutation({
        variables: { batchData },
      });

      return response.data.createBatch;
    } catch (error:any) {
      console.error('Error creating batch:', error.message);
      throw error;
    }
  };

  return { createBatch, data, loading, error };
};

const useBatchesByInstituteId = (pagination:pagination, batchName:string="") => {
    // const {user} = useUser()
    const { limit, offset} = pagination
    const user:any = getUserData();
    const { loading, error, data } = useQuery(GET_BATCHES_BY_INSTITUTE_AND_NAME, {
        variables: {
            query: {
                instituteId: user?.instituteId,
                name:batchName,
            },
            pagination:{
                limit: limit,
                offset: offset
            }
        },
    });
    return { batchLoading:loading, error, batches: data?.getBatchesByInstituteAndBatchName || [] };
};

const useBatchesById = () => {
    const router = useRouter()
    const { id } = router.query
    
    const { loading, error, data } = useQuery(GET_BATCH_BY_ID, {
    variables: {
        query: {
            batchId: id,
        },
    },
    });
    if (id === "new" || !id) {
        return { loading: false, error: [], batch: [] };
    }
    return { loading, error, batch: data?.getBatchByID || [] };
};


const useEditBatch = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const [editBatchMutation, {data:editData, loading:editLoading, error:editError}] = useMutation(EDIT_BATCH);
    const editBatch = async(batchData:any)=>{
        try {
            const response = await editBatchMutation({
              variables: { batchId:id, batchData },
            });
      
            return response.data.editBatch;
        } catch (error:any) {
            console.error('Error creating batch:', error.message);
            throw error;
        }
    }
    return {editBatch, editData, editLoading, editError}
    
  };


const useGetBatchByCourse = (courseId:string, name:string) =>{
  const { data, loading, error } = useQuery(GET_BATCHES_BY_COURSE_ID_AND_PARTIAL_NAME,{
    variables:{
          courseId: courseId,
          name:name
    }
  })

  return{
    data: data?.getBatchesByCourseId,
    loading,
    error
  }
}

export { useCreateBatch, useBatchesByInstituteId, useBatchesById, useEditBatch, useGetBatchByCourse };
