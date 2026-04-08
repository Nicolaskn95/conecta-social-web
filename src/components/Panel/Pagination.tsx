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
            className="min-w-12 px-3 py-2 rounded-md bg-tertiary text-primary font-semibold border border-primary/20 transition-colors hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
         >
            &lt;
         </button>
         {filteredPages.map((page, idx) =>
            page === '...' ? (
               <span
                  key={idx}
                  className="min-w-12 px-3 py-2 text-center text-primary/70 font-semibold"
               >
                  ...
               </span>
            ) : (
               <button
                  key={idx}
                  className={`min-w-12 px-3 py-2 rounded-md border font-semibold transition-all ${
                     page === currentPage
                        ? 'bg-primary text-white border-primary ring-2 ring-primary/30 shadow-sm'
                        : 'bg-tertiary text-primary border-primary/20 hover:bg-secondary/20'
                  }`}
                  onClick={() => onPageChange(Number(page))}
               >
                  {page}
               </button>
            )
         )}
         <button
            className="min-w-12 px-3 py-2 rounded-md bg-tertiary text-primary font-semibold border border-primary/20 transition-colors hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
         >
            &gt;
         </button>
      </div>
   );
}
