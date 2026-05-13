import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/data/services/employeeService';
import { queryKeys } from '@/data/query/queryKeys';

export function useEmployees(enabled = true) {
   return useQuery({
      queryKey: queryKeys.volunteers.lists(),
      queryFn: () => employeeService.getEmployees(),
      enabled,
      staleTime: 5 * 60 * 1000,
   });
}

export function useEmployeeById(id?: string, enabled = true) {
   return useQuery({
      queryKey: id ? queryKeys.volunteers.detail(id) : queryKeys.volunteers.details(),
      queryFn: () => employeeService.getEmployeeById(id!),
      enabled: enabled && !!id,
      staleTime: 5 * 60 * 1000,
   });
}
