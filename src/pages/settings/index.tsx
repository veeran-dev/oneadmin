import Header from '@/components/common/header'
import { useQuery } from '@apollo/client';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useUser } from '@/context/UserContext';
import { GET_INSTITUTE_BY_ID } from '../api/mutation/institute';


export default function Settings() {
  const { user } = useUser();
  const { loading, error, data:instituteData } = useQuery(GET_INSTITUTE_BY_ID, {
    variables: { id: user?.instituteId }, // Pass the instituteId variable here
  });
  console.log("user is ....",user)
  console.log("instituteData....",instituteData?.getInstitute)

  const tabsData = [
    { name: 'Settings', href: '/settings', current: false },
    { name: 'Batch', href: '/batch', current: false },
    { name: 'Branch', href: '/branch', current: true },
    { name: 'Course', href: '/course', current: false },
    { name: 'Staffs', href: '/staff', current: false },
]

  const configs ={
      options: false,
      tabs: true,
      tabsData:tabsData,
      link:{
        href: "/settings/"+user?.instituteId,
        title: "Edit Settings"
      }
  }

  return (
    <div className='px-8 py-4'>
      <Header title={"Settings"} config={configs}/>
      <div className='p-8 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm'>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Institute Profile</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{instituteData?.getInstitute.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {instituteData?.getInstitute.about}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Logo</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className='p-8 mt-4 bg-clip-border rounded-xl bg-white border border-blue-gray-100 shadow-sm'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Contact Information</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">{"Point of Contact's Name"}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{instituteData?.getInstitute.pocName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">{"Point of Contact's Number"}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{instituteData?.getInstitute.pocMobile}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${instituteData?.getInstitute.streetAddress}\n
                  ${instituteData?.getInstitute.city}, ${instituteData?.getInstitute.state}\n
                  ${instituteData?.getInstitute.country} - ${instituteData?.getInstitute.pincode}`}
              </dd>
            </div>
        </dl>
      </div>
    </div>
    </div>
  )
}
