import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
   DashboardPeriod,
   IDashboardOverviewResponse,
} from '@/core/dashboard/model/IDashboard';
import { dashboardService } from '@/data/services/dashboardService';
import { queryKeys } from '@/data/query/queryKeys';

export function useDashboardOverview(
   period: DashboardPeriod,
   options?: Omit<
      UseQueryOptions<IDashboardOverviewResponse>,
      'queryKey' | 'queryFn'
   >
) {
   return useQuery({
      queryKey: queryKeys.dashboard.overview(period),
      queryFn: () => dashboardService.getOverview(period),
      staleTime: 2 * 60 * 1000,
      ...options,
   });
}
