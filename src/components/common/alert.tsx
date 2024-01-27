import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useEffect } from 'react'

interface AlertProps {
  message: string;
  type: 'alert' | 'success' | 'danger';
  link?: string;
}

export default function Alert({message, type, link}:AlertProps) {

    const getBgColor =()=>{
        if(type === 'alert'){
            return 'bg-red-100'
        }
        if(type === 'success'){
            return 'bg-green-50'
        }
        if(type === 'danger'){
            return 'bg-red-50'
        }
    }

    const getTextColor =()=>{
        if(type === 'alert'){
            return 'text-yellow-800'
        }
        if(type === 'success'){
            return 'text-green-800'
        }
        if(type === 'danger'){
            return 'text-red-800'
        }
    }
  return (
    <div className={getBgColor()+" rounded-md p-4 mb-2"}>
      <div className="flex">
        <div className="flex-shrink-0">
            {type === 'danger' &&
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
            {type === 'success' &&
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
        </div>
        <div className="ml-3">
          <p className={getTextColor()+" text-sm font-medium "}>{message}</p>
        </div>
        {link && 
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <Link
              href={link}
              type="button"
              className="inline-flex items-center rounded-md bg-gray-50 py-1.5 px-3 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              <span className='text-sm mr-2'>Details </span>
              <span aria-hidden="true">  &rarr;</span>
            </Link>
          </div>
        </div>
        }
      </div>
    </div>
  )
}
