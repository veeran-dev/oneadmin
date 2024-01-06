import {
  ExclamationCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Header from "@/components/common/header";
import Accordion, { AccordionProps } from "@/components/common/accordion";
import moment from "moment";
import ReusableTable from "@/components/reusableTable";
import { useRouter } from "next/router";
import { useStudentAPI, useStudentDetails } from "@/hooks/studentHook";
import { useStudentWiseAttendance } from "@/hooks/attendanceHook";
import { DropdownData } from "@/components/common/dropdown";
import { usePayment, usePaymentByStudent } from "@/hooks/paymentHook";
import EmptyTable from "@/components/common/emptyTable";

const currentDate = moment().format("Do MMM YYYY");

const activity = [
  { id: 1, type: "paid", batchName: "Chelsea Marry", date: currentDate },
  { id: 2, type: "pending", batchName: "Chelsea Darris", date: currentDate },
  { id: 3, type: "pending", batchName: "Chelsea Hagon", date: currentDate },
  { id: 4, type: "paid", batchName: "Chelsea Prawn", date: currentDate },
  { id: 5, type: "paid", batchName: "Chelsea Faraw", date: currentDate },
];

const headersData = [
  { label: "Name", key: "batchName" },
  { label: "Status", key: "status" },
  { label: "Date", key: "dateTime" },
];

const dummyData: AccordionProps = {
  content: [
    {
      title: "Accordion 1",
      description: "This is the description for Accordion 1.",
      chips: ["Online", "11:00 AM", "12:00 AM", "Tue, Wed, Thu"],
    },
    {
      title: "Accordion 2",
      description: "This is the description for Accordion 2.",
      chips: ["TagA", "TagB", "TagC"],
    },
    {
      title: "Accordion 3",
      description: "This is the description for Accordion 3.",
      chips: ["ItemX", "ItemY", "ItemZ"],
    },
  ],
};

interface ActivityItem {
  id: number;
  paymentStatus: "Paid" | "Pending";
  batchName: string;
  amount: number;
  formattedPaymentDate: string;

}


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}


export default function Index() {

    const defaultPagination = {
        limit: 5,
        offset: 0
    }

    const router = useRouter()
    const {id} = router.query;
    const { student } = useStudentAPI()
    const {batches} = useStudentDetails()

    const {attendances} = useStudentWiseAttendance(defaultPagination)
    const { studentPayments} = usePaymentByStudent(defaultPagination)
    
    const formattedDate = moment(student?.joinedOn).format("Do MMM YYYY");
    const DOB = moment(student?.dob).format("Do MMM YYYY");
    const configs ={
        options: false,
        mini: true,
        link:{
            href: "/students/attendance/"+id,
            title: "View All",
        }
    }

    const accordionPropsData: AccordionProps = {
        content: batches?.map((item: { name: any; description: any; type: any; startTime: any; endTime: any; days: any[]; }) => ({
          title: item.name,
          description: item.description || '',
          chips: [item.type, item.startTime, item.endTime, ...item.days.map((day: { toString: () => any; }) => day.toString())]
        }))
    };

    const batchDropdown: DropdownData = {
      title: "Pay Fees",
      options: batches?.map((item: {name:string; _id:string})=>({
        title: item.name,
        href: `/students/payment?studentId=${id}&batchId=${item._id}&batchName=${item.name}&studentName=${student?.firstName} ${student?.lastName}`,
      }))
    }

  return (
    <div className="px-8 py-4">
      <Header
        title={"Student Details"}
        config={{
          dropdown: batchDropdown
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto grid max-w-2xl grid-cols-2 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 grid-rows-2">
          <div className="lg:col-span-2">
            {/* Personal Information */}
            <div className="bg-gray-50 -mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 col-span-1 lg:col-span-2">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <dl className="mt-6 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Full name
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{student?.firstName} {student?.lastName}</div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Joined On
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{formattedDate}</div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Father Name
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{student?.fatherName}</div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Mother Name
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">
                        {student?.motherName}
                      </div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      School
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">
                        {student?.school}
                      </div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Date of Birth
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">
                        {DOB}
                      </div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Address
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="text-gray-900">
                            {`${student?.addressLine1}${student?.addressLine2 ? `, ${student?.addressLine2}` : ''}, ${student?.city}, ${student?.state}, ${student?.country} ${student?.pincode}`}
                        </div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Primary Contact
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{student?.contact1}</div>
                    </dd>
                  </div>
                  <div className="pt-3 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                      Secondary Contact
                    </dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{student?.contact2}</div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Attendance History*/}
            <div className="lg:col-span-2 mt-8 relative">
                <Header title={"Attendance List"} config={configs}/>
                {!attendances || attendances.length === 0 &&
                  <EmptyTable headers={headersData} title={"No Attendance"} link={""}/>
                }
                {attendances && attendances.length > 0 &&
                    <ReusableTable headers={headersData} rows={attendances} />
                }
            </div>
          </div>
          <div>
            {/* Batch Detail */}
            <div className=" ">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto p-6">
                    <dt className="text-base font-semibold leading-6 text-gray-900">
                      Batch Details
                    </dt>
                  </div>
                  <Accordion content={accordionPropsData.content} />
                </dl>
              </div>
            </div>

            {/*Fee History */}
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 p-6 mt-4">
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Fee History
              </h2>
              <ul role="list" className="mt-6 space-y-6">
                {studentPayments && studentPayments.length>0 && studentPayments.map((activityItem:ActivityItem, activityItemIdx:number) => (
                  <li key={activityItem.id} className="relative flex gap-x-4">
                    <div
                      className={classNames(
                        activityItemIdx === activity.length - 1
                          ? "h-6"
                          : "-bottom-6",
                        "absolute left-0 top-0 flex w-6 justify-center"
                      )}
                    >
                      <div className="w-px bg-gray-200" />
                    </div>
                    <>
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                        {activityItem.paymentStatus === "Paid" ? (
                          <CheckCircleIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <ExclamationCircleIcon
                            className="h-6 w-6 text-orange-600"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                          <span className="font-medium text-gray-900">
                            {activityItem.batchName}
                          </span>{" "}
                        </p>
                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                          <span>&#8377;{activityItem.amount}</span>
                        </p>

                        <time
                          dateTime={activityItem.formattedPaymentDate}
                          className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                        >
                          {activityItem.formattedPaymentDate}
                        </time>
                      </div>
                    </>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
