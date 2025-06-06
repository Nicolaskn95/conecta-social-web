'use client';

import { CaretRightIcon } from '@phosphor-icons/react';
import Link from 'next/link';

interface BreadcrumbItem {
   label: string;
   href?: string;
}

interface BreadcrumbProps {
   items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
   return (
      <nav className="flex items-center space-x-2 text-sm">
         {items.map((item, index) => (
            <div key={index} className="flex items-center">
               {index > 0 && (
                  <CaretRightIcon
                     size={16}
                     className="mx-2 text-text_color/40"
                     weight="bold"
                  />
               )}
               {item.href ? (
                  <Link
                     href={item.href}
                     className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                     {item.label}
                  </Link>
               ) : (
                  <span className="text-sm font-medium text-text_color/60">
                     {item.label}
                  </span>
               )}
            </div>
         ))}
      </nav>
   );
}
