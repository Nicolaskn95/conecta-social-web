import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { queryKeys } from '../query/queryKeys';
import {
   EventStatusApiResponse,
   FALLBACK_EVENT_STATUS_OPTIONS,
   FALLBACK_ROLE_OPTIONS,
   resourcesService,
   RoleOption,
   RolesApiResponse,
} from '../services/resourcesService';
import { EventStatusOption } from '@/core/event/model/IEvent';

export function useRolesResources(
   options?: Omit<UseQueryOptions<RolesApiResponse>, 'queryKey' | 'queryFn'>
) {
   return useQuery({
      queryKey: queryKeys.resources.roles(),
      queryFn: () => resourcesService.getRoles(),
      staleTime: 30 * 60 * 1000,
      ...options,
   });
}

export function useEventStatusResources(
   options?: Omit<
      UseQueryOptions<EventStatusApiResponse>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: queryKeys.resources.eventStatus(),
      queryFn: () => resourcesService.getEventStatus(),
      staleTime: 30 * 60 * 1000,
      ...options,
   });
}

export function useRoleOptions(
   queryOptions?: Omit<UseQueryOptions<RolesApiResponse>, 'queryKey' | 'queryFn'>
): {
   options: RoleOption[];
   isLoading: boolean;
   isError: boolean;
} {
   const { data, isLoading, isError } = useRolesResources(queryOptions);
   const roleOptions = data?.data?.roles?.length
      ? data.data.roles
      : FALLBACK_ROLE_OPTIONS;

   return { options: roleOptions, isLoading, isError };
}

export function useEventStatusOptions(): {
   options: EventStatusOption[];
   isLoading: boolean;
   isError: boolean;
} {
   const { data, isLoading, isError } = useEventStatusResources();
   const options = data?.data?.status?.length
      ? data.data.status
      : FALLBACK_EVENT_STATUS_OPTIONS;

   return { options, isLoading, isError };
}
