import { useBatchAnalytics } from "@/hooks/commonDataHook";
import EmptyTable from "../common/emptyTable";
import Loader from "../common/loading";
import ReusableTable from "../reusableTable";
import Header from "../common/header";
import Link from "next/link";


export default function BatchAnalytics(){

    const { data, loading } = useBatchAnalytics()

    const headers = [
        { label: "Batch Name", key: "batchName" },
        { label: "Total Students", key: "studentsCount" },
        { label: "Present", key: "presentCount" },
        { label: "Absent", key: "absentCount" },
        { label: "Start Time", key: "startTime" },
    ];

    const configs ={
        options: false,
        tabs: false,
        link:{
          href: "/attendance/batch",
          title: "View All"
        }
    }

    return(
        <div className='mt-4 '>
            <div className="flex flex-row justify-between">
                <h2 className="text-sm font-semibold">{"Today's Batches"}</h2>
                <Link className="text-xs font-semibold text-gray-600" href={"/attendance/batch"}>View All</Link>
            </div>
            

            {data && data.length === 0 &&
                <EmptyTable headers={headers} title={"No Batch"} link={"/batch/new"}/>
            }
            {loading && 
              <Loader/>
            }
            {data && data.length !== 0 &&
                <ReusableTable headers={headers} rows={data} buttons={undefined} />
            }
        </div>
    )

}