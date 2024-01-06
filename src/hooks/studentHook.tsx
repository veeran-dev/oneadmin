import { CREATE_STUDENT, EDIT_STUDENT, ADD_STUDENT_TO_BATCH, GET_STUDENTS_BY_INSTITUTE_ID, REMOVE_STUDENT_FROM_BATCH, GET_STUDENTS_BY_BATCH, GET_STUDENTS_BY_ID, GET_STUDENTS_BY_BRANCH, GET_BATCH_BY_ID } from "@/pages/api/mutation/student";
import { getUserData } from "@/utils/userStorage";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { pagination } from "@/types/common";

export const useStudentAPI = (pagination?:pagination, name?:string) => {
    const router = useRouter()
    const user:any = getUserData()
    const { id } = router.query

    const [createStudent, {loading:createLoading, error:createError}] = useMutation(CREATE_STUDENT);
    const [editStudent, {loading:editLoading, error:editError}] = useMutation(EDIT_STUDENT);
    
    const [removeStudentFromBatch, {loading:removeLoading, error:removeError}] = useMutation(REMOVE_STUDENT_FROM_BATCH);
    const { data: studentsByBranchData, loading: studentsByBranchLoading } = useQuery(GET_STUDENTS_BY_BRANCH);
    const { data: studentsByBatch, loading: studentsByBatchLoading } = useQuery(GET_STUDENTS_BY_BATCH,{
        variables:{
            data:{
                batchId: id,
                name:"",
                batchName: ""
            }
        }
    });
    
    const { data: students, loading:studentsLoading} = useQuery(GET_STUDENTS_BY_INSTITUTE_ID, {
        variables: {
            instituteId: user?.instituteId,
            name: name,
            pagination:pagination
        }
    })


    const { data: studentsById, loading: studentLoading } = useQuery(GET_STUDENTS_BY_ID, {
        variables: {
            data:{
                studentId: id
            }
        },
    });
  
    return {
      createStudent,
      editStudent,
      removeStudentFromBatch,
      studentsByBranchData,
      studentsByBranchLoading,
      studentsByBatchData: studentsByBatch?.getStudentsByBatch,
      studentsByBatchLoading,
      student: studentsById?.getStudentsById,
      students: students?.getStudentsByInstituteId,
      studentsLoading,
      studentLoading,
    };
  };

export const useStudentDetails = () => {

    const router = useRouter()
    const { id } = router.query

    const { data ,loading, error } = useQuery(GET_BATCH_BY_ID,{
        variables:{
            studentId: id
        }
    });
    
    return{
        batches: data?.getBatchesByStudentID,
        loading,
        error
    }
}

export const useStudentToJoin =()=>{
    const [addStudentToBatch, {loading:addLoading, error:addError}] = useMutation(ADD_STUDENT_TO_BATCH);
    return{
        addStudentToBatch,
        addLoading,
        addError
    }
}