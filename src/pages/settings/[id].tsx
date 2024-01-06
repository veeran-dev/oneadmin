import Alert from '@/components/common/alert'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { decodeToken } from '@/utils/TokenStorage';
import SuccessAnimation from '@/components/common/SuccessAnimation';
import Header from '@/components/common/header';
import { useUser } from '@/context/UserContext';

import { useMutation } from '@apollo/client';
import { ADD_USER, GET_USER_BY_EMAIL } from '../api/mutation/user'
import { useQuery } from '@apollo/client';
import { CREATE_INSTITUTE, EDIT_INSTITUTE, GET_INSTITUTE_BY_ID } from "@api/institute"


export default function Settings() {
    const { user } = useUser();
    const [registerInstituteMutation, { loading, error }] = useMutation(CREATE_INSTITUTE);
    // const [editInstituteMutation, { loading:editLoading, error:editError }] = useMutation(EDIT_INSTITUTE);
    const [editInstituteMutation] = useMutation(EDIT_INSTITUTE, {
        onCompleted: (data) => {
            console.log('Edit Institute Successful:', data);
            setSuccess(true)
            setSuccessMessage("Your account updated successfully")
            setTimeout(()=>{
            router.push('/settings')
            },2000)
        },
        onError: (error) => {
            console.error('Edit Institute Error:', error.message);
            toast.error(error.message);
            if(String(error.message).includes("Mobile")){
            setError("pocMobile", {message: String(error.message)})
            }
        },
      });
    const [addUserMutation, { loading:addUserLoading, error:addUserError }] = useMutation(ADD_USER);
    const { data } = useQuery(GET_INSTITUTE_BY_ID, {
        variables: { id: user?.instituteId },
        onCompleted: (data) => {
            console.log('Query Completed:', data);
            const { getInstitute } = data;
            setValue('name', getInstitute.name);
            setValue('streetAddress', getInstitute.streetAddress);
            setValue('about', getInstitute.about);
            setValue('pocName', getInstitute.pocName);
            setValue('pocMobile', getInstitute.pocMobile.replace(/^\+91\s*/, ''));
            setValue('pincode', getInstitute.pincode);
            setValue('state', getInstitute.state);
            setValue('city', getInstitute.city);
            setValue('country', getInstitute.country);
        },
        onError: (error) => {
          console.error('Query Error:', error.message);
        },
      });
    const { data: userData, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(GET_USER_BY_EMAIL);
    

      
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm({mode: "onBlur"});
    const [success, setSuccess] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string>("")

    const router = useRouter()
    const { id, force } = router.query;


    const configs ={
        options: false,
        link: undefined
    }
    

    //On first time users
    //Once the institute is created, it will check the user already exists
    //if not it will add as user
    //if already a user redirects
    const handleRegistration = async (formData: any) => {
        try{
            console.log('formData....',formData)
            formData['pocMobile'] = '+91'+formData.pocMobile;
            if(id === "new"){
                const { data } = await registerInstituteMutation({
                    variables: { instituteData: formData },
                });
                console.log("response is....",data)
                console.log('loading...',loading)
                console.log('error...',error)
                if (data && force === "true") {
                    console.log("----->>>>>",data.createInstitute?._id)
                    await refetchUserQuery(data.createInstitute?._id, formData['pocMobile']);
                }
                if(error){
                    const notify = () => toast.error(String(error));
                }
            }
            else{
                const { data } = await editInstituteMutation({
                    variables: { 
                        instituteId: id,
                        instituteData: formData 
                    },
                });   
            }
        }
        catch(error:any){
            console.log("error...>",error)
            console.log(error.message)
            toast.error(error.message);
            if(String(error.message).includes("Mobile")){
                setError("pocMobile", {message: String(error.message)})
            }
        }

    }

    const handleError = (errors:any) => {
        console.log(errors)
    };

    
    const refetchUserQuery = async (instituteId: any, mobile: any) => {
        try {
          const user = await refetchUser();
          console.log("user data...",user)
        } catch (error) {
          console.error('Error refetching students data:', error);
          const user = decodeToken()
          const userData:any ={
            name: user?.name,
            email:user?.email,
            instituteId:instituteId,
            role:"admin",
            mobile:mobile,
          }
            const addUserResponse = await addUserMutation({
                variables: { createUser: userData }, // Replace with the appropriate variables
            });
            console.log("addUserResponse...",addUserResponse)
            if(addUserResponse && force === "true"){
                setSuccess(true)
                setSuccessMessage("Your account created successfully, you will redirected to dashboard")
                setTimeout(()=>{
                    router.push('/dashboard')
                },2000)
            }
  
        }
    };


    const registerOptions = {
        name: { required: "Name is required" },
        email: {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          },
        pocName:{ required: "Name is required" },
        pocMobile: {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
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
        about:{ required: "About is required", },
        // password: {
        //   required: "Password is required",
        //   minLength: {
        //     value: 8,
        //     message: "Password must have at least 8 characters"
        //   }
        // }
      };

      if(success === true){
        return <div className='h-[calc(100vh-64px)]'>
            <SuccessAnimation message={successMessage}/>
        </div> 
      }


  return (
    <div className='px-8 py-4'>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        <Header title={"Settings"} config={configs}/>
        {user?.instituteId === undefined && <Alert type="danger" message='Please complete this profile to create your account' />}
        <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Institute Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed on the website
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name<span className='text-red-600'>*</span>
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            id="name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            {...register('name', registerOptions.name) }
                        />
                        </div>
                        <small className="text-red-700">
                            {errors?.name && <>{errors.name.message}</>}
                        </small>
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                        About your Institute
                    </label>
                    <div className="mt-2">
                        <textarea
                        id="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={''}
                        {...register('about', registerOptions.about) }
                        />
                    </div>
                    <small className="text-red-700">
                        {errors?.about && <>{errors.about.message}</>}
                    </small>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Institute Logo | photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                        <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                        Change
                        </button>
                    </div>
                    </div>

                    <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Will be used to contact and shown on the website</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="pocName" className="block text-sm font-medium leading-6 text-gray-900">
                            {"Point of Contact's Name"}<span className='text-red-600'>*</span>
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            id="pocName"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('pocName', registerOptions.pocName) }
                            />
                        </div>
                        <small className="text-red-700">
                            {errors?.pocName && <>{errors.pocName.message}</>}
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
                            {...register('pocMobile', registerOptions.pocMobile) }
                            />
                        </div>
                        <small className="text-red-700">
                            {errors?.pocMobile && <>{errors.pocMobile.message}</>}
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
                            {...register('streetAddress', registerOptions.streetAddress) }
                            />
                            <small className="text-red-700">
                                {errors?.streetAddress && <>{errors.streetAddress.message}</>}
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
                            {...register('city', registerOptions.city) }
                            />
                            <small className="text-red-700">
                                {errors?.city && <>{errors.city.message}</>}
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
                            {...register('state', registerOptions.state) }
                            />
                            <small className="text-red-700">
                                {errors?.state && <>{errors.state.message}</>}
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
                            {...register('pincode', registerOptions.pincode) }
                            />
                        </div>
                        <small className="text-red-700">
                            {errors?.pincode && <>{errors.pincode.message}</>}
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
                            {...register('country', registerOptions.country) }
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
    </div>
  )
}
