import Header from "@/components/common/header";
import { useBatchesById } from "@/hooks/batchHook";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState, } from "react";

import { useGetCoursesByInstituteId } from "@/hooks/courseHook";
import { useBranchesByInstituteId } from "@/hooks/branchHook";
import { useUsers } from "@/hooks/getUserHook";
import BatchForm from "@/components/batch/BatchForm";
import { useUser } from "@/context/UserContext";
import Loader from "@/components/common/loading";

export default function Batch(){

    const configs ={
        options: false,
        link:undefined
    }
    const router = useRouter()
    const { id } =router.query
    const title = id === "new"? "Create Batch":"Edit Batch";
    const {user} = useUser()
    const { batch, loading:batchLoading } =  useBatchesById();
    const { courses, loading:courseLoading } =  useGetCoursesByInstituteId()
    const { branches, loading:branchLoading } =  useBranchesByInstituteId()
    const { users, loading:staffLoading } =  useUsers()

    return(
        <div className='px-8 py-4'>
            <Header title={title} config={configs}/>
            <Suspense fallback={<div>Loading...</div>}>  
                {((user && user._id === '') || batchLoading || courseLoading || branchLoading || staffLoading) &&
                    <Loader />
                }
                {user && user._id !== '' && !batchLoading && !courseLoading && !branchLoading && !staffLoading && (
                    <BatchForm courses={courses} batch={batch} staffs={users} branches={branches} />
                )}
            </Suspense>
        </div>
    )
}