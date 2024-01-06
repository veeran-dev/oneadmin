import React from "react";
import { Key } from "react";
import Empty from "./empty";
import { title } from "process";


interface EmptyTableProps {
  headers: { label: string; key: string }[],
  title: string;
  link: string;
}




const EmptyTable: React.FC<EmptyTableProps> = ({ headers, title, link }:EmptyTableProps) => {
  console.log("headers...",headers)
  return (
    <div className="mt-4 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              <tr key={"dd"} className="w-full">
                      <td
                        key={"ddada"}
                        colSpan={headers.length}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        <Empty title={title} link={link}/>
                      </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyTable;
