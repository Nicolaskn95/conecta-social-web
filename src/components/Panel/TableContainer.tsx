// components/DashboardTableContainer.tsx
'use client';

import SearchInput from './SearchInput';
import React, { useState } from 'react';
import Pagination from './Pagination';

interface Column {
   key: string;
   label: string;
   render?: (value: any, item: any) => React.ReactNode;
}

interface Action {
   icon: React.ReactNode;
   onClick: (item: any) => void;
   className: string;
   label: string;
}

interface DashboardTableContainerProps {
   title: string;
   columns: Column[];
   data?: any[];
   actions?: Action[];
   onSearch?: (value: string) => void;
}

export default function TableContainer({
   title,
   columns,
   data,
   actions = [],
   onSearch,
}: DashboardTableContainerProps) {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const itemsPerPage = 10;
   const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

   const paginatedData = data
      ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];

   return (
      <div className="p-4 bg-white rounded-3xl shadow-md border border-[#4AA1D3]">
         <div className="flex items-start justify-between p-3">
            <h1 className="mb-4 text-2xl font-extrabold">{title}</h1>
            <SearchInput onSearch={onSearch} />
         </div>
         <div className="overflow-x-auto">
            <table className="w-full border-collapse">
               <thead>
                  <tr>
                     {columns.map((column, index) => (
                        <th
                           key={index}
                           className="px-4 py-2 text-start text-primary font-bold"
                        >
                           {column.label}
                        </th>
                     ))}
                     {actions.map((action, index) => (
                        <th
                           key={index}
                           className="px-4 py-2 text-primary font-bold text-center"
                        >
                           {action.label}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {paginatedData.map((item, index) => (
                     <tr className="row-data" key={index}>
                        {columns.map((column, columnIndex) => (
                           <td key={columnIndex} className="px-4 py-2">
                              {column.render
                                 ? column.render(item[column.key], item)
                                 : item[column.key]}
                           </td>
                        ))}
                        {actions.map((action, actionIndex) => (
                           <td
                              key={actionIndex}
                              className="px-4 py-2 text-center"
                           >
                              <button
                                 onClick={() => {
                                    action.onClick(item);
                                 }}
                              >
                                 <div className={action.className}>
                                    {action.icon}
                                 </div>
                              </button>
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
         />
      </div>
   );
}
