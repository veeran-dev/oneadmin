import { GET_BATCHES_ANALYTICS_BY_INSTITUTE, GET_STEPS_BY_INSTITUTE_ID } from "@/pages/api/mutation/common"
import { getUserData } from "@/utils/userStorage"
import { useQuery } from "@apollo/client"


const useCommonData=()=>{

    const userData = getUserData()

    const {
        data, loading, error
    } = useQuery(GET_STEPS_BY_INSTITUTE_ID,{
        variables:{
            instituteId: userData?.instituteId,
        }
    })

    return { data:data?.getStepsByInstituteId, loading, error}
}

const useBatchAnalytics =()=>{
    const userData = getUserData()
    const {
        data, loading, error
    } = useQuery(GET_BATCHES_ANALYTICS_BY_INSTITUTE,{
        variables:{
            instituteId: userData?.instituteId,
        }
    })

    return { data:data?.getBatchAnalytics, loading, error} 
}

export {useCommonData, useBatchAnalytics}