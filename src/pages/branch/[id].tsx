import Header from "@/components/common/header";
import { useUser } from "@/context/UserContext";
import { useCreateBranch, useBranchesById, useEditBranch } from "@/hooks/branchHook";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SuccessAnimation from "@/components/common/SuccessAnimation";

export default function Branch(){

    const configs ={
        options: false,
        link:undefined
    }
    const router = useRouter()
    const { id } =router.query
    const title = id === "new"? "Create Branch":"Edit Branch";
    const [successMessage, setSuccessMessage] = useState<string>("")
    
    const { createBranch, data, loading, error } = useCreateBranch();
    const { editBranch, editData, editLoading, editError } = useEditBranch()
    const { loading:getLoading, error:getError, branch } =  useBranchesById();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: "onBlur",
    });
    const {user} = useUser();

    useEffect(()=>{
        console.log("branch....",branch)
        if(branch && branch.length > 0){
            setValue("name", branch.name)
            setValue("pocName", branch.pocName)
            setValue("pocMobile", branch.pocMobile?.replace(/^\+91\s*/, ''))
            setValue("streetAddress", branch.streetAddress)
            setValue("city", branch.city)
            setValue("state", branch.state)
            setValue("country", branch.country)
            setValue("pincode", branch.pincode)
        }
    },[branch])

    const handleCreateBranch = async (formData: any) => {
        try {

            formData['instituteId'] = user?.instituteId
            formData['pocMobile'] = '+91'+formData['pocMobile']
            if(id === "new"){
                const createdBranch = await createBranch(formData);

                if(createdBranch){
                    setSuccessMessage("branch is created successfully")
                    setTimeout(()=>{
                    router.push('/branch')
                    },2000)
                }
            }
            else{
                const editedBranch = await editBranch(formData)

                if(editedBranch){
                    setSuccessMessage("branch is edited successfully")
                    setTimeout(()=>{
                    router.push('/branch')
                    },2000)
                }
            }
            
            // if(createBranch)
        } catch (error:any) {
            console.error('Error creating branch:', error.message);
        }
    };

    const handleError = (errors: any) => {
        console.log(errors)
    };

    const branchOptions = {
        name: { required: "Branch Name is required" },
        pocName:{ required: "Name is required" },
        pocMobile: {
            required: "Mobile number is required",
            pattern: {
                value: /^[6-9]\d{9}$/,
              message: "Invalid mobile number",
            },
        },
        streetAddress:{ required: "streetAddress is required" },
        city:{ required: "city is required" },
        state:{ required: "state is required" },
        country:{ required: "country is required" },
        pincode: {
            required: "Pincode is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Invalid pincode",
            },
          },
      };
    
    if(successMessage !== ""){
        return <div className='h-[calc(100vh-64px)]'>
            <SuccessAnimation message={successMessage}/>
        </div> 
    }
    return(
        <div className='px-8 py-4'>
            <Header title={title} config={configs}/>
            <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
            <form onSubmit={handleSubmit(handleCreateBranch, handleError)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Branch Information</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Branch Name<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('name', branchOptions.name) }
                                    />
                                </div>
                                <small className="text-red-700">
                                {errors?.name && typeof errors.name === 'object' && errors.name.message && (
                                        <>{errors.name.message}</>
                                )}
                                </small>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="pocName" className="block text-sm font-medium leading-6 text-gray-900">
                                    {"Point of Contact's Name"}<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    id="pocName"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('pocName', branchOptions.pocName) }
                                    />
                                </div>
                                <small className="text-red-700">
                                    {errors?.pocName && typeof errors.pocName === 'object' && errors.pocName.message && (
                                        <>{errors.pocName.message}</>
                                    )}
                                </small>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="pocMobile" className="block text-sm font-medium leading-6 text-gray-900">
                                    {"Point of Contact's Number"}<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="pocMobile"
                                    type="pocMobile"
                                    autoComplete="pocMobile"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('pocMobile', branchOptions.pocMobile) }
                                    />
                                </div>
                                <small className="text-red-700">
                                    {errors?.pocMobile && typeof errors.pocMobile === 'object' && errors.pocMobile.message && (
                                        <>{errors.pocMobile.message}</>
                                    )}
                                </small>
                            </div>
                            <div className="col-span-full">
                        <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                            {"Institute's Address (Main Branch)"} <span className='text-red-600'>*</span>
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            id="streetAddress"
                            autoComplete="streetAddress"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('streetAddress', branchOptions.streetAddress) }
                            />
                            <small className="text-red-700">
                                {errors?.streetAddress && typeof errors.streetAddress === 'object' && errors.streetAddress.message && (
                                    <>{errors.streetAddress.message}</>
                                )}
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
                            {...register('city', branchOptions.city) }
                            />
                            <small className="text-red-700">
                                {errors?.city && typeof errors.city === 'object' && errors.city.message && (
                                    <>{errors.city.message}</>
                                )}
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
                            {...register('state', branchOptions.state) }
                            />
                            <small className="text-red-700">
                                {errors?.state && typeof errors.state === 'object' && errors.state.message && (
                                    <>{errors.state.message}</>
                                )}
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
                            {...register('pincode', branchOptions.pincode) }
                            />
                        </div>
                        <small className="text-red-700">
                            {errors?.pincode && typeof errors.pincode === 'object' && errors.pincode.message && (
                                <>{errors.pincode.message}</>
                            )}
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            {...register('country', branchOptions.country) }
                            >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
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
        </div>
    )
}