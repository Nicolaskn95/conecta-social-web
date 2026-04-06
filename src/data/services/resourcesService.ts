import {
   EVENT_STATUS_OPTIONS,
   EventStatusOption,
} from '@/core/event/model/IEvent';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import { BaseService } from './baseService';

export interface RoleOption {
   label: string;
   value: VolunteerRole;
}

export interface RolesApiResponse {
   code: number;
   success: boolean;
   message: string;
   data: {
      roles: RoleOption[];
   };
}

export interface EventStatusApiResponse {
   code: number;
   success: boolean;
   message: string;
   data: {
      status: EventStatusOption[];
   };
}

export const FALLBACK_ROLE_OPTIONS: RoleOption[] = [
   { label: 'Voluntário', value: VolunteerRole.VOLUNTEER },
   { label: 'Gerente', value: VolunteerRole.MANAGER },
   { label: 'Administrador', value: VolunteerRole.ADMIN },
];

export const FALLBACK_EVENT_STATUS_OPTIONS: EventStatusOption[] =
   EVENT_STATUS_OPTIONS;

class ResourcesService extends BaseService<never> {
   constructor() {
      super('resources');
   }

   async getRoles(): Promise<RolesApiResponse> {
      return this.request<RolesApiResponse>(`/${this.entityPath}/roles`);
   }

   async getEventStatus(): Promise<EventStatusApiResponse> {
      return this.request<EventStatusApiResponse>(
         `/${this.entityPath}/event-status`
      );
   }
}

export const resourcesService = new ResourcesService();
