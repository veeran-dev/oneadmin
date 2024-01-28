import BranchList from "@/components/branchList";
import Empty from "@/components/common/empty";
import Header from "@/components/common/header";
import { useBranchesByInstituteId } from "@/hooks/branchHook";
import { tabsData } from "utils/tabData";

export default function Branch(){

    const { loading:getLoading, error:getError, branches } =  useBranchesByInstituteId()

    const configs ={
        options: false,
        tabs: true,
        tabsData: tabsData,
        link:{
          href: "/branch/new",
          title: "Add Branch"
        }
    }



    return(
        <div className='px-8 py-4'>
            <Header title={"Branch"} config={configs}/>
            {branches && branches.length === 0 &&
                <Empty title={"Branch"} link={"/branch/new"}/>
            }
            <BranchList branches={branches} />
            
        </div>
    )
}