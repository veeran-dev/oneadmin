import {
  ADD_ATTENDANCE,
  GET_ATTENDANCE,
  GET_ATTENDANCE_BY_SID,
  TOGGLE_ATTENDANCE,
} from "@/pages/api/mutation/attendance";
import { GET_BATCH_BY_ID } from "@/pages/api/mutation/batch";
import { GET_STUDENTS_BY_BATCH } from "@/pages/api/mutation/student";
import { getUserData } from "@/utils/userStorage";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { pagination } from "@/types/common";

export const useAttendanceAPI = () => {
  const router = useRouter();
  const user: any = getUserData();
  const { id } = router.query;

  const { data: studentsByBatch, loading: studentsByBatchLoading } = useQuery(
    GET_STUDENTS_BY_BATCH,
    {
      variables: {
        data: {
          batchId: id,
          name: "",
          batchName: "",
        },
      },
    }
  );

  const {
    loading: batchLoading,
    error: batchError,
    data: batch,
  } = useQuery(GET_BATCH_BY_ID, {
    variables: {
      query: {
        batchId: id,
      },
    },
  });

  const [
    addAttendance,
    { loading: attendanceLoading, error: attendanceError, data: attendance },
  ] = useMutation(ADD_ATTENDANCE);

  const [
    toggleAttendance,
    {
      loading: toggleAttendanceLoading,
      error: toggleAttendanceError,
      data: toogleAttendance,
    },
  ] = useMutation(TOGGLE_ATTENDANCE);

  return {
    studentsByBatchData: studentsByBatch?.getStudentsByBatch,
    studentsByBatchLoading,
    batch: batch?.getBatchByID,
    batchLoading,
    addAttendance,
    attendanceLoading,
    attendanceError,
    attendance,
    toggleAttendance,
    toggleAttendanceError,
    toggleAttendanceLoading,
  };
};

export const useAttendance = (date: string = "") => {
  const router = useRouter();
  const user: any = getUserData();
  const { id } = router.query;

  console.log(user?.instituteId, id, date);
  const { loading, error, data, refetch } = useQuery(GET_ATTENDANCE, {
    variables: {
      instituteId: user?.instituteId,
      batchId: id,
      date: date,
    },
  });

  return {
    loading,
    error,
    data: data?.getAttendance,
    refetch,
  };
};

export const useStudentWiseAttendance = (pagination: pagination) => {
  const router = useRouter();
  const { id } = router.query;

    const { data, loading } = useQuery(GET_ATTENDANCE_BY_SID, {
        variables: {
            studentId: id,
            pagination: pagination,
        },
    });
    return { 
        attendances: data?.getAttendanceWithSid,
        loading
    };
};
