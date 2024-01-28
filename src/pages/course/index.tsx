// import CourseList from "@/components/courseList";
import CourseList from "@/components/CourseList";
import Empty from "@/components/common/empty";
import Header from "@/components/common/header";
import { useGetCoursesByInstituteId } from "@/hooks/courseHook";
import { tabsData } from "utils/tabData";

export default function Course(){

    const { loading:getLoading, error:getError, courses } =  useGetCoursesByInstituteId()
    console.log("courses...",courses)
    const configs ={
        options: false,
        tabs: true,
        tabsData: tabsData,
        link:{
          href: "/course/new",
          title: "Add Course"
        }
    }



    return(
        <div className='px-8 py-4'>
            <Header title={"Course"} config={configs}/>
            {courses && courses.length === 0 &&
                <Empty title={"Course"} link={"/course/new"}/>
            }
            {courses && courses.length>0 &&
                <CourseList courses={courses} />
            }
            
        </div>
    )
}