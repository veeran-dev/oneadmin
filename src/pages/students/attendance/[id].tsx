import EmptyTable from "@/components/common/emptyTable";
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";
import ReusableTable from "@/components/reusableTable";
import { useAttendance, useAttendanceAPI, useStudentWiseAttendance } from "@/hooks/attendanceHook";
import { Suspense, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker";
import Pagination from "@/components/common/pagination";
import { pagination } from '../../../types/common'
import moment from "moment";

const defaultPagination = {
    limit: 10,
    offset: 0
}

export default function Index() {

    const [batches, setBatches] = useState([])
    const [pagination, setPagination] = useState<pagination>(defaultPagination)
    const { attendances, loading } = useStudentWiseAttendance(pagination)

  const configs = {
    options: false,
    tabs: false,
  };

  const headers = [
    { label: "Batch Name", key: "batchName" },
    { label: "Presence", key: "status" },
    { label: "Date", key: "dateTime"}
  ];

  const buttonsConfig: { label: string; link: string }[] | undefined = [];

  useEffect(()=>{
    if(attendances && attendances.length>0){
        const studentsWithFullName = attendances.map((student: { dateTime: moment.MomentInput; }) => ({
            ...student,
            dateTime: moment(student.dateTime).format("lll")
        }));
        
        console.log("studentsWithFullName", studentsWithFullName);
        setBatches(studentsWithFullName)
    }
    else{
        setBatches([])
    }
  },[attendances])

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


  return (
    <div className="px-8 py-4">
      <Header title={"Student Attendance"} config={configs} />
      <Suspense fallback={"Loading...."}>

        {batches && batches.length === 0 && (
          <EmptyTable
            headers={headers}
            title={"Attendance"}
            link={"/attendance"}
          />
        )}
        {loading && <Loader />}
        {batches && batches.length > 0 && (
          <ReusableTable
            headers={headers}
            rows={batches}
            buttons={buttonsConfig}
          />
        )}
        <Pagination previous={()=>paginate('previous')} next={()=>paginate('next')}/>
      </Suspense>
    </div>
  );
}
