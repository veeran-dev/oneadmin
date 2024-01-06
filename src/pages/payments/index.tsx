import Empty from "@/components/common/empty";
import EmptyTable from "@/components/common/emptyTable";
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";
import Search from "@/components/common/search";
import ReusableTable from "@/components/reusableTable";
import { usePayment } from "@/hooks/paymentHook";
import { useState } from "react";
import Pagination from "@/components/common/pagination";
import { pagination } from '../../types/common'
import Link from "next/link";
const defaultPagination = {
  limit: 10,
  offset: 0
}


export default function Index(){
    const [name, setName] =useState("")
    const [pagination, setPagination] = useState<pagination>(defaultPagination)
    const { loading:getLoading, error:getError, data:history } =  usePayment(pagination, name)

    const configs ={
        options: false,
        tabs: false,
    }

    const headers = [
        { label: "Student Name", key: "studentName" },
        { label: "Batch Name", key: "batchName" },
        { label: "Amount", key: "amount" },
        { label: "Status", key: "paymentStatus" },
        { label: "Mode", key: "paymentType" },
        { label: "Paid To", key: "formattedPaidTo" },
        { label: "Paid On", key: "formattedPaymentDate" },
    ];


    const performSearch = (term:string) =>{
      console.log("-------------------------Perform attendance Search-------------------------")
      console.log(term)
      setName(term)
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

    return(
        <div className='px-8 py-4'>
            <Header title={"Fees History"} config={configs}/>
            <div className="flex flex-row justify-between items-baseline">
                <Search performSearch={performSearch} placeholder={"Search Names, Contacts"}/>
                <Link href="/payments/batch">
                    <span className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Batch Wise</span>
                </Link>
            </div>
            {history && history.length === 0 &&
                <EmptyTable headers={headers} title={"No Payment"} link={"/payments/new"}/>
            }
            {getLoading && 
              <Loader/>
            }
            {history && history.length !== 0 &&
                <ReusableTable headers={headers} rows={history} />
            }
            <Pagination previous={()=>paginate('previous')} next={()=>paginate('next')}/>
            
        </div>
    )
}