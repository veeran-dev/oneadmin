import Header from "@/components/common/header";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useInvitations from "@hooks/inviteHook"
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ReusableTable from "@/components/reusableTable";


export default function Invite(){

    const configs ={
        options: false,
        link:undefined
    }
    const router = useRouter()
    const { id } =router.query
    const title = "Invite Staffs";
    const [success, setSuccess] = useState<boolean>(false)
    
    const { sendInvite, useGetInvitations } = useInvitations();
    const { loading, error, invitations} = useGetInvitations()
    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm({
        mode: "onBlur",
    });
    


    const handleCreateinvite = async (formData: any) => {
        try {
            console.log(formData)
            const mailOptions = {
                to: formData.email,

            }
            const res = await sendInvite(formData.email);
            console.log("createdinvite....",res)
            if(res){
                setSuccess(true)
                setTimeout(()=>{
                    setSuccess(false)
                },2000)
            }
        } catch (error:any) {
            console.error('Error creating branch:', error.message);
        }
    };

    const handleError = (errors: any) => {
        console.log(errors)
    };
    const headers =[
        { label: "Email", key: "email" },
        { label: "Invited Date", key: "createdAt" },
    ]
    const validateOptions = {
        email: {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          },
      };

    return(
        <div className='px-8 py-4'>
            <Header title={title} config={configs}/>
            <div className="p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm">
                <div className="mt-10 xl:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-gray-800">Invite your staff</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                    An invite email with referal code will be send, create account by clicking the join button
                    </p>
                    <form onSubmit={handleSubmit(handleCreateinvite, handleError)} className="mt-6 flex-col max-w-md">
                        <div className="relative flex flex-row grow">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="w-full min-w-0 appearance-none rounded-md border-[1px] bg-white/5 px-3 py-1.5 text-base text-gray-800 shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                                placeholder="Enter email"
                                {...register('email', validateOptions.email) }
                            />
                            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                                <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                Invite
                                </button>
                            </div>
                        </div>
                        {success &&
                        <div className="flex flex-row text-green-500 mt-2">
                            <CheckCircleIcon height={18} width={18} />
                            <small className="">Email sent successfully</small>
                        </div>}
                        
                    </form>
                </div>
            </div>
            {invitations && invitations.length>0 &&
                <ReusableTable  headers={headers} rows={invitations} buttons={[]} />
            }
        </div>
    )
}