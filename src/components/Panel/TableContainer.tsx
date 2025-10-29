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
   showFilters?: boolean;
}

export default function TableContainer({
   title,
   columns,
   data,
   actions = [],
   onSearch,
   showFilters = false,
}: DashboardTableContainerProps) {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const itemsPerPage = 10;
   const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

   const paginatedData = data
      ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];

   return (
      <div className="bg-white rounded-3xl shadow-md border border-[#4AA1D3] flex flex-col max-h-[calc(100vh-200px)]">
         {/* Header similar ao Jampack */}
         <div className="p-6 pb-4 flex-shrink-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
               <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-extrabold">{title}</h1>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                     {data?.length || 0} itens
                  </span>
               </div>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
               <div className="flex-1">
                  <SearchInput onSearch={onSearch} />
               </div>

               {/* Filtros rápidos */}
               {showFilters && (
                  <div className="flex gap-2">
                     <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Todos os Status</option>
                        <option>Ativo</option>
                        <option>Inativo</option>
                        <option>Pendente</option>
                     </select>
                     <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Todas as Cidades</option>
                        <option>São Paulo</option>
                        <option>Rio de Janeiro</option>
                        <option>Belo Horizonte</option>
                     </select>
                  </div>
               )}
            </div>
         </div>

         <div className="flex-1 overflow-auto min-h-0">
            <table className="w-full border-collapse">
               <thead className="sticky top-0 bg-white z-10">
                  <tr>
                     {columns.map((column, index) => (
                        <th
                           key={index}
                           className="px-4 py-2 text-start text-primary font-bold bg-white"
                        >
                           {column.label}
                        </th>
                     ))}
                     {actions.map((action, index) => (
                        <th
                           key={index}
                           className="px-4 py-2 text-primary font-bold text-center bg-white"
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

         <div className="p-6 pt-4 border-t border-gray-200 flex-shrink-0">
            <Pagination
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={setCurrentPage}
            />
         </div>
      </div>
   );
}
