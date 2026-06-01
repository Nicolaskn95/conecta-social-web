import {
   BaseDetailResponse,
   BaseResponse,
   BaseService,
} from '@/data/services/baseService';
import {
   BeneficiaryCreatePayload,
   BeneficiaryUpdatePayload,
   IBeneficiary,
} from '@/core/beneficiary/model/IBeneficiary';

export interface BeneficiaryFilters {
   family_id?: string;
   has_disability?: boolean;
   search?: string;
   include_inactive?: boolean;
}

export interface BeneficiaryResponse extends BaseResponse<IBeneficiary> {}
export interface BeneficiaryDetailResponse
   extends BaseDetailResponse<IBeneficiary> {}

export interface DisabilitySuggestionsResponse
   extends BaseDetailResponse<string[]> {}

class BeneficiaryService extends BaseService<
   IBeneficiary,
   BeneficiaryCreatePayload,
   BeneficiaryUpdatePayload
> {
   constructor() {
      super('beneficiaries');
   }

   async getAll(filters?: BeneficiaryFilters): Promise<BeneficiaryResponse> {
      const queryParams = new URLSearchParams();

      if (filters?.family_id) {
         queryParams.append('family_id', filters.family_id);
      }

      if (filters?.has_disability !== undefined) {
         queryParams.append('has_disability', String(filters.has_disability));
      }

      if (filters?.search) {
         queryParams.append('search', filters.search);
      }

      if (filters?.include_inactive) {
         queryParams.append('include_inactive', 'true');
      }

      const queryString = queryParams.toString();
      const endpoint = `/${this.entityPath}${queryString ? `?${queryString}` : ''}`;

      return this.request<BeneficiaryResponse>(endpoint, {
         method: 'GET',
      });
   }

   async getById(id: string): Promise<BeneficiaryDetailResponse> {
      return super.getById(id);
   }

   async create(
      payload: BeneficiaryCreatePayload
   ): Promise<BeneficiaryDetailResponse> {
      return super.create(payload);
   }

   async update(
      id: string,
      payload: BeneficiaryUpdatePayload
   ): Promise<BeneficiaryDetailResponse> {
      return super.update(id, payload);
   }

   async delete(id: string): Promise<void> {
      return super.delete(id);
   }

   async getDisabilitySuggestions(
      search?: string,
      limit = 10
   ): Promise<DisabilitySuggestionsResponse> {
      const queryParams = new URLSearchParams();

      if (search?.trim()) {
         queryParams.append('search', search.trim());
      }

      queryParams.append('limit', String(limit));

      return this.request<DisabilitySuggestionsResponse>(
         `/${this.entityPath}/disability-suggestions?${queryParams.toString()}`,
         {
            method: 'GET',
         }
      );
   }
}

export const beneficiaryService = new BeneficiaryService();
