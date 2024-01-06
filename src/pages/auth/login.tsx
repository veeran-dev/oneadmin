import Image from 'next/image';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { decodeToken, setToken } from '../../utils/TokenStorage';
import { useRouter } from 'next/router';
import { useAddUser } from '@/hooks/getUserHook';
import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const { createStaffs, loading, error, data } = useAddUser();

    const responseMessage =async (e:CredentialResponse)=>{
      setToken(e.credential);
      if(router.query.referalCode && router.query.id){
        const userData:any = decodeToken()
        const user ={
          "name": userData.name,
          "email": userData.email,
          "instituteId": router.query.id,
          "role": "staff"
        }
        await createStaffs(user)
      }

      router.push('/dashboard');
    }

    const errorMessage =()=>{
      console.log("errorMessage....")
    }


    return (
      <>
        <div className="flex flex-row min-h-full flex-1">
          
          <div className="relative w-full flex-1 max-w-[50%]">
            <Image
                layout='fill'
                objectFit='contain'
                priority 
                src={"/app/attendance.svg"} alt="Sign in with Google" />
            
          </div>
          <div className="flex flex-1 flex-col items-center justify-center sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="flex flex-col mx-auto w-full h-screen max-w-sm lg:w-96 items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="h-10 w-auto"
                  src="/app/logo.png"
                  alt="Your Company"
                />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Not a member?{' '}
                  <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Start a 30 day free trial
                  </Link>
                </p>
              </div>
  
              <div className="w-full mt-6 grid gap-4 flex justify-center">
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
              </div>
              {/* <div className='w-full text-center mt-8'>
                <a className='cursor-pointer underline text-sm font-semibold leading-6 text-gray-500 hover:text-gray-700'>Create account</a>
              </div> */}
              
            </div>
          </div>
        </div>
      </>
    )
  }
  