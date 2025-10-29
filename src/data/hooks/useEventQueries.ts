import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   eventService,
   EventFilters,
   EventResponse,
   EventDetailResponse,
} from '../services/eventService';
import { queryKeys } from '../query/queryKeys';
import { IEvent } from '@/core/event';

// Hook para buscar eventos ativos (autenticado)
export function useActiveEvents(
   filters?: EventFilters,
   options?: Omit<UseQueryOptions<EventResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.events.list(filters || {}),
      queryFn: () => eventService.getActiveEvents(filters),
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 minutos
      ...options,
   });
}

// Hook para buscar eventos públicos (não autenticado)
export function usePublicEvents(
   limit = 3,
   options?: Omit<UseQueryOptions<EventResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.events.publicWithInstagram(limit),
      queryFn: () => eventService.getPublicEvents(limit),
      enabled: true,
      staleTime: 10 * 60 * 1000, // 10 minutos
      ...options,
   });
}

// Hook para buscar evento por ID
export function useEventById(
   id: string,
   options?: Omit<UseQueryOptions<EventDetailResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.events.detail(id),
      queryFn: () => eventService.getEventById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutos
      ...options,
   });
}

// Hook para buscar eventos com filtro de busca
export function useEventsWithSearch(
   search: string,
   options?: Omit<UseQueryOptions<EventResponse>, 'queryKey' | 'queryFn'>
) {
   return useActiveEvents(
      { search },
      {
         enabled: !!search,
         ...options,
      }
   );
}

// Hook para buscar eventos com paginação
export function useEventsWithPagination(
   page = 1,
   limit = 10,
   filters?: Omit<EventFilters, 'offset' | 'limit'>,
   options?: Omit<UseQueryOptions<EventResponse>, 'queryKey' | 'queryFn'>
) {
   const offset = (page - 1) * limit;

   return useActiveEvents(
      { ...filters, limit, offset },
      {
         placeholderData: (previousData) => previousData,
         ...options,
      }
   );
}
