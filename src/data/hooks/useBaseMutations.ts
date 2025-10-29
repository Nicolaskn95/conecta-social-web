import {
   useMutation,
   useQueryClient,
   UseMutationOptions,
} from '@tanstack/react-query';
import { BaseDetailResponse } from '../services/baseService';
import { toast } from 'react-toastify';

// Hook genérico para criar entidade
export function useBaseCreate<T extends { id: string }, CreateT>(
   queryKey: readonly string[],
   mutationFn: (data: CreateT) => Promise<BaseDetailResponse<T>>,
   options?: UseMutationOptions<BaseDetailResponse<T>, Error, CreateT>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn,
      onSuccess: (data) => {
         // Invalidar queries relacionadas à entidade
         queryClient.invalidateQueries({ queryKey });

         // Adicionar a nova entidade ao cache
         queryClient.setQueryData([...queryKey, 'detail', data.data.id], data);

         toast.success('Item criado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao criar item: ${error.message}`);
      },
      ...options,
   });
}

// Hook genérico para atualizar entidade
export function useBaseUpdate<T extends { id: string }, UpdateT>(
   queryKey: readonly string[],
   mutationFn: (id: string, data: UpdateT) => Promise<BaseDetailResponse<T>>,
   options?: UseMutationOptions<
      BaseDetailResponse<T>,
      Error,
      { id: string; data: UpdateT }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, data }) => mutationFn(id, data),
      onSuccess: (data, variables) => {
         // Atualizar o cache da entidade específica
         queryClient.setQueryData([...queryKey, 'detail', variables.id], data);

         // Invalidar listas da entidade
         queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] });

         toast.success('Item atualizado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar item: ${error.message}`);
      },
      ...options,
   });
}

// Hook genérico para atualizar entidade parcialmente
export function useBasePatch<T extends { id: string }, UpdateT>(
   queryKey: readonly string[],
   mutationFn: (
      id: string,
      data: Partial<UpdateT>
   ) => Promise<BaseDetailResponse<T>>,
   options?: UseMutationOptions<
      BaseDetailResponse<T>,
      Error,
      { id: string; data: Partial<UpdateT> }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, data }) => mutationFn(id, data),
      onSuccess: (data, variables) => {
         // Atualizar o cache da entidade específica
         queryClient.setQueryData([...queryKey, 'detail', variables.id], data);

         // Invalidar listas da entidade
         queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] });

         toast.success('Item atualizado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar item: ${error.message}`);
      },
      ...options,
   });
}

// Hook genérico para deletar entidade
export function useBaseDelete<T>(
   queryKey: readonly string[],
   mutationFn: (id: string) => Promise<void>,
   options?: UseMutationOptions<void, Error, string>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn,
      onSuccess: (_, id) => {
         // Remover a entidade do cache
         queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] });

         // Invalidar listas da entidade
         queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] });

         toast.success('Item deletado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao deletar item: ${error.message}`);
      },
      ...options,
   });
}

// Hook combinado para operações CRUD genéricas
export function useBaseMutations<T extends { id: string }, CreateT, UpdateT>(
   queryKey: readonly string[],
   createFn: (data: CreateT) => Promise<BaseDetailResponse<T>>,
   updateFn: (id: string, data: UpdateT) => Promise<BaseDetailResponse<T>>,
   patchFn: (
      id: string,
      data: Partial<UpdateT>
   ) => Promise<BaseDetailResponse<T>>,
   deleteFn: (id: string) => Promise<void>
) {
   const create = useBaseCreate(queryKey, createFn);
   const update = useBaseUpdate(queryKey, updateFn);
   const patch = useBasePatch(queryKey, patchFn);
   const deleteItem = useBaseDelete(queryKey, deleteFn);

   return {
      create,
      update,
      patch,
      delete: deleteItem,
   };
}
