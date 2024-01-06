import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from "@/components/common/header";
import { useUser } from "@/context/UserContext";
import {useStudentAPI} from "@/hooks/studentHook";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker"
import SuccessAnimation, { SuccessAnimationData } from "@/components/common/SuccessAnimation";
import Loader from '@/components/common/loading';
import React from 'react';

const MemoizedSuccessAnimation = React.memo<SuccessAnimationData>(SuccessAnimation);

export default function Student(){

    const configs ={
        options: false,
        link:undefined
    }

    const options = {
    }

    const router = useRouter()
    const { id } =router.query
    const title = id === "new"? "Add Student":"Update Student";
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [studnetId, setStudentId] = useState<string>("")

    const {createStudent, editStudent, student, studentLoading} = useStudentAPI()

    const phoneNumberRules =/^[0-9]{10}$/
    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        motherName: yup.string().required('Mother Name is required'),
        fatherName: yup.string().required('Father Name is required'),
        school: yup.string().required('School Name is required'),
        dob: yup.string().required('DOB is required'),
        contact1: yup.string().matches(phoneNumberRules, { message: "Invalid Mobile Number!" }).required("Mobile Number Required !"),
        contact2: yup.string().matches(phoneNumberRules, { message: "Invalid Mobile Number!" }).required("Mobile Number Required !"),
        addressLine1: yup.string().required('Address Line 1 is required'),
        addressLine2: yup.string().required('Address Line 2 is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Invalid Pincode'),
        country: yup.string().required('Country is required'),
    });
    
    const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });
    const {user} = useUser();

    useEffect(()=>{
        if(student){
            // console.log(student.dob)
            // const dateObject = new Date(student.dob * 1000);
            // console.log("dateObject.....",dateObject)
            // const formattedDate = dateObject.toISOString().split('T')[0]; // "2021-12-11"
            // console.log("formattedDate.....",formattedDate)
            setValue("dob", student.dob);
            setValue("firstName", student.firstName)
            setValue("lastName", student.lastName)
            setValue("fatherName", student.fatherName)
            setValue("motherName", student.motherName)
            setValue("school", student.school)
            setValue("contact1", student.contact1?.replace(/^\+91\s*/, ''))
            setValue("contact2", student.contact2?.replace(/^\+91\s*/, ''))
            setValue("addressLine1", student.addressLine1)
            setValue("addressLine2", student.addressLine2)
            setValue("city", student.city)
            setValue("state", student.state)
            setValue("country", student.country)
            setValue("pincode", student.pincode)
        }
    },[student])

    const handleCreateStudent = async (formData: any) => {
        try {
            console.log("handleCreateStudent......",formData)
            formData['instituteId'] = user?.instituteId
            formData['contact1'] = '+91'+formData['contact1']
            formData['contact2'] = '+91'+formData['contact2']
            if(id === "new"){
                const createdStudent = await createStudent({
                    variables: {
                      studentData: formData,
                    },
                  });
                console.log("createdStudent...................",createdStudent)
                console.log(createdStudent.data.createStudent._id)
                if(createdStudent){
                    setStudentId(createdStudent.data.createStudent._id)
                    setSuccessMessage("student is created successfully")
                }
            }
            else{
                const editedStudent = await editStudent({
                    variables: {
                        studentId: id,
                        studentData: formData,
                    },
                  })

                if(editedStudent){
                    setSuccessMessage("student is edited successfully")
                    setTimeout(()=>{
                    router.push('/student')
                    },2000)
                }
            }
            
            // if(createStudent)
        } catch (error:any) {
            console.error('Error creating student:', error.message);
        }
    };

    const handleError = (errors: any) => {
        console.log(errors)
    };


    const successData:SuccessAnimationData = {
        message: successMessage,
        link1: {
            title: 'Join Batch',
            href: `/batch/joinStudent/${studnetId}`,
            primary: true,
        },
        link2: {
            title: 'Done',
            href: '/students',
            primary: false,
        },
    }

    if(successMessage !== ""){
        return (
                <div className='h-[calc(100vh-64px)]'>
                    <MemoizedSuccessAnimation message={successData.message} link1={successData.link1} link2={successData.link2}/>
                </div> 
            )
    }
    

    return(
        <div className='px-8 py-4'>
            <Header title={title} config={configs}/>
            {
                studentLoading && <Loader/>
            }
            { !studentLoading &&
                <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
                    <form onSubmit={handleSubmit(handleCreateStudent, handleError)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Student Information</h2>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                            First Name<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="firstName"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('firstName') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.firstName && errors.firstName.message}
                                        </small>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Last Name<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="lastName"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('lastName') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.lastName && errors.lastName.message}
                                        </small>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="fatherName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Father Name<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="fatherName"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('fatherName') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.fatherName && errors.fatherName.message}
                                        </small>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="motherName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Mother Name<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="motherName"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('motherName') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.motherName && errors.motherName.message}
                                        </small>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                            Date Of Birth<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                        <Controller
                                            name="dob"
                                            control={control}
                                            render={({ field }) => (
                                                <Datepicker
                                                    // dateFormat="DD/MM/YYYY"
                                                    dateFormat="dd/MM/yyyy"
                                                    selected={field.value !== undefined ? new Date(field.value):new Date()}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            )}
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.dob && errors.dob.message}
                                        </small>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="school" className="block text-sm font-medium leading-6 text-gray-900">
                                            School Name<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="school"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('school') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.school && errors.school.message}
                                        </small>
                                    </div>
                                </div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="sm:col-span-2">
                                        <label htmlFor="contact1" className="block text-sm font-medium leading-6 text-gray-900">
                                            Contact Number 1<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            id="contact1"
                                            type="contact1"
                                            autoComplete="contact1"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('contact1') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.contact1 && errors.contact1.message}
                                        </small>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="contact2" className="block text-sm font-medium leading-6 text-gray-900">
                                            Contact Number 2<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            id="contact2"
                                            type="contact2"
                                            autoComplete="contact2"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('contact2') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.contact2 && errors.contact2.message}
                                        </small>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="addressLine1" className="block text-sm font-medium leading-6 text-gray-900">
                                            Address Line 1 <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="addressLine1"
                                            autoComplete="addressLine1"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('addressLine1') }
                                            />
                                            <small className="text-red-700">
                                                {errors?.addressLine1 && errors.addressLine1.message}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="addressLine2" className="block text-sm font-medium leading-6 text-gray-900">
                                            Address Line 2 <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="addressLine2"
                                            autoComplete="addressLine2"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('addressLine2') }
                                            />
                                            <small className="text-red-700">
                                                {errors?.addressLine2 && errors.addressLine2.message}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('city') }
                                            />
                                            <small className="text-red-700">
                                                {errors?.city && errors.city.message}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                            State / Province<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="state"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('state') }
                                            />
                                            <small className="text-red-700">
                                                {errors?.state && errors.state.message}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                                            ZIP / Postal code<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            id="pincode"
                                            autoComplete="pincode"
                                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register('pincode') }
                                            />
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.pincode && errors.pincode.message}
                                        </small>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                            id="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 bg-white h-[36px] pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            {...register('country') }
                                            >
                                                <option value={'India'}>India</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
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
            }
        </div>
    )
}