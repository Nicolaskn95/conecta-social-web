import {
   BaseService,
   BaseResponse,
   BaseDetailResponse,
} from './baseService';
import { ICategory } from '@/core/donation/model/IDonation';

export interface CategoryResponse extends BaseResponse<ICategory> {}
export interface CategoryDetailResponse extends BaseDetailResponse<ICategory> {}

class CategoryService extends BaseService<ICategory> {
   constructor() {
      super('categories');
   }

   async getAll(): Promise<CategoryResponse> {
      return super.getAll();
   }

   async getById(id: string): Promise<CategoryDetailResponse> {
      return super.getById(id);
   }
}

export const categoryService = new CategoryService();

