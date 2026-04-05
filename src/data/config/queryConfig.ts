import { QueryClient } from '@tanstack/react-query';
import { ApiRequestError } from '../services/baseService';

export const createQueryClient = () => {
   return new QueryClient({
      defaultOptions: {
         queries: {
            // Tempo que os dados ficam "frescos" antes de serem considerados stale
            staleTime: 5 * 60 * 1000, // 5 minutos
            // Tempo que os dados ficam no cache quando não há componentes usando
            gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
            // Retry automático em caso de erro
            retry: (failureCount, error) => {
               if (
                  error instanceof ApiRequestError &&
                  error.status >= 400 &&
                  error.status < 500
               ) {
                  return false;
               }
               // Tentar até 3 vezes para outros erros
               return failureCount < 3;
            },
            // Tempo entre tentativas de retry
            retryDelay: (attemptIndex) =>
               Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch quando a janela ganha foco
            refetchOnWindowFocus: false,
            // Refetch quando reconecta à internet
            refetchOnReconnect: true,
         },
         mutations: {
            // Retry para mutations
            retry: (failureCount, error) => {
               if (
                  error instanceof ApiRequestError &&
                  error.status >= 400 &&
                  error.status < 500
               ) {
                  return false;
               }
               return failureCount < 2;
            },
         },
      },
   });
};
