'use client';
import React from 'react';

interface SkeletonProps {
   className?: string;
   width?: string;
   height?: string;
   delay?: number;
}

export function SkeletonBox({
   className = '',
   width = 'w-full',
   height = 'h-4',
   delay = 0,
}: SkeletonProps) {
   const animationDelay = delay > 0 ? `animation-delay-${delay}` : '';

   return (
      <div
         className={`bg-gray-200 rounded-lg ${width} ${height} ${className} relative overflow-hidden`}
      >
         <div
            className={`absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent ${animationDelay}`}
            style={{ animationDelay: `${delay}ms` }}
         ></div>
      </div>
   );
}

export function SkeletonText({
   lines = 1,
   className = '',
   baseDelay = 0,
}: {
   lines?: number;
   className?: string;
   baseDelay?: number;
}) {
   return (
      <div className={`space-y-2 ${className}`}>
         {Array.from({ length: lines }).map((_, index) => (
            <SkeletonBox
               key={index}
               width={index === lines - 1 ? 'w-2/3' : 'w-full'}
               height="h-4"
               delay={baseDelay + index * 100}
            />
         ))}
      </div>
   );
}

export function SkeletonCard({
   className = '',
   delay = 0,
}: {
   className?: string;
   delay?: number;
}) {
   return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
         <SkeletonBox
            width="w-full"
            height="h-40"
            className="mb-4"
            delay={delay}
         />
         <SkeletonBox
            width="w-3/4"
            height="h-6"
            className="mb-2"
            delay={delay + 100}
         />
         <SkeletonText lines={2} baseDelay={delay + 200} />
      </div>
   );
}

export function SkeletonAvatar({
   size = 'w-24 h-24',
   className = '',
   delay = 0,
}: {
   size?: string;
   className?: string;
   delay?: number;
}) {
   return (
      <SkeletonBox
         width={size}
         height={size}
         className={`rounded-full ${className}`}
         delay={delay}
      />
   );
}

export function SkeletonButton({
   width = 'w-32',
   height = 'h-10',
   className = '',
   delay = 0,
}: SkeletonProps) {
   return (
      <SkeletonBox
         width={width}
         height={height}
         className={`rounded-md ${className}`}
         delay={delay}
      />
   );
}
