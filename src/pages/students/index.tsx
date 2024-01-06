import Empty from "@/components/common/empty";
import EmptyTable from "@/components/common/emptyTable";
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";
import Search from "@/components/common/search";
import ReusableTable from "@/components/reusableTable";
import { useStudentAPI} from "@/hooks/studentHook";
import { useEffect, useState } from "react";
import { pagination as PageType } from '../../types/common'
import Pagination from "@/components/common/pagination";

export default function Student(){

    const configs ={
        options: false,
        link:{
          href: "/students/new",
          title: "Add Student"
        }
    }

    const headers = [
        { label: "Student Name", key: "fullName" },
        { label: "Father Name", key: "fatherName" },
        { label: "Mother Name", key: "motherName" },
        { label: "Primary Contact", key: "contact1" },
        { label: "Secondary Contact", key: "contact2" },
      ];
    
      const buttonsConfig = [
        { label: "Edit", link: "/students/" },
        { label: "View", link: "/students/view/" },
        { label: "Join Batch", link: "/batch/joinStudent/" },
      ];

    const defaultPagination:PageType = {
        limit: 10,
        offset: 0
    }
    const [studentName, setStudentName] = useState<string>("")
    const [pagination, setPagination] = useState<PageType>(defaultPagination)
    const [formattedStudent, setFormattedStudent] = useState()
    const {students, studentsLoading} = useStudentAPI(pagination, studentName)
    console.log("stiudent....",students)

    const performSearch = (term:string) =>{
        console.log("-------------------------Perform Search-------------------------")
        console.log(term)
        setStudentName(term)
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

    useEffect(()=>{
        if(students && students.length>0){
            const studentsWithFullName = students.map((student: { firstName: any; lastName: any; }) => ({
                ...student,
                fullName: `${student.firstName} ${student.lastName}`,
            }));
            
            console.log("studentsWithFullName", studentsWithFullName);
            setFormattedStudent(studentsWithFullName)
        }

    },[students])


    return(
        <div className='px-8 py-4'>
            <Header title={"Student"} config={configs}/>
            <Search performSearch={performSearch}/>
            {students && students.length === 0 &&
                <EmptyTable headers={headers} title={"No Student"} link={"/student/new"}/>
            }
            {studentsLoading &&
                <Loader />
            }
            {
                !studentsLoading && formattedStudent && students && students.length > 0 && 
                (
                    <ReusableTable headers={headers} rows={formattedStudent} buttons={buttonsConfig} />
                )
            }
            <Pagination previous={()=>paginate('previous')} next={()=>paginate('next')}/>
        </div>
    )
}