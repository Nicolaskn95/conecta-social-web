import {
   UseMutationOptions,
   useMutation,
   useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
   beneficiaryService,
   BeneficiaryDetailResponse,
} from '@/data/services/beneficiaryService';
import {
   BeneficiaryCreatePayload,
   BeneficiaryUpdatePayload,
} from '@/core/beneficiary/model/IBeneficiary';
import { queryKeys } from '@/data/query/queryKeys';

export function useCreateBeneficiary(
   options?: UseMutationOptions<
      BeneficiaryDetailResponse,
      Error,
      BeneficiaryCreatePayload
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (payload: BeneficiaryCreatePayload) =>
         beneficiaryService.create(payload),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: queryKeys.beneficiaries.all });

         if (data.data.id) {
            queryClient.setQueryData(
               queryKeys.beneficiaries.detail(data.data.id),
               data
            );
         }

         toast.success('Beneficiário criado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao criar beneficiário: ${error.message}`);
      },
      ...options,
   });
}

export function useUpdateBeneficiary(
   options?: UseMutationOptions<
      BeneficiaryDetailResponse,
      Error,
      { id: string; beneficiary: BeneficiaryUpdatePayload }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, beneficiary }) => beneficiaryService.update(id, beneficiary),
      onSuccess: (data, variables) => {
         queryClient.setQueryData(
            queryKeys.beneficiaries.detail(variables.id),
            data
         );

         queryClient.invalidateQueries({ queryKey: queryKeys.beneficiaries.lists() });

         toast.success('Beneficiário atualizado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar beneficiário: ${error.message}`);
      },
      ...options,
   });
}

export function useDeleteBeneficiary(
   options?: UseMutationOptions<void, Error, string>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: string) => beneficiaryService.delete(id),
      onSuccess: (_, id) => {
         queryClient.removeQueries({ queryKey: queryKeys.beneficiaries.detail(id) });
         queryClient.invalidateQueries({ queryKey: queryKeys.beneficiaries.lists() });
         toast.success('Beneficiário desativado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao desativar beneficiário: ${error.message}`);
      },
      ...options,
   });
}

export function useBeneficiaryMutations() {
   const createBeneficiary = useCreateBeneficiary();
   const updateBeneficiary = useUpdateBeneficiary();
   const deleteBeneficiary = useDeleteBeneficiary();

   return {
      createBeneficiary,
      updateBeneficiary,
      deleteBeneficiary,
   };
}
