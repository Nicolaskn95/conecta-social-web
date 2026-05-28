import {
   UseMutationOptions,
   useMutation,
   useQueryClient,
} from '@tanstack/react-query';
import {
   donationToFamilyService,
   DonationToFamilyDetailResponse,
} from '@/data/services/donationToFamilyService';
import { IDonationToFamily } from '@/core/donation/model/IDonationToFamily';
import { queryKeys } from '@/data/query/queryKeys';
import { toast } from 'react-toastify';

type DonationToFamilyCreatePayload = Omit<
   IDonationToFamily,
   'id' | 'created_at' | 'updated_at' | 'donation' | 'family'
>;

export function useCreateDonationToFamily(
   options?: UseMutationOptions<
      DonationToFamilyDetailResponse,
      Error,
      DonationToFamilyCreatePayload
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (payload: DonationToFamilyCreatePayload) =>
         donationToFamilyService.create(payload),
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: queryKeys.donationsToFamily.all,
         });
         queryClient.invalidateQueries({ queryKey: queryKeys.donations.all });

         if (data.data.id) {
            queryClient.setQueryData(
               queryKeys.donationsToFamily.detail(data.data.id),
               data
            );
         }

         toast.success('Doação para família registrada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao registrar doação para família: ${error.message}`);
      },
      ...options,
   });
}

export function useDonationToFamilyMutations() {
   const createDonationToFamily = useCreateDonationToFamily();

   return {
      createDonationToFamily,
   };
}
