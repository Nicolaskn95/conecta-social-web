import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   beneficiaryService,
   BeneficiaryDetailResponse,
   BeneficiaryFilters,
   BeneficiaryResponse,
   DisabilitySuggestionsResponse,
} from '@/data/services/beneficiaryService';
import { queryKeys } from '@/data/query/queryKeys';

export function useBeneficiaries(
   filters?: BeneficiaryFilters,
   options?: Omit<UseQueryOptions<BeneficiaryResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.beneficiaries.list(filters || {}),
      queryFn: () => beneficiaryService.getAll(filters),
      enabled: true,
      staleTime: 5 * 60 * 1000,
      ...options,
   });
}

export function useBeneficiaryById(
   id: string,
   options?: Omit<
      UseQueryOptions<BeneficiaryDetailResponse>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: queryKeys.beneficiaries.detail(id),
      queryFn: () => beneficiaryService.getById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      ...options,
   });
}

export function useDisabilitySuggestions(
   search?: string,
   options?: Omit<
      UseQueryOptions<DisabilitySuggestionsResponse>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: queryKeys.beneficiaries.disabilitySuggestions(search),
      queryFn: () => beneficiaryService.getDisabilitySuggestions(search),
      enabled: Boolean(search && search.trim().length > 0),
      staleTime: 5 * 60 * 1000,
      ...options,
   });
}
