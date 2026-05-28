import {
   BaseDetailResponse,
   BaseResponse,
   BaseService,
} from './baseService';
import { IDonationToFamily } from '@/core/donation/model/IDonationToFamily';

export interface DonationToFamilyResponse extends BaseResponse<IDonationToFamily> {}
export interface DonationToFamilyDetailResponse
   extends BaseDetailResponse<IDonationToFamily> {}

class DonationToFamilyService extends BaseService<IDonationToFamily> {
   constructor() {
      super('donations-to-family');
   }

   async getAll(): Promise<DonationToFamilyResponse> {
      return super.getAll();
   }

   async getById(id: string): Promise<DonationToFamilyDetailResponse> {
      return super.getById(id);
   }

   async create(
      payload: Omit<
         IDonationToFamily,
         'id' | 'created_at' | 'updated_at' | 'donation' | 'family'
      >
   ): Promise<DonationToFamilyDetailResponse> {
      return super.create(payload as Omit<IDonationToFamily, 'id'>);
   }
}

export const donationToFamilyService = new DonationToFamilyService();
