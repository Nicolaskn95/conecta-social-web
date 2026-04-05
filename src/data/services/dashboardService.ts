import {
   DashboardPeriod,
   IDashboardOverviewResponse,
} from '@/core/dashboard/model/IDashboard';
import { BaseService } from './baseService';

class DashboardService extends BaseService<never> {
   constructor() {
      super('dashboard');
   }

   async getOverview(
      period: DashboardPeriod
   ): Promise<IDashboardOverviewResponse> {
      return this.request<IDashboardOverviewResponse>(
         `/${this.entityPath}/overview?period=${period}`
      );
   }
}

export const dashboardService = new DashboardService();
