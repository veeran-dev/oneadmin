import Header from "@/components/common/header";
import { useRouter } from "next/router";
import { Suspense, memo, useEffect } from "react";
import Loader from "@/components/common/loading";
import Card from "@/components/common/card";
import Empty from "@/components/common/empty";
import { useAttendance, useAttendanceAPI } from "@/hooks/attendanceHook";

const MemoizedCard = memo(Card);


export default function Batch() {
  const configs = {
    options: false,
    link: undefined,
  };

  //To check if attendance already added for today
  const currentDate = new Date();
  currentDate.setHours(11, 0, 0, 0);


  const router = useRouter();
  const { id } = router.query;
  const title = "Take Attendance";
  const { data } = useAttendance(currentDate.toISOString());
  const { studentsByBatchData, batch, } = useAttendanceAPI();
  console.log("data ............",data)

  if(data && data.length > 0){
    return (
      <div className='px-8 py-4'>
        <Header title={title} config={configs} />
        <Suspense fallback={<Loader />}>
            <div className="flex flex-col items-center justify-center h-[400px]">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  Attendance has already been added for this date.
                </p>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={() => router.push('/attendance')}
                >
                  Go Back to Attendance
                </button>
            </div>
        </Suspense>
      </div>
    )
  }

  return (
    <div className='px-8 py-4'>
      <Header title={title} config={configs} />
      <Suspense fallback={<Loader />}>
        <>
        {studentsByBatchData?.length === 0 && <Empty title="No Students in Batch" link="/students" />}
        {batch !== undefined && studentsByBatchData?.length !== 0 && (
            <MemoizedCard students={studentsByBatchData} batch={batch}/>
        )}
        </>
      </Suspense>
    </div>
  );
}
