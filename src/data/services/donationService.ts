import {
   BaseService,
   BaseFilters,
   BaseResponse,
   BaseDetailResponse,
} from './baseService';
import {
   DonationCreatePayload,
   DonationStockAdjustmentPayload,
   DonationUpdatePayload,
   IDonation,
} from '@/core/donation/model/IDonation';

export interface DonationFilters extends BaseFilters {
   category_id?: string;
   available?: boolean;
}

export interface DonationResponse extends BaseResponse<IDonation> { }
export interface DonationDetailResponse extends BaseDetailResponse<IDonation> { }
export interface DonationStockAdjustmentResponse {
   adjustment: {
      id: string;
      id_donation: string;
      id_employee: string;
      delta_quantity: number;
      previous_quantity: number;
      new_quantity: number;
      reason: string;
      note?: string | null;
      created_at: string;
   };
   donation: IDonation;
}

class DonationService extends BaseService<IDonation> {
   constructor() {
      super('donations');
   }

   async getAll(filters?: DonationFilters): Promise<DonationResponse> {
      return super.getAll(filters);
   }

   async getById(id: string): Promise<DonationDetailResponse> {
      return super.getById(id);
   }

   async getAllWithStock(): Promise<DonationResponse> {
      return this.request<DonationResponse>(`/${this.entityPath}/with-stock`, {
         method: 'GET',
      });
   }

   async create(donation: DonationCreatePayload): Promise<DonationDetailResponse> {
      return super.create(donation as Omit<IDonation, 'id'>);
   }

   async update(id: string, donation: DonationUpdatePayload): Promise<DonationDetailResponse> {
      return super.update(id, donation);
   }

   async adjustStock(
      id: string,
      payload: DonationStockAdjustmentPayload
   ): Promise<DonationStockAdjustmentResponse> {
      return this.request<DonationStockAdjustmentResponse>(
         `/${this.entityPath}/${id}/stock-adjustments`,
         {
            method: 'POST',
            body: JSON.stringify(payload),
         }
      );
   }

   async delete(id: string): Promise<void> {
      return super.delete(id);
   }
}

export const donationService = new DonationService();
