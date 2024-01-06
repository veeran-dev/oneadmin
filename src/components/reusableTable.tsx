import Link from "next/link";
import React from "react";
import { Key } from "react";

interface TableProps {
  headers: { label: string; key: string }[];
  rows: { [key: string]: string | number }[];
  buttons?: { label: string; link: string }[];
  actions?: { label: string; link: string }[];
  onButtonClick?: (label:string, id:string)=>void;
}

const ReusableTable: React.FC<TableProps> = ({ headers, rows, buttons, actions, onButtonClick }) => {
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
                  {buttons && buttons.length > 0 && (
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                  {actions && actions.length > 0 && (
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.map((row: { [key: string]: string | number }) => (
                  <tr key={row._id as Key}>
                    {headers.map((header) => (
                      <td
                        key={header.key}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        {row[header.key]}
                      </td>
                    ))}
                    {buttons && buttons.length > 0 && (
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {buttons.map((button, index) => (
                          <Link
                            key={index}
                            href={`${button.link}${row._id}`}
                            className="text-indigo-600 hover:text-indigo-900 pr-4"
                          >
                            {button.label}
                          </Link>
                        ))}
                      </td>
                    )}
                    {actions && actions.length > 0 && (
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {actions.map((action, index) => (
                          <button
                            key={index}
                            className="text-indigo-600 hover:text-indigo-900 pr-4"
                            onClick={() => onButtonClick && onButtonClick(action.label, String(row._id))}
                          >
                            {action.label}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
