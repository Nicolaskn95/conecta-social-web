'use client';
import React from 'react';
import { SkeletonBox, SkeletonText } from './SkeletonElements';

interface EventsSkeletonProps {
   isLoading: boolean;
   children: React.ReactNode;
}

function EventsSkeleton({ isLoading, children }: EventsSkeletonProps) {
   if (!isLoading) {
      return <>{children}</>;
   }

   return (
      <section id="events" className="text-center">
         {/* Section Header Skeleton */}
         <div className="mb-16">
            <SkeletonBox
               width="w-48"
               height="h-16"
               className="mx-auto mb-4"
               delay={0}
            />
            <SkeletonBox
               width="w-24"
               height="h-1"
               className="mx-auto mb-6"
               delay={100}
            />
            <SkeletonBox
               width="w-40"
               height="h-6"
               className="mx-auto"
               delay={200}
            />
         </div>

         {/* Events Content Skeleton */}
         <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1, 2, 3].map((item) => (
                  <div
                     key={item}
                     className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                     {/* Instagram Post Header */}
                     <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                           <SkeletonBox
                              width="w-10"
                              height="h-10"
                              className="rounded-full"
                              delay={300 + item * 100}
                           />
                           <div className="flex-1">
                              <SkeletonBox
                                 width="w-24"
                                 height="h-4"
                                 delay={400 + item * 100}
                                 className="mb-1"
                              />
                              <SkeletonBox
                                 width="w-16"
                                 height="h-3"
                                 delay={500 + item * 100}
                              />
                           </div>
                        </div>
                     </div>

                     {/* Instagram Post Image */}
                     <SkeletonBox
                        width="w-full"
                        height="h-64"
                        delay={600 + item * 100}
                     />

                     {/* Instagram Post Content */}
                     <div className="p-4">
                        <div className="flex items-center space-x-4 mb-3">
                           <SkeletonBox
                              width="w-6"
                              height="h-6"
                              delay={700 + item * 100}
                           />
                           <SkeletonBox
                              width="w-6"
                              height="h-6"
                              delay={800 + item * 100}
                           />
                           <SkeletonBox
                              width="w-6"
                              height="h-6"
                              delay={900 + item * 100}
                           />
                        </div>

                        <SkeletonText
                           lines={3}
                           baseDelay={1000 + item * 100}
                           className="mb-3"
                        />

                        <SkeletonBox
                           width="w-20"
                           height="h-3"
                           delay={1100 + item * 100}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default EventsSkeleton;
