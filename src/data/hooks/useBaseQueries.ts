import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   BaseFilters,
   BaseResponse,
   BaseDetailResponse,
} from '../services/baseService';

// Hook genérico para buscar lista de entidades
export function useBaseList<T>(
   queryKey: readonly string[],
   queryFn: () => Promise<BaseResponse<T>>,
   filters?: BaseFilters,
   options?: Omit<UseQueryOptions<BaseResponse<T>>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: [...queryKey, { filters }],
      queryFn,
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 minutos
      ...options,
   });
}

// Hook genérico para buscar entidade por ID
export function useBaseDetail<T>(
   queryKey: readonly string[],
   id: string,
   queryFn: (id: string) => Promise<BaseDetailResponse<T>>,
   options?: Omit<
      UseQueryOptions<BaseDetailResponse<T>>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: [...queryKey, id],
      queryFn: () => queryFn(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutos
      ...options,
   });
}

// Hook genérico para buscar entidades com filtro de busca
export function useBaseSearch<T>(
   queryKey: readonly string[],
   search: string,
   queryFn: (filters: BaseFilters) => Promise<BaseResponse<T>>,
   options?: Omit<UseQueryOptions<BaseResponse<T>>, 'queryKey' | 'queryFn'>
) {
   return useBaseList(
      queryKey,
      () => queryFn({ search }),
      { search },
      {
         enabled: !!search,
         ...options,
      }
   );
}

// Hook genérico para buscar entidades com paginação
export function useBasePagination<T>(
   queryKey: readonly string[],
   page: number,
   limit: number,
   queryFn: (filters: BaseFilters) => Promise<BaseResponse<T>>,
   filters?: Omit<BaseFilters, 'offset' | 'limit'>,
   options?: Omit<UseQueryOptions<BaseResponse<T>>, 'queryKey' | 'queryFn'>
) {
   const offset = (page - 1) * limit;

   return useBaseList(
      queryKey,
      () => queryFn({ ...filters, limit, offset }),
      { ...filters, limit, offset },
      {
         placeholderData: (previousData) => previousData,
         ...options,
      }
   );
}
