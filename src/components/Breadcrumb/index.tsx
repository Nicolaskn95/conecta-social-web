import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface BreadcrumbItem {
   label: string;
   href: string;
}

interface BreadcrumbProps {
   items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
   return (
      <nav className="flex" aria-label="Breadcrumb">
         <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {items.map((item, index) => {
               const isLast = index === items.length - 1;

               return (
                  <li key={item.href} className="inline-flex items-center">
                     {index > 0 && (
                        <svg
                           className="w-3 h-3 text-text_color/40 mx-1"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 6 10"
                        >
                           <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 9 4-4-4-4"
                           />
                        </svg>
                     )}
                     {isLast ? (
                        <span className="text-sm font-medium text-text_color/60">
                           {item.label}
                        </span>
                     ) : (
                        <Link
                           href={item.href}
                           className="text-sm font-medium text-primary hover:text-primary/80"
                        >
                           {item.label}
                        </Link>
                     )}
                  </li>
               );
            })}
         </ol>
      </nav>
   );
}
