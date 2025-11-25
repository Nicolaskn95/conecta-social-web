import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   donationService,
   DonationFilters,
   DonationResponse,
   DonationDetailResponse,
} from '../../services/donationService';
import { queryKeys } from '../../query/queryKeys';

export function useDonations(
   filters?: DonationFilters,
   options?: Omit<UseQueryOptions<DonationResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.donations.list(filters || {}),
      queryFn: () => donationService.getAll(filters),
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 minutos
      ...options,
   });
}

export function useDonationById(
   id: string,
   options?: Omit<UseQueryOptions<DonationDetailResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.donations.detail(id),
      queryFn: () => donationService.getById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutos
      ...options,
   });
}

export function useDonationsWithSearch(
   search: string,
   options?: Omit<UseQueryOptions<DonationResponse>, 'queryKey' | 'queryFn'>
) {
   return useDonations(
      { search },
      {
         enabled: !!search,
         ...options,
      }
   );
}

