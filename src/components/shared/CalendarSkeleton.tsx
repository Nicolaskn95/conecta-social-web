'use client';
import React from 'react';
import { SkeletonBox, SkeletonText, SkeletonCard } from './SkeletonElements';

interface CalendarSkeletonProps {
   isLoading: boolean;
   children: React.ReactNode;
}

function CalendarSkeleton({ isLoading, children }: CalendarSkeletonProps) {
   if (!isLoading) {
      return <>{children}</>;
   }

   return (
      <div className="w-full max-w-6xl mx-auto">
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar Skeleton */}
            <div className="w-full lg:w-[400px] lg:flex-shrink-0">
               <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-6">
                     <SkeletonBox width="w-32" height="h-6" delay={0} />
                     <div className="flex gap-2">
                        <SkeletonBox width="w-8" height="h-8" delay={100} />
                        <SkeletonBox width="w-8" height="h-8" delay={200} />
                     </div>
                  </div>

                  {/* Calendar Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                     {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(
                        (day, index) => (
                           <SkeletonBox
                              key={day}
                              width="w-full"
                              height="h-8"
                              delay={300 + index * 50}
                           />
                        )
                     )}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                     {Array.from({ length: 35 }).map((_, index) => (
                        <SkeletonBox
                           key={index}
                           width="w-full"
                           height="h-10"
                           delay={700 + index * 20}
                        />
                     ))}
                  </div>
               </div>
            </div>

            {/* Events Panel Skeleton */}
            <div className="w-full lg:flex-1 lg:min-w-0">
               <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 min-h-[400px] flex flex-col">
                  {/* Panel Header - Always Visible */}
                  <div className="mb-6">
                     <h3 className="text-xl font-bold text-text_color">
                        Selecione uma data para ver os eventos
                     </h3>
                  </div>

                  {/* Events Content */}
                  <div className="flex-1 flex flex-col">
                     <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                           <div
                              key={item}
                              className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                           >
                              <div className="flex items-start justify-between">
                                 <div className="flex-1">
                                    <SkeletonBox
                                       width="w-3/4"
                                       height="h-5"
                                       delay={1200 + item * 200}
                                       className="mb-2"
                                    />
                                    <SkeletonText
                                       lines={2}
                                       baseDelay={1300 + item * 200}
                                       className="mb-2"
                                    />
                                    <div className="flex items-center">
                                       <SkeletonBox
                                          width="w-4"
                                          height="h-4"
                                          delay={1400 + item * 200}
                                          className="mr-2"
                                       />
                                       <SkeletonBox
                                          width="w-48"
                                          height="h-4"
                                          delay={1500 + item * 200}
                                       />
                                    </div>
                                 </div>
                                 <div className="ml-4">
                                    <SkeletonBox
                                       width="w-16"
                                       height="h-6"
                                       delay={1600 + item * 200}
                                       className="rounded-full"
                                    />
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CalendarSkeleton;
