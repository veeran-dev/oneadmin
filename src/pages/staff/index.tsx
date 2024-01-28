// import StaffList from "@/components/staffList";
import Empty from "@/components/common/empty";
import Header from "@/components/common/header";
import ReusableTable from "@/components/reusableTable";
import { useUsers } from "@/hooks/getUserHook";
import { tabsData } from "utils/tabData";
// import { useStaffesByInstituteId } from "@/hooks/staffHook";

export default function Staff(){

    const { loading, error, users:staffs } =  useUsers()
    console.log("staffs.........",staffs)

    const configs ={
        options: false,
        tabs: true,
        tabsData: tabsData,
        link:{
          href: "/staff/invite",
          title: "Invite Staff"
        }
    }

    const headers =[
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Role", key: "role" },
        
    ]



    return(
        <div className='px-8 py-4'>
            <Header title={"Staff"} config={configs}/>
            {staffs && staffs.length === 0 &&
                <Empty title={"Staff"} link={"/staff/invite"}/>
            }
            {staffs && staffs.length>0 &&
                <ReusableTable  headers={headers} rows={staffs} buttons={[]} />
            }
            
        </div>
    )
}