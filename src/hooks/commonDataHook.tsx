import { GET_BATCHES_ANALYTICS_BY_INSTITUTE, GET_STEPS_BY_INSTITUTE_ID } from "@/pages/api/mutation/common"
// import { getUserData } from "@/utils/userStorage" // Uncommented import statement
import { useQuery } from "@apollo/client"
import { useUser } from "context/UserContext"
import { useRouter } from "next/router"
import { useEffect } from "react"


const useCommonData=()=>{

    const {user} = useUser()
    console.log("instituteId.....",user?.instituteId)
    const {
        data, loading, error
    } = useQuery(GET_STEPS_BY_INSTITUTE_ID,{
        variables:{
            instituteId: user?.instituteId,
        }
    })

    return { data:data?.getStepsByInstituteId, loading, error}
}

const useBatchAnalytics =()=>{
    const router = useRouter()
    const {user} = useUser()
    // const userData = getUserData() // Uncommented line
    const {
        data, loading, error,refetch
    } = useQuery(GET_BATCHES_ANALYTICS_BY_INSTITUTE,{
        variables:{
            instituteId: user?.instituteId,
        }
    })
    const batchAnalytics = data?.getBatchAnalytics || []
    useEffect(()=>{
        refetch()
    },[router.pathname])
    return { data:batchAnalytics, loading, error} 
}

export {useCommonData, useBatchAnalytics}