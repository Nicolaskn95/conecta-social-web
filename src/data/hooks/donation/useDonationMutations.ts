import {
   useMutation,
   useQueryClient,
   UseMutationOptions,
} from '@tanstack/react-query';
import {
   donationService,
   DonationDetailResponse,
} from '../../services/donationService';
import { queryKeys } from '../../query/queryKeys';
import { IDonation } from '@/core/donation/model/IDonation';
import { toast } from 'react-toastify';

export function useCreateDonation(
   options?: UseMutationOptions<
      DonationDetailResponse,
      Error,
      Omit<IDonation, 'id' | 'created_at' | 'updated_at' | 'current_quantity' | 'category'>
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (donation: Omit<IDonation, 'id' | 'created_at' | 'updated_at' | 'current_quantity' | 'category'>) =>
         donationService.create(donation),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: queryKeys.donations.all });

         queryClient.invalidateQueries({
            queryKey: queryKeys.donations.lists(),
         });

         if (data.data.id) {
            queryClient.setQueryData(
               queryKeys.donations.detail(data.data.id),
               data
            );
         }

         toast.success('Doação criada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao criar doação: ${error.message}`);
      },
      ...options,
   });
}

export function useUpdateDonation(
   options?: UseMutationOptions<
      DonationDetailResponse,
      Error,
      { id: string; donation: Partial<Omit<IDonation, 'id' | 'created_at' | 'updated_at'>> }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, donation }) => donationService.update(id, donation),
      onSuccess: (data, variables) => {
         queryClient.setQueryData(
            queryKeys.donations.detail(variables.id),
            data
         );

         queryClient.invalidateQueries({
            queryKey: queryKeys.donations.lists(),
         });

         toast.success('Doação atualizada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar doação: ${error.message}`);
      },
      ...options,
   });
}

export function useDeleteDonation(
   options?: UseMutationOptions<void, Error, string>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: string) => donationService.delete(id),
      onSuccess: (_, id) => {
         queryClient.removeQueries({
            queryKey: queryKeys.donations.detail(id),
         });

         queryClient.invalidateQueries({
            queryKey: queryKeys.donations.lists(),
         });

         toast.success('Doação deletada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao deletar doação: ${error.message}`);
      },
      ...options,
   });
}

export function useDonationMutations() {
   const createDonation = useCreateDonation();
   const updateDonation = useUpdateDonation();
   const deleteDonation = useDeleteDonation();

   return {
      createDonation,
      updateDonation,
      deleteDonation,
   };
}

