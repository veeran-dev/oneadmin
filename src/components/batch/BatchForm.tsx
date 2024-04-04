import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import TimePicker from "@/components/common/timepicker";
import SuccessAnimation from "@/components/common/SuccessAnimation";

import { useUser } from "@/context/UserContext";
import { useCreateBatch, useEditBatch } from '@/hooks/batchHook';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

export default function BatchForm({batch, courses, branches, staffs}:any){
    const router = useRouter()
    const { id } =router.query
    const days = ['Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [isShowing, setIsShowing] = useState(false)
    
    const { createBatch} = useCreateBatch();
    const { editBatch} = useEditBatch()

    const {user} = useUser();
    
    const validationSchema = yup.object().shape({
        name: yup.string().required('Batch Name is required'),
        courseId: yup.string().required('Please select course'),
        branchId: yup.string().required('Please select Branch'),
        staffIds: yup.string().required('Type is required'),
        description: yup.string().required('Description is required'),
        type: yup.string().required('Type is required'),
        startTime: yup.string().required('Start Time is required'),
        endTime: yup.string().required('End Time is required'),
        days: yup.array().min(1, 'At least one day is required'),
    });

    const { handleSubmit, register, setError, setValue, control, formState:{errors} } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
        // defaultValues: {
        //     endTime: "08:00:am",
        //     startTime: "08:00:am",
        // },
    });

    useEffect(()=>{
        if(batch){
            const sid = batch && batch.staffIds ? batch.staffIds[0]:''
            setValue("name", batch.name)
            setValue("courseId", batch.courseId)
            setValue("branchId", batch.branchId)
            setValue("staffIds", sid)
            setValue("description", batch.description)
            setValue("type", batch.type)
            setValue("startTime", batch.startTime)
            setValue("endTime", batch.endTime)
            setValue("days", batch.days)
        }
    },[batch])

    useEffect(()=>{
        setTimeout(()=>{
            setIsShowing(true)
        },3000)
    },[])


    const handleCreateBatch = useCallback( async (formData: any) => {
        try {
            formData['instituteId'] = user?.instituteId
            
            if(id === "new"){
                const createdBatch = await createBatch(formData);

                if(createdBatch){
                    setSuccessMessage("Batch is created successfully")
                    setTimeout(()=>{
                    router.push('/batch')
                    },2000)
                }
            }
            else{
                const editedBatch = await editBatch(formData)
                
                if(editedBatch){
                    setSuccessMessage("Batch is edited successfully")
                    setTimeout(()=>{
                    router.push('/batch')
                    },2000)
                }
            }
            
            // if(createBatch)
        } catch (error:any) {
            console.error('Error creating batch:', error.message);
        }
    },  [createBatch, editBatch, router, id]);

    const handleError = (errors: any) => {
        console.log("errors....",errors)
    };

    
    if(successMessage !== ""){
        return <div className='h-[calc(100vh-64px)]'>
            <SuccessAnimation message={successMessage}/>
        </div> 
    }

    return(
        <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
            <form key="batchForm" onSubmit={handleSubmit(handleCreateBatch, handleError)}   className="">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Batch Information</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Batch Name<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                    {...register("name")} 
                                    type="text"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <small className="text-red-700">
                                    {errors?.name && errors.name.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 ">
                                <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">
                                    Courses<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                    id="courseId"
                                    autoComplete="courseId"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("courseId")} 
                                    >
                                        <option key="" value="">Select Course</option>
                                        {courses && courses.map((item:any)=><option key={item._id} value={item._id} selected={item._id === batch.courseId}>{item.name}</option>)}
                                    </select>
                                </div>
                                <div className='flex justify-between'>
                                    <small className="text-red-700">
                                        {errors?.courseId && errors.courseId.message}
                                    </small>
                                    <small className="text-blue-700 cursor-pointer">
                                        <Link href="/course/new">Create New</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 ">
                                <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                                    Branches<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                    id="branchId"
                                    autoComplete="branchId"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("branchId")} 
                                    >
                                        <option key="" value="">Select Branches</option>
                                        {branches && branches.map((item:any)=><option key={item._id} value={item._id}>{item.name}</option>)}
                                    </select>
                                </div>
                                <div className='flex justify-between'>
                                    <small className="text-red-700">
                                        {errors?.branchId && errors.branchId.message}
                                    </small>
                                    <small className="text-blue-700 cursor-pointer">
                                        <Link href="/branch/new">Create New</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 ">
                                <label htmlFor="staff" className="block text-sm font-medium leading-6 text-gray-900">
                                    Staff<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                    id="staffIds"
                                    autoComplete="staffIds"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("staffIds")} 
                                    >
                                        <option key="" value="">Select Staff</option>
                                        {staffs && staffs.map((item:any)=><option key={item._id} value={item._id}>{item.name}</option>)}
                                    </select>
                                </div>
                                <div className='flex justify-between'>
                                    <small className="text-red-700">
                                        {errors?.staffIds && errors.staffIds.message}
                                    </small>
                                    <small className="text-blue-700 cursor-pointer ml-auto">
                                        <Link href="/staff/invite">Create New</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                                    Type<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                    id="type"
                                    autoComplete="type"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("type")} 
                                    >
                                        <option key="" value="">Select Type</option>
                                        <option value={"Online"}>{"Online"}</option>
                                        <option value={"Offline"}>{"Offline"}</option>
                                        <option value={"Hybrid"}>{"Hybrid"}</option>
                                    </select>
                                </div>
                                <small className="text-red-700">
                                    {errors?.type && errors.type.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("description")} 
                                    />
                                </div>
                                <small className="text-red-700">
                                    {errors?.description && errors.description.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="startTime" className="block text-sm font-medium leading-6 text-gray-900">
                                    Start Time<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                <Controller
                                    control={control}
                                    name="startTime"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <TimePicker 
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}/>
                                    )}
                                />
                                </div>
                                <small className="text-red-700">
                                    {errors?.startTime && errors.startTime.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="endTime" className="block text-sm font-medium leading-6 text-gray-900">
                                    End Time<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                <Controller
                                    control={control}
                                    name="endTime"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                    <TimePicker 
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}/>
                                    )}
                                />
                                </div>
                                <small className="text-red-700">
                                    {errors?.endTime && errors.endTime.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="days" className="block text-sm font-medium leading-6 text-gray-900">
                                    Days
                                </label>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    {days.map(day => (
                                        <li key={day} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                            <div className="flex items-center ps-3">
                                                <input {...register("days")}  id="days" type="checkbox" value={day} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <label htmlFor="days" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{day}</label>
                                            </div>
                                        </li>)
                                    )}
                                </ul>
                                <small className="text-red-700">
                                    {errors?.days && errors.days.message}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>router.back()}>
                    Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Save
                    </button>
                </div>
            </form>
        </div>
    )
}