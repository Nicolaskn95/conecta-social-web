import {
   BaseService,
   BaseFilters,
   BaseResponse,
   BaseDetailResponse,
} from './baseService';

// Tipo temporário para famílias - substitua pela interface real quando disponível
interface IFamily {
   id: string;
   name: string;
   // Adicione outros campos conforme necessário
}

export interface FamilyFilters extends BaseFilters {
   // Filtros específicos para famílias
   incomeRange?: string;
   childrenCount?: number;
   city?: string;
}

export interface FamilyResponse extends BaseResponse<IFamily> {}
export interface FamilyDetailResponse extends BaseDetailResponse<IFamily> {}

class FamilyService extends BaseService<IFamily> {
   constructor() {
      super('families');
   }

   // Métodos específicos para famílias
   async getByStatus(status: string): Promise<FamilyResponse> {
      return this.request<FamilyResponse>(
         `/${this.entityPath}/status/${status}`
      );
   }

   async getByCity(city: string): Promise<FamilyResponse> {
      return this.request<FamilyResponse>(`/${this.entityPath}/city/${city}`);
   }

   async getByIncomeRange(min: number, max: number): Promise<FamilyResponse> {
      return this.request<FamilyResponse>(
         `/${this.entityPath}/income?min=${min}&max=${max}`
      );
   }
}

export const familyService = new FamilyService();
