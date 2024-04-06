import Pagination from "@/components/common/pagination";
import {
  ADD_PAYMENT,
  GET_PAYMENT_LIST,
  GET_PAYMENT_LIST_BY_BATCH_ID,
  GET_PAYMENT_LIST_BY_SID,
} from "@/pages/api/mutation/payment";
import { pagination } from "@/types/common";
import { getUserData } from "@/utils/userStorage";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export interface addPaymentData {
  instituteId: string;
  studentId: string;
  batchId: string;
  courseId: string;
  amount: number;
  paymentStatus: string;
  paymentType: string;
}

export const usePayment = (pagination: pagination, name: string) => {
  const user: any = getUserData();
  const router = useRouter();
  const { data, loading, error,refetch } = useQuery(GET_PAYMENT_LIST, {
    variables: {
      instituteId: user?.instituteId,
      studentName: name,
      pagination: pagination,
    },
  });

  useEffect(() => {
    refetch();
  },[router.pathname])


  return {
    data: data?.getPayments,
    loading,
    error,
  };
};

export const useSavePayment = () => {
  const user: any = getUserData();
  const [addPayment, { data, loading, error }] = useMutation(ADD_PAYMENT);

  return {
    addPayment,
    loading,
    error,
  };
};

export const usePaymentByStudent = (pagination: pagination) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_PAYMENT_LIST_BY_SID, {
    variables: {
      pagination: pagination,
      studentId: id,
    },
  });

  return {
    studentPayments: data?.getPaymentsWithSid,
    loading,
    error,
  };
};

export const usePaymentByBatch = (batchId: string, date: Date) => {
  const { data, error, loading } = useQuery(GET_PAYMENT_LIST_BY_BATCH_ID, {
    variables: {
      date: date,
      batchId: batchId,
    },
  });

  return {
    data:data?.getBatchWiseAnalytics,
    error,
    loading,
  };
};
