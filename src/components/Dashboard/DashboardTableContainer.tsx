// components/DashboardTableContainer.tsx
'use client';

import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import SearchInput from './SearchInput';
import Status from './Status';
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
}

interface DashboardTableContainerProps {
   title: string;
   columns: Column[];
   data: any[];
   actions?: Action[];
   onSearch?: (value: string) => void;
}

export default function DashboardTableContainer({
   title,
   columns,
   data,
   actions = [],
   onSearch,
}: DashboardTableContainerProps) {
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;
   const totalPages = Math.ceil(data.length / itemsPerPage);

   const paginatedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

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
                        <th key={index} className="px-4 py-2 text-start">
                           {column.label}
                        </th>
                     ))}
                     {actions.length > 0 && (
                        <th className="px-4 py-2 text-start">Ações</th>
                     )}
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
                        {actions.length > 0 && (
                           <td className="px-4 py-2 text-center">
                              <div className="flex gap-2 justify-center">
                                 {actions.map((action, actionIndex) => (
                                    <button
                                       key={actionIndex}
                                       onClick={() => action.onClick(item)}
                                    >
                                       <div className={action.className}>
                                          {action.icon}
                                       </div>
                                    </button>
                                 ))}
                              </div>
                           </td>
                        )}
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
