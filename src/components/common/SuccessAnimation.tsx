import React from 'react';
import Lottie from "lottie-react";
import successAnimation from '../../assets/success.json'
import Link from 'next/link';

export interface SuccessAnimationData{
  message: string;
  link1?:{
    title:string;
    href:string;
    primary:boolean;
  },
  link2?:{
    title:string;
    href:string;
    primary:boolean;
  }
}


const SuccessAnimation = ({message, link1, link2}:SuccessAnimationData) => {
  
  const style = {
    height: 200,
    width:200
  };

  const getAnimation=()=>{
    
    if (typeof navigator !== "undefined" && typeof document !== 'undefined') {
      return <Lottie animationData={successAnimation} style={style}/>
    }
    else null
  }

  return(
        <div className='flex flex-col absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80'> 
            {getAnimation()}
            <p>{message}</p>
            
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                {link1 !== undefined &&
                  <Link
                    type="button"
                    href={link1.href}
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    {
                      link1.title
                    }
                  </Link>
                }
                {link2 &&
                  <Link
                    type="button"
                    href={link2.href}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    {link2.title}
                  </Link>
                }
              </div>

        </div>
        )
};

export default SuccessAnimation;
