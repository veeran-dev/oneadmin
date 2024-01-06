import SuccessAnimation from "@/components/common/SuccessAnimation";
import Header,{HeaderProps} from "@/components/common/header"
import Loader from "@/components/common/loading";
import { useBatchesByInstituteId } from "@/hooks/batchHook"
import { useStudentToJoin } from "@/hooks/studentHook";
import { pagination } from "@/types/common";
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as yup from 'yup';

const defaultPagination:pagination={
    limit: undefined,
    offset: undefined
}

export default function JoinStudent(){
    const router = useRouter()
    const {batches, batchLoading} = useBatchesByInstituteId(defaultPagination, "")
    const { addStudentToBatch } = useStudentToJoin()
    const [successMessage, setSuccessMessage] = useState<string>("")
    const headerProps:HeaderProps ={
        title:"Add to Batch",
        config:{
            
        }
    }
    console.log("batches>>>>>>>>",batches)

    const validationSchema = yup.object().shape({
        batchId: yup.string().required('Batch is required'),
    })

    const { register, handleSubmit, setError, setValue, control, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const handleAddStudent = async (formData: any) => {
        console.log("formData.....",formData)
        const { id } =router.query
        const data = {
            studentId: id,
            batchId: formData.batchId
        }
        try{
            const student = await addStudentToBatch({
                variables:{
                    data: data
                }
            })

            if(student){
                setSuccessMessage("student added to batch successfully")
                setTimeout(()=>{
                router.push('/students')
                },2000)
            }
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const handleError = (errors: any) => {
        console.log(errors)
    };

    if(successMessage !== ""){
        return (
                <div className='h-[calc(100vh-64px)]'>
                    <SuccessAnimation message={successMessage}/>
                </div> 
            )
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
            <Header {...headerProps}/>
            {batchLoading && batches.length ===0 && <Loader/> }
            {!batchLoading && batches.length >0 && 
                <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
                    <form onSubmit={handleSubmit(handleAddStudent, handleError)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Join Batch</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Select Batch<span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="batchId"
                                                autoComplete="batchId"
                                                className="block w-full rounded-md border-0 py-1.5 pl-2 h-[36px] bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                {...register("batchId")} 
                                            >
                                                <option key="" value="">Select Batches</option>
                                                {batches && batches.map((item:any)=><option key={item._id} value={item._id}>{item.name}</option>)}
                                            </select>
                                        </div>
                                        <small className="text-red-700">
                                            {errors?.batchId && errors.batchId.message}
                                        </small>
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