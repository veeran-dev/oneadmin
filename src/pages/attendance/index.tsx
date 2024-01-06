// import BatchList from "@/components/batchList";
import Empty from "@/components/common/empty";
import EmptyTable from "@/components/common/emptyTable";
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";

import Search from "@/components/common/search";
import ReusableTable from "@/components/reusableTable";
import { useUser } from "@/context/UserContext";
import { useBatchesByInstituteId } from "@/hooks/batchHook";
import { useEffect, useState } from "react";
import { pagination } from '../../types/common'
import Pagination from "@/components/common/pagination";

const defaultPagination = {
  limit: 10,
  offset: 0
}

export default function Batch(){
    const [pagination, setPagination] = useState<pagination>(defaultPagination)
    const [status, setStatus ] = useState('idle');
    const {user} = useUser()
    const [batchName, setBatchName] =useState("")
    const [attendance, setAttendance] = useState([])
    const { batchLoading, error:getError, batches } =  useBatchesByInstituteId(pagination,batchName)
    const configs ={
        options: false,
        tabs: false,
    }

    const headers = [
        { label: "Batch Name", key: "name" },
        { label: "Course", key: "courseName" },
        { label: "Branch", key: "branchName" },
        { label: "Staff", key: "staffName" },
        { label: "Type", key: "type" },
        { label: "Start Time", key: "startTime" },
        // { label: "Days", key: "days" },
      ];
    
      const buttonsConfig = [
        { label: "Start", link: "/attendance/" },
        { label: "View", link: "/attendance/view/" },
      ];

      useEffect(()=>{
        console.log(user)
        if(user && user?._id){
            setStatus('ready')
        }
      },[user, batches])

      useEffect(()=>{
        if(batches && batches.length > 0){
          const newArray = batches.map((obj: { days: any[]; }) => ({
            ...obj,
            days: obj.days.map(day => day.slice(0, 3)).join(', '),
          }));
          
          setAttendance(newArray)
        }
      },[batches])

      const performSearch = (term:string) =>{
        console.log("-------------------------Perform attendance Search-------------------------")
        console.log(term)
        setBatchName(term)
      }

      const paginate = (x:string)=>{
        console.log("paginate.....",x)
        const off = Number(pagination.offset);
        const lim = Number(pagination.limit);
        if(x == 'previous'){
            if(off == defaultPagination.offset){
                return
            }
            setPagination({
                offset: off - lim,
                limit: lim
            })
        }
        else{
            setPagination({
                offset: off + lim,
                limit: lim
            })
        }
        console.log("pagination.....",pagination)
      }

    
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",batches)
    return(
        <div className='px-8 py-4'>
            <Header title={"Attendance"} config={configs}/>
            <Search performSearch={performSearch}/>
            {batches && batches.length === 0 &&
                <EmptyTable headers={headers} title={"No Batch"} link={"/batch/new"}/>
            }
            {batchLoading && 
              <Loader/>
            }
            {batches.length !== 0 &&
                <ReusableTable headers={headers} rows={attendance} buttons={buttonsConfig} />
            }
            <Pagination previous={()=>paginate('previous')} next={()=>paginate('next')}/>
            
        </div>
    )
}