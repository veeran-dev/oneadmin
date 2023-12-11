import { useEffect } from "react"
import { useRouter } from "next/router";
import Stats from '@component/dashboard/stats'
import Guide from "@/components/dashboard/guide";
import Header from "@/components/common/header";

export default function dashboard(props:any) {

  const stats = [
    { name: 'Number of deploys', value: '405' },
    { name: 'Average deploy time', value: '3.65', unit: 'mins' },
    { name: 'Number of servers', value: '3' }
  ]

  const config ={
    options: true
  }
  
  
    return (
      <>
        <div className="px-8 py-4">
        <Header title={"Dashboard"} config={config}/>
        <div className="flex">
          <div className="flex-grow">
            <Stats stats={stats} />
          </div>
          <div className="flex-shrink">
            <Guide />
          </div>
        </div>
            
        </div>
      </>
    )
  }


//   <div className="flex flex-col bg-white rounded-lg shadow p-8 min-w-[320px]">
//   <div className="flex flex-col justify-center items-center border-b-[1px] border-gray-200 pb-4">
//     <BsShieldCheck className="w-[50px] h-[50px] text-green-500" />
//     <h1 className="font-bold mt-8 mb-2">Complete your setup</h1>
//     <p className="text-sm text-gray-500">
//       Complete all 3 steps to go online
//     </p>
//   </div>
//   <div className="mt-2">
//     <div className="flex flex-row items-center  rounded-md p-2 cursor-pointer">
//       {verifyCurrentStep(1)}
//       <span className={steps > 0 ? "text-green-500":""}>Buy your phone number</span>
//     </div>
//     <div className="flex flex-row items-center  rounded-md p-2 cursor-pointer">
//       {verifyCurrentStep(3)}
//       <span className={steps >= 3 ? "text-green-500":""}>Upload Restaurant | Menu Data</span>
//     </div>
//     <div className="flex flex-row items-center  rounded-md p-2 cursor-pointer">
//       {verifyCurrentStep(4)}
//       <span className={steps >= 4 ? "text-green-500":""}>Take your first order</span>
//     </div>
//   </div>
// </div>