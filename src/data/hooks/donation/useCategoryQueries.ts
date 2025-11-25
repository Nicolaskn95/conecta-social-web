import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   categoryService,
   CategoryResponse,
   CategoryDetailResponse,
} from '../../services/categoryService';

export function useCategories(
   options?: Omit<UseQueryOptions<CategoryResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: ['categories'],
      queryFn: () => categoryService.getAll(),
      enabled: true,
      staleTime: 10 * 60 * 1000, // 10 minutos
      ...options,
   });
}

export function useCategoryById(
   id: string,
   options?: Omit<UseQueryOptions<CategoryDetailResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: ['categories', id],
      queryFn: () => categoryService.getById(id),
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutos
      ...options,
   });
}

