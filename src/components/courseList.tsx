import React from "react";
import ReusableTable from "@component/reusableTable"; // Adjust the path as needed

const BranchList = ({ courses }: any) => {
  const headers = [
    { label: "Course Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Description", key: "description" },
  ];

  const buttonsConfig = [
    { label: "Edit", link: "/course/" },
    // Add more button configurations as needed
  ];

  return <ReusableTable headers={headers} rows={courses} buttons={buttonsConfig} />;
};

export default BranchList;
