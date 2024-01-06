import Header from "@/components/common/header";
import PaymentForm from "@/components/payments/paymentForm";
import { useAttendanceAPI } from "@/hooks/attendanceHook";
import { useGetBatchByCourse } from "@/hooks/batchHook";
import { useGetCoursesByInstituteId } from "@/hooks/courseHook";
import React from "react";
import { Suspense, useState } from "react";
const MemoizedPaymentForm = React.memo(PaymentForm);

export default function Index(){

    const configs ={
        options: false,
        link:undefined
    }
    const title = "Add Payment";
    const [courseId, setCourseId] = useState("")
    const { data:batches, loading:batchLoading } = useGetBatchByCourse(courseId, "")
    const { courses, loading:courseLoading } =  useGetCoursesByInstituteId()
    const { studentsByBatchData } = useAttendanceAPI();
    
    return(
        <div className='px-8 py-4'>
            <Header title={title} config={configs}/>
            <Suspense fallback={<div>Loading...</div>}>
                {!batchLoading && !courseLoading &&
                    <MemoizedPaymentForm 
                        batches={batches} 
                        courses={courses} 
                        students={studentsByBatchData}
                        setCourseId={setCourseId} 
                    />
                }
            </Suspense>
        </div>
    )
}