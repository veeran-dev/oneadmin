import EmptyTable from "@/components/common/emptyTable";
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";
import ReusableTable from "@/components/reusableTable";
import ConfirmationModal from "@/components/common/confirmationModal";
import { useUser } from "@/context/UserContext";
import { useAttendance, useAttendanceAPI } from "@/hooks/attendanceHook";
import { Suspense, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Datepicker from "react-datepicker";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function Index() {

  const [selectedDate, setSelectedDate] = useState();
  const [selectedId, setSelectedId] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { loading, data, refetch: attendanceRefetch } = useAttendance(selectedDate);
  const { batch, toggleAttendance } = useAttendanceAPI();

  const configs = {
    options: false,
    tabs: false,
  };

  const headers = [
    { label: "Student Name", key: "fullName" },
    { label: "Presence", key: "status" },
  ];

  const buttonsConfig: { label: string; link: string }[] | undefined = [];
  const actionsConfig:{ label: string; link: string }[] = [
    {
      label: "Change",
      link:"",
    },
  ];

  const handleDateChange = (date: any) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleButtonClick = (label: string, id:string) => {
    setSelectedId(id)
    if (label === "Change") {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmation = async() => {
    const res = await toggleAttendance({
        variables:{
            attendanceId:selectedId
        }
    })
    if(res){
        attendanceRefetch();
    }
    setIsConfirmationOpen(false);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="px-8 py-4">
      <Header title={"View Attendance"} config={configs} />
      <ConfirmationModal
        type={"warning"}
        title={"Update Attendance"}
        msg={"Are you sure, Do you want to update the attendance"}
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmation}
      />
      <Suspense fallback={"Loading...."}>
        <div className="mb-4 flex flex-row sm:mt-0 flex-wrap">
          <div className="flex items-center text-sm text-gray-700">
            <BriefcaseIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
              aria-hidden="true"
            />
            {batch?.name}
          </div>
          <div className="flex items-center text-sm text-gray-700 ml-[24px]">
            <MapPinIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
              aria-hidden="true"
            />
            {batch?.type}
          </div>
          <div className="flex items-center text-sm text-gray-700 ml-[24px]">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
              aria-hidden="true"
            />
            {batch?.startTime}
          </div>
          <div className="flex items-center text-sm text-gray-700 ml-[24px]">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500"
              aria-hidden="true"
            />
            {batch?.endTime}
          </div>
          <div className="ml-auto flex flex-col max-w-sm">
            <label>Select Date</label>
            <Datepicker
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {data && data.length === 0 && (
          <EmptyTable
            headers={headers}
            title={"Attendance"}
            link={"/attendance"}
          />
        )}
        {loading && <Loader />}
        {data && data.length > 0 && (
          <ReusableTable
            headers={headers}
            rows={data}
            buttons={buttonsConfig}
            actions={actionsConfig}
            onButtonClick={handleButtonClick}
          />
        )}
      </Suspense>
    </div>
  );
}
