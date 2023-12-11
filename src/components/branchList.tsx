import React from "react";
import ReusableTable from "@component/reusableTable"; // Adjust the path as needed

const BranchList = ({ branches }: any) => {
  const headers = [
    { label: "Branch Name", key: "name" },
    { label: "POC Name", key: "pocName" },
    { label: "POC Number", key: "pocMobile" },
  ];

  const buttonsConfig = [
    { label: "Edit", link: "/branch/" },
    // Add more button configurations as needed
  ];

  return <ReusableTable headers={headers} rows={branches} buttons={buttonsConfig} />;
};

export default BranchList;
