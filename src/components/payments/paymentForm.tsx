import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import SuccessAnimation from "@/components/common/SuccessAnimation";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker"
import { useUser } from "@/context/UserContext";
import { useSavePayment } from '@/hooks/paymentHook';

export default function PaymentForm({batches, courses, students, setCourseId}:any){
    console.log(".............................",batches)
    const router = useRouter()
    const { studentId, batchId, batchName, studentName } = router.query;

    const [successMessage, setSuccessMessage] = useState<string>("")
    const [isShowing, setIsShowing] = useState(false)
    
    const { addPayment} = useSavePayment();

    const {user} = useUser();
    
    const validationSchema = yup.object().shape({
        amount: yup
                .number()
                .typeError('Amount must be a number')
                .required('Amount is required')
                .positive('Amount must be a positive number'),
        paymentStatus: yup.string().required('Status is required'),
        paymentType: yup.string().required('Payment Mode is required'),
        paidToDate: yup.date().required("please select Paid to month")
    });

    const { handleSubmit, register, setError, setValue, control, formState:{errors} } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    useEffect(()=>{
        setTimeout(()=>{
            setIsShowing(true)
        },3000)
    },[])


    const handleCreateBatch = useCallback( async (formData: any) => {
        try {
            formData['instituteId'] = user?.instituteId
            formData['studentId'] = studentId
            formData['batchId'] = batchId
            console.log("formData.......",formData)

            const addedPayment = await addPayment({
                variables:{
                    paymentInput: formData
                }
            });
            if(addedPayment){
                setSuccessMessage("Fee detail is added successfully")
                setTimeout(()=>{
                router.push(`/students/view/${studentId}`);
                },2000)
            }
            
            // if(createBatch)
        } catch (error:any) {
            console.error('Error creating batch:', error.message);
        }
    },  [addPayment]);

    const handleError = (errors: any) => {
        console.log("errors....",errors)
    };


    const handleCourseChange = (e:any) => {
        const selectedCourseId = e.target.value;
        setCourseId(selectedCourseId);
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
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Payment Information</h2>
                        <p className='text-sm text-gray-500'>{studentName} | {batchName}</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Amount<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        type='number'
                                        id="amount"
                                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("amount")} 
                                    />
                                </div>
                                <small className="text-red-700">
                                    {errors?.amount && errors.amount.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="paymentType" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mode<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                    id="paymentType"
                                    autoComplete="paymentType"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("paymentType")} 
                                    >
                                        <option key="" value="">Select Mode</option>
                                        <option value={"Online"}>{"Online"}</option>
                                        <option value={"Cash"}>{"Cash"}</option>
                                    </select>
                                </div>
                                <small className="text-red-700">
                                    {errors?.paymentType && errors.paymentType.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="paidToDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Paid To<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                        <Controller
                                            name="paidToDate"
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
                                    {errors?.paymentStatus && errors.paymentStatus.message}
                                </small>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="paymentStatus" className="block text-sm font-medium leading-6 text-gray-900">
                                    Status<span className='text-red-600'>*</span>
                                </label>
                                <div className="mt-2">
                                    <select
                                    id="paymentStatus"
                                    autoComplete="paymentStatus"
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    {...register("paymentStatus")} 
                                    >
                                        <option key="" value="">Select Status</option>
                                        <option value={"Paid"}>{"Paid"}</option>
                                        <option value={"Partially Paid"}>{"Partially Paid"}</option>
                                    </select>
                                </div>
                                <small className="text-red-700">
                                    {errors?.paymentStatus && errors.paymentStatus.message}
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