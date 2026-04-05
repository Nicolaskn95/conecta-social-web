'use client';

import React from 'react';

interface ListCardProps {
   title: string;
   subtitle: string;
   emptyMessage: string;
   children: React.ReactNode;
   hasItems: boolean;
}

export function ListCard({
   title,
   subtitle,
   emptyMessage,
   children,
   hasItems,
}: ListCardProps) {
   return (
      <div className="rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm">
         <div className="mb-4">
            <p className="text-sm font-medium text-slate-500">{subtitle}</p>
            <h3 className="text-xl font-bold text-[#090934]">{title}</h3>
         </div>
         {hasItems ? (
            <div className="space-y-3">{children}</div>
         ) : (
            <div className="rounded-xl bg-[#f5f8fb] px-4 py-6 text-sm text-slate-500">
               {emptyMessage}
            </div>
         )}
      </div>
   );
}
