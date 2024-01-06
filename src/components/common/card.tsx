import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react';
import { BriefcaseIcon, CalendarIcon, CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Modal from './modal';
import { useRouter } from 'next/router';
import { useAttendance, useAttendanceAPI } from '@/hooks/attendanceHook';
import SuccessAnimation from './SuccessAnimation';
import { useUser } from '@/context/UserContext';
import Alert from './alert';
import Link from 'next/link';

export default function Card({students, batch}:any) {
    
    const { addAttendance } = useAttendanceAPI()
    const [clickedItems, setClickedItems] = useState<Array<string>>([]);
    const [people, setPeople] = useState(students);
    const [description, setDescription] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>("")
    const { user } = useUser()
    const router = useRouter()
    const { id } = router.query

    useEffect(()=>{
        setPeople(students)
    },[students])

    const handleItemClick = (id: string, index: number, type:string) => {
        setClickedItems((prevItems) => [...prevItems, id]);
        const newSet = [...people];
        const removedItem = { ...newSet[index] };
        // delete newSet[index];
        newSet.splice(index, 1)
        if(type === 'present'){
            removedItem['present'] = true;
        }
        else{
            removedItem['present'] = false;
        }
        
        console.log("newSet............",newSet)
        console.log("removedItem..............",removedItem)
        setTimeout(() => {
            newSet.push(removedItem);
            setPeople([...newSet]);
            setClickedItems(clickedItems.filter((item) => item !== id))
          }, 400);
      };

console.log("person is.....",people)

    const getPresent=(b: boolean)=>{
        if(!people){
            return 0;
        }
        const x = people.filter((item: { present: boolean; }) => item.present === b)
        console.log("people.....",x)
        return x.length

    }

    const saveAttendance = async()=>{
        console.log("saveAttendance")
        let present = getPresent(true)
        let absent = getPresent(false)
        if((present+absent) !== people.length){
            setDescription("Sorry, you have missed someone, please check")
            setIsModalOpen(true)
        }
        const attendance = people.map((student:any) => {
            return {
                '_id': student._id,
                'present': student.present,
            }
        })
        
        const attendanceData = {
            'instituteId': user?.instituteId,
            'batchId': id,
            'branchId': batch.branchId,
            'date': new Date(),
            'students': attendance

        }
        console.log(attendance)
        const res = await addAttendance({
            variables:{
                attendanceData
            }
        })
        if(res){
            setSuccessMessage("Attendance is taken successfully")
            setTimeout(()=>{
            router.push('/attendance')
            },2000)
        }
    }
    if(successMessage !== ""){
        return (
                <div className='h-[calc(100vh-64px)]'>
                    <SuccessAnimation message={successMessage}/>
                </div> 
            )
    }
    return (
        <>
        {isModalOpen && (
            <Modal
                type={"warning"}
                title="Attendance"
                description={description}
                setOpen={() => setIsModalOpen(false)} // Pass the function to close the modal
            />
        )}
            <div className="mb-4 flex flex-row sm:mt-0 flex-wrap">
                <div className="flex items-center text-sm text-gray-700">
                    <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                    {batch.name}
                </div>
                <div className="flex items-center text-sm text-gray-700 ml-[24px]">
                    <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                    {batch.type}
                </div>
                <div className="flex items-center text-sm text-gray-700 ml-[24px]">
                    <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                    {batch.startTime}
                </div>
                <div className="flex items-center text-sm text-gray-700 ml-[24px]">
                    <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                    {batch.endTime}
                </div>
                <div className="flex items-center text-gray-700 bg-green-100 rounded-md px-2 py-2 ml-[24px]">
                    <span className='text-sm text-green-700'>{'Present '}{getPresent(true)}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-red-100 rounded-md px-2 py-2 ml-[24px]">
                    <span className='text-sm text-red-400'>{'Absent '}{getPresent(false)}</span>
                </div>
                <div className="ml-auto">
                    <button
                        type="submit"
                        onClick={()=>saveAttendance()}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>

            <div className='flex'>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {people && people.length > 0 && people.map((person:any, index:number) => (
                    <li key={person._id} className={`relative col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition-opacity duration-500 ease-out ${clickedItems.includes(person._id) ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        {person.present !== undefined && person.present === false &&
                            <span className='absolute top-0 right-0 bg-orange-500 rounded-xl'><NoSymbolIcon className="h-5 w-5 text-white" aria-hidden="true" /></span>
                        }
                        {person.present && person.present === true &&
                            <span className='absolute top-0 right-0 bg-green-500 rounded-xl'><CheckCircleIcon className="h-5 w-5 text-white" aria-hidden="true" /></span>
                        }
                        <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                            <h3 className="truncate text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</h3>
                        </div>
                        <p className="mt-1 truncate text-sm text-gray-500">{person.contact1}</p>
                        </div>
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="capitalize font-medium text-gray-600 dark:text-gray-300">{person.firstName[0]} {person.lastName[0]}</span>
                        </div>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                            <Link
                            href={`#`}
                            onClick={() => handleItemClick(person._id, index, 'absent')}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-orange-300 hover:text-orange-200"
                            >
                            <NoSymbolIcon className="h-5 w-5 text-orange-300" aria-hidden="true" />
                            Absent
                            </Link>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                            <Link
                            href={`#`}
                            onClick={() => handleItemClick(person._id, index, 'present')}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-green-700 hover:text-green-600"
                            >
                            <CheckCircleIcon className="h-5 w-5 text-green-700" aria-hidden="true" />
                            Present
                            </Link>
                        </div>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}