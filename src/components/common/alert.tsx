import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

export default function Alert({message, type}:{message:string, type:string}) {

    const getBgColor =()=>{
        if(type === 'alert'){
            return 'bg-yellow-50'
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
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-gray-50 p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
