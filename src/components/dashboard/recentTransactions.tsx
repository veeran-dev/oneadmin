import EmptyTable from "@/components/common/emptyTable";
import Header from "@/components/common/header";
import Loader from "@/components/common/loading";

import ReusableTable from "@/components/reusableTable";
import { usePayment } from "@/hooks/paymentHook";
import Link from "next/link";
import { useState } from "react";

const defaultPagination = {
  limit: 5,
  offset: 0,
};

export default function RecentTransaction() {
  const [name, setName] = useState("");

  const {
    loading: getLoading,
    error: getError,
    data: history,
  } = usePayment(defaultPagination, name);

  const configs = {
    options: false,
    tabs: false,
  };

  const headers = [
    { label: "Student Name", key: "studentName" },
    // { label: "Batch Name", key: "batchName" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "paymentStatus" },
    { label: "Paid On", key: "formattedPaymentDate" },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-row justify-between">
        <h2 className="text-sm font-semibold">{"Recent Transaction"}</h2>
        <Link
          className="text-xs font-semibold text-gray-600"
          href={"/payments"}
        >
          View All
        </Link>
      </div>
      {(history===undefined || (history && history.length === 0)) && (
        <EmptyTable
          headers={headers}
          title={"No Payment"}
          link={"/payments/new"}
        />
      )}
      {getLoading && <Loader />}
      {history && history.length !== 0 && (
        <ReusableTable headers={headers} rows={history} />
      )}
    </div>
  );
}
