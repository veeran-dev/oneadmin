
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";
import ReusableTable from "@/components/reusableTable";
import { usePaymentByBatch } from "@/hooks/paymentHook";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker"
import Link from "next/link";
import Empty from "@/components/common/empty";
import ComboBox from "@/components/common/comboBox";
import { useBatchesByInstituteId } from "@/hooks/batchHook";
import Stats from "@/components/dashboard/stats";


const defaultPagination={
    limit: 0,
    offset: 0
}


export default function Index(){
    const [batchId, setBatchId] = useState("")
    const [stats, setStats] = useState<any>()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { batchLoading, batches } =  useBatchesByInstituteId(defaultPagination, "")
    const {data} = usePaymentByBatch(batchId, selectedDate)
    
    const configs ={
        options: false,
        tabs: false,
    }

    const headers = [
        { label: "Student Name", key: "studentName" },
        { label: "Paid", key: "isPaid" },
        { label: "Paid On", key: "paymentDate" },
    ];

    useEffect(()=>{
        if(data){
            const statsData = [
                { name: 'Number of Students', value: data.length },
                { name: 'Total Paid', value: data.filter((i: { isPaid: string; })=>i.isPaid==='Paid').length},
                { name: 'Total Pending', value: data.filter((i: { isPaid: string; })=>i.isPaid==='Pending').length}
            ]
            setStats(statsData)
        }
        
    },[data])


    console.log("batchId...............",batchId)
    console.log("data.................",data)
    return(
        <div className='px-8 py-4'>
            <Header title={"Fees History"} config={configs}/>
            <div className="flex flex-row items-baseline">
                <div className="mr-2">
                    <ComboBox placeholder={"Select Batch"} data={batches} onSelect={setBatchId} />
                </div>
                <div>
                <Datepicker
                    placeholderText="Select Month"
                    selected={selectedDate}
                    onChange={(date) => {
                        if (date !== null) {
                          setSelectedDate(date);
                        }
                      }}
                    showMonthYearPicker
                    dateFormat="MMMM yyyy"
                />
                </div>
                <div className="ml-auto">
                <Link href="/payments">
                    <span className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Student Wise</span>
                </Link>
                </div>
            </div>
            
            {data && data.length === 0 &&
                <Empty title={"Select Batch"} link={"/payments/new"}/>
            }
            {batchLoading && 
              <Loader/>
            }
            {data && data.length !== 0 &&
                <>
                    <div className="mt-6">
                        <Stats stats={stats} />
                    </div>
                    
                    <ReusableTable headers={headers} rows={data} />
                </>
            }
            
        </div>
    )
}