import {
   BaseService,
   BaseFilters,
   BaseResponse,
   BaseDetailResponse,
} from './baseService';
import { IDonation } from '@/core/donation/model/IDonation';

export interface DonationFilters extends BaseFilters {
   category_id?: string;
   available?: boolean;
}

export interface DonationResponse extends BaseResponse<IDonation> { }
export interface DonationDetailResponse extends BaseDetailResponse<IDonation> { }

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

   async create(donation: Omit<IDonation, 'id' | 'created_at' | 'updated_at' | 'current_quantity' | 'category'>): Promise<DonationDetailResponse> {
      return super.create(donation as Omit<IDonation, 'id'>);
   }

   async update(id: string, donation: Partial<Omit<IDonation, 'id' | 'created_at' | 'updated_at'>>): Promise<DonationDetailResponse> {
      return super.update(id, donation);
   }

   async delete(id: string): Promise<void> {
      return super.delete(id);
   }
}

export const donationService = new DonationService();

