import {
   BaseService,
   BaseFilters,
   BaseResponse,
   BaseDetailResponse,
} from './baseService';
import { IFamily } from '@/core/family/model/IFamily';

export interface FamilyFilters extends BaseFilters {
   city?: string;
   status?: string;
}

export interface FamilyResponse extends BaseResponse<IFamily> {}
export interface FamilyDetailResponse extends BaseDetailResponse<IFamily> {}

class FamilyService extends BaseService<IFamily> {
   constructor() {
      super('families');
   }

   async getActivesFamilies(): Promise<FamilyResponse> {
      return this.request<FamilyResponse>(`/${this.entityPath}`, {
         method: 'GET',
      });
   }

   async createFamily(family: IFamily): Promise<FamilyDetailResponse> {
      return this.request<FamilyDetailResponse>(`/${this.entityPath}`, {
         method: 'POST',
         body: JSON.stringify(family),
      });
   }

   async updateFamily(family: IFamily): Promise<FamilyDetailResponse> {
      return this.request<FamilyDetailResponse>(`/${this.entityPath}`, {
         method: 'PUT',
         body: JSON.stringify(family),
      });
   }

   async deleteFamily(id: string): Promise<void> {
      return this.request<void>(`/${this.entityPath}/${id}`, {
         method: 'DELETE',
      });
   }
}

export const familyService = new FamilyService();
