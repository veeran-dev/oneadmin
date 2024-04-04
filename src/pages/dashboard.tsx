// import { useEffect } from "react"
// import { useRouter } from "next/router";
// import Stats from '@component/dashboard/stats'
import Guide from "@/components/dashboard/guide";
import Header, { HeaderProps } from "@/components/common/header";
import BatchAnalytics from "@/components/batch/batchAnalytics";
import RecentTransaction from "@/components/dashboard/recentTransactions";

export default function dashboard(props:any) {


  const headerProps:HeaderProps={
    title:"Dashboard",
    config:{
    }
  }
  
  
    return (
      <>
        <div className="px-8 py-4">
        <Header {...headerProps}/>
          <div className="flex">
            <div className="flex-grow">
              {/* <Stats stats={stats} /> */}
              <div className="mr-8">
                <BatchAnalytics/>
              </div>
              <div className="mr-8">
                  <RecentTransaction/>
              </div>
              
            </div>
            <div className="flex-shrink">
              <Guide />
            </div>
          </div>
        </div>
      </>
    )
  }