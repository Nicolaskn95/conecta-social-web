'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode } from 'react';
import { createQueryClient } from '../config/queryConfig';

interface QueryProviderProps {
   children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
   const [queryClient] = useState(() => createQueryClient());

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         {/* DevTools apenas em desenvolvimento */}
         {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
         )}
      </QueryClientProvider>
   );
}
