import React from 'react';

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

export default function Pagination({
   currentPage,
   totalPages,
   onPageChange,
}: PaginationProps) {
   const pages: (number | string)[] = [];

   for (let i = 1; i <= totalPages; i++) {
      if (
         i === 1 ||
         i === totalPages ||
         (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
         pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
         pages.push('...');
      }
   }

   // Remove duplicate ellipsis
   const filteredPages = pages.filter(
      (item, idx) => item !== '...' || pages[idx - 1] !== '...'
   );

   return (
      <div className="flex gap-2 justify-center mt-4">
         <button
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
         >
            &lt;
         </button>
         {filteredPages.map((page, idx) =>
            page === '...' ? (
               <span key={idx} className="px-3 py-1">
                  ...
               </span>
            ) : (
               <button
                  key={idx}
                  className={`px-3 py-1 rounded ${
                     page === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-700'
                  }`}
                  onClick={() => onPageChange(Number(page))}
               >
                  {page}
               </button>
            )
         )}
         <button
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
         >
            &gt;
         </button>
      </div>
   );
}
