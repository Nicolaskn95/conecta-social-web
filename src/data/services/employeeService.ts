import { IVolunteer, VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import { BaseDetailResponse, BaseResponse, BaseService } from './baseService';

export interface EmployeeListResponse extends BaseResponse<IVolunteer> {}
export interface EmployeeDetailResponse extends BaseDetailResponse<IVolunteer> {}

export interface EmployeePasswordPayload {
   password: string;
}

export interface OwnPasswordPayload {
   current_password: string;
   new_password: string;
}

function formatBirthDate(value: Date | string) {
   if (value instanceof Date) {
      return value.toISOString().slice(0, 10);
   }

   return value;
}

function stripUiFields(data: Partial<IVolunteer>) {
   const {
      id,
      created_at,
      updated_at,
      logs,
      uf,
      password,
      role,
      ...payload
   } = data;

   return {
      ...payload,
      birth_date: payload.birth_date
         ? formatBirthDate(payload.birth_date)
         : undefined,
   };
}

function buildCreatePayload(data: IVolunteer) {
   const payload = stripUiFields(data);

   return {
      ...payload,
      password: data.password,
      role: data.role,
   };
}

class EmployeeService extends BaseService<IVolunteer> {
   constructor() {
      super('employees');
   }

   async getEmployees(): Promise<EmployeeListResponse> {
      return this.request<EmployeeListResponse>(`/${this.entityPath}`);
   }

   async getEmployeeById(id: string): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(`/${this.entityPath}/${id}`);
   }

   async createEmployee(data: IVolunteer): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(`/${this.entityPath}`, {
         method: 'POST',
         body: JSON.stringify(buildCreatePayload(data)),
      });
   }

   async updateBasic(
      id: string,
      data: Partial<IVolunteer>
   ): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(`/${this.entityPath}/${id}/basic`, {
         method: 'PUT',
         body: JSON.stringify(stripUiFields(data)),
      });
   }

   async updateRole(
      id: string,
      role: VolunteerRole
   ): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(`/${this.entityPath}/${id}/role`, {
         method: 'PATCH',
         body: JSON.stringify({ role }),
      });
   }

   async updatePassword(
      id: string,
      data: EmployeePasswordPayload
   ): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(
         `/${this.entityPath}/${id}/password`,
         {
            method: 'PATCH',
            body: JSON.stringify(data),
         }
      );
   }

   async updateOwnProfile(
      data: Partial<IVolunteer>
   ): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(`/${this.entityPath}/me`, {
         method: 'PATCH',
         body: JSON.stringify(stripUiFields(data)),
      });
   }

   async updateOwnPassword(
      data: OwnPasswordPayload
   ): Promise<EmployeeDetailResponse> {
      return this.request<EmployeeDetailResponse>(`/${this.entityPath}/me/password`, {
         method: 'PATCH',
         body: JSON.stringify(data),
      });
   }

   async deleteEmployee(id: string): Promise<void> {
      return this.request<void>(`/${this.entityPath}/${id}`, {
         method: 'DELETE',
      });
   }
}

export const employeeService = new EmployeeService();
