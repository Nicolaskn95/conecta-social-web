import {
   useMutation,
   useQueryClient,
   UseMutationOptions,
} from '@tanstack/react-query';
import { eventService, EventDetailResponse } from '../services/eventService';
import { queryKeys } from '../query/queryKeys';
import { IEvent } from '@/core/event';
import { toast } from 'react-toastify';

// Hook para criar evento
export function useCreateEvent(
   options?: UseMutationOptions<EventDetailResponse, Error, Omit<IEvent, 'id'>>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (event: Omit<IEvent, 'id'>) =>
         eventService.createEvent(event),
      onSuccess: (data) => {
         // Invalidar queries relacionadas a eventos
         queryClient.invalidateQueries({ queryKey: queryKeys.events.all });

         // Adicionar o novo evento ao cache se tiver id
         if (data.data.id) {
            queryClient.setQueryData(
               queryKeys.events.detail(data.data.id),
               data
            );
         }

         toast.success('Evento criado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao criar evento: ${error.message}`);
      },
      ...options,
   });
}

// Hook para atualizar evento
export function useUpdateEvent(
   options?: UseMutationOptions<
      EventDetailResponse,
      Error,
      { id: string; event: Partial<IEvent> }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, event }) => eventService.updateEvent(id, event),
      onSuccess: (data, variables) => {
         // Atualizar o cache do evento específico
         queryClient.setQueryData(queryKeys.events.detail(variables.id), data);

         // Invalidar listas de eventos
         queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });

         toast.success('Evento atualizado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar evento: ${error.message}`);
      },
      ...options,
   });
}

// Hook para atualizar evento parcialmente
export function usePatchEvent(
   options?: UseMutationOptions<
      EventDetailResponse,
      Error,
      { id: string; event: Partial<IEvent> }
   >
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({ id, event }) => eventService.patchEvent(id, event),
      onSuccess: (data, variables) => {
         // Atualizar o cache do evento específico
         queryClient.setQueryData(queryKeys.events.detail(variables.id), data);

         // Invalidar listas de eventos
         queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });

         toast.success('Evento atualizado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar evento: ${error.message}`);
      },
      ...options,
   });
}

// Hook para deletar evento
export function useDeleteEvent(
   options?: UseMutationOptions<void, Error, string>
) {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: string) => eventService.deleteEvent(id),
      onSuccess: (_, id) => {
         // Remover o evento do cache
         queryClient.removeQueries({ queryKey: queryKeys.events.detail(id) });

         // Invalidar listas de eventos
         queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });

         toast.success('Evento deletado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao deletar evento: ${error.message}`);
      },
      ...options,
   });
}

// Hook combinado para operações CRUD de eventos
export function useEventMutations() {
   const createEvent = useCreateEvent();
   const updateEvent = useUpdateEvent();
   const patchEvent = usePatchEvent();
   const deleteEvent = useDeleteEvent();

   return {
      createEvent,
      updateEvent,
      patchEvent,
      deleteEvent,
   };
}
