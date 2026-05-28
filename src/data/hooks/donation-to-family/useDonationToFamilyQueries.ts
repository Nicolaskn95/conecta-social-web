import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   donationToFamilyService,
   DonationToFamilyDetailResponse,
   DonationToFamilyResponse,
} from '@/data/services/donationToFamilyService';
import { queryKeys } from '@/data/query/queryKeys';

export function useDonationsToFamily(
   options?: Omit<UseQueryOptions<DonationToFamilyResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.donationsToFamily.list({}),
      queryFn: () => donationToFamilyService.getAll(),
      enabled: true,
      staleTime: 5 * 60 * 1000,
      ...options,
   });
}

export function useDonationToFamilyById(
   id: string,
   options?: Omit<
      UseQueryOptions<DonationToFamilyDetailResponse>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: queryKeys.donationsToFamily.detail(id),
      queryFn: () => donationToFamilyService.getById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      ...options,
   });
}
