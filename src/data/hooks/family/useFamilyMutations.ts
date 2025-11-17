import {
   useMutation,
   useQueryClient,
   UseMutationOptions,
} from '@tanstack/react-query';
import {
   familyService,
   FamilyDetailResponse,
} from '../../services/familyService';
import { queryKeys } from '../../query/queryKeys';
import { IFamily } from '@/core/family/model/IFamily';
import { toast } from 'react-toastify';

export function useCreateFamily(
   options?: UseMutationOptions<
      FamilyDetailResponse,
      Error,
      Omit<IFamily, 'id'>
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (family: Omit<IFamily, 'id'>) =>
         familyService.create(family),
      onSuccess: (data) => {
         // Invalidar todas as queries de famílias
         queryClient.invalidateQueries({ queryKey: queryKeys.families.all });

         // Invalidar especificamente as listas de famílias
         queryClient.invalidateQueries({
            queryKey: queryKeys.families.lists(),
         });

         // Adicionar a nova família ao cache se tiver id
         if (data.data.id) {
            queryClient.setQueryData(
               queryKeys.families.detail(data.data.id),
               data
            );
         }

         toast.success('Família criada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao criar família: ${error.message}`);
      },
      ...options,
   });
}

export function useUpdateFamily(
   options?: UseMutationOptions<
      FamilyDetailResponse,
      Error,
      { id: string; family: Partial<IFamily> }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, family }) => familyService.update(id, family),
      onSuccess: (data, variables) => {
         queryClient.setQueryData(
            queryKeys.families.detail(variables.id),
            data
         );

         queryClient.invalidateQueries({
            queryKey: queryKeys.families.lists(),
         });

         toast.success('Família atualizada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar família: ${error.message}`);
      },
      ...options,
   });
}

export function useDeleteFamily(
   options?: UseMutationOptions<void, Error, string>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: string) => familyService.delete(id),
      onSuccess: (_, id) => {
         queryClient.removeQueries({
            queryKey: queryKeys.families.detail(id),
         });

         queryClient.invalidateQueries({
            queryKey: queryKeys.families.lists(),
         });

         toast.success('Família deletada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao deletar família: ${error.message}`);
      },
      ...options,
   });
}

export function useFamilyMutations() {
   const createFamily = useCreateFamily();
   const updateFamily = useUpdateFamily();
   const deleteFamily = useDeleteFamily();

   return {
      createFamily,
      updateFamily,
      deleteFamily,
   };
}

