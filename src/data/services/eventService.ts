import { EventStatus, IEvent } from '@/core/event';
import {
   ApiRequestBehavior,
   ApiRequestError,
   BaseService,
} from './baseService';

export interface EventFilters {
   search?: string;
   status?: EventStatus;
   limit?: number;
   offset?: number;
   page?: number;
   size?: number;
}

export interface EventResponse {
   data: IEvent[];
   total?: number;
   page?: number;
   limit?: number;
}

export interface PaginatedEventApiResponse {
   code: number;
   success: boolean;
   message: string;
   data: {
      page: number;
      next_page: number;
      is_last_page: boolean;
      previous_page: number;
      total_pages: number;
      list: IEvent[];
   };
}

export interface EventDetailResponse {
   data: IEvent;
}

const PUBLIC_EVENT_REQUEST: ApiRequestBehavior = {
   auth: 'none',
   redirectOn401: false,
   ignoreStatuses: [404],
};

class EventService extends BaseService<IEvent> {
   constructor() {
      super('events');
   }

   private async requestPublicEvents(endpoint: string): Promise<EventResponse> {
      try {
         return await this.request<EventResponse>(
            endpoint,
            {},
            PUBLIC_EVENT_REQUEST
         );
      } catch (error) {
         if (error instanceof ApiRequestError && error.status === 404) {
            return { data: [] };
         }

         throw error;
      }
   }

   // Buscar eventos ativos (autenticado) - DEPRECATED: usar getPaginatedEvents
   async getActiveEvents(filters?: EventFilters): Promise<EventResponse> {
      const queryParams = new URLSearchParams();

      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());
      if (filters?.offset)
         queryParams.append('offset', filters.offset.toString());

      const queryString = queryParams.toString();
      const endpoint = `/${this.entityPath}/actives${
         queryString ? `?${queryString}` : ''
      }`;

      return this.request<EventResponse>(endpoint);
   }

   // Buscar eventos paginados (autenticado) - NOVA ROTA
   async getPaginatedEvents(
      page: number = 1,
      size: number = 20,
      filters?: Omit<EventFilters, 'page' | 'size' | 'limit' | 'offset'>
   ): Promise<EventResponse> {
      const queryParams = new URLSearchParams();

      queryParams.append('page', page.toString());
      queryParams.append('size', size.toString());

      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.status) queryParams.append('status', filters.status);

      const queryString = queryParams.toString();
      const endpoint = `/${this.entityPath}/paginated?${queryString}`;

      const apiResponse = await this.request<PaginatedEventApiResponse>(
         endpoint
      );

      // Transformar a resposta da API para o formato esperado
      return {
         data: apiResponse.data.list,
         total: apiResponse.data.list.length,
         page: apiResponse.data.page,
         limit: size,
      };
   }

   // Buscar eventos públicos (não autenticado)
   async getPublicEvents(limit = 3): Promise<EventResponse> {
      return this.requestPublicEvents(
         `/${this.entityPath}/recent-with-instagram?limit=${limit}`
      );
   }

   // Buscar eventos para o calendário (próximos eventos)
   async getEventsOnCalendar(limit: number = 100): Promise<EventResponse> {
      return this.requestPublicEvents(`/${this.entityPath}/upcoming?limit=${limit}`);
   }

   // Buscar evento por ID
   async getEventById(id: string): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/${this.entityPath}/${id}`);
   }

   // Criar evento
   async createEvent(event: Omit<IEvent, 'id'>): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/${this.entityPath}`, {
         method: 'POST',
         body: JSON.stringify(event),
      });
   }

   // Atualizar evento
   async updateEvent(
      id: string,
      event: Partial<IEvent>
   ): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/${this.entityPath}/${id}`, {
         method: 'PUT',
         body: JSON.stringify(event),
      });
   }

   // Atualizar evento parcialmente
   async patchEvent(
      id: string,
      event: Partial<IEvent>
   ): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/${this.entityPath}/${id}`, {
         method: 'PATCH',
         body: JSON.stringify(event),
      });
   }

   // Deletar evento
   async deleteEvent(id: string): Promise<void> {
      return this.request<void>(`/${this.entityPath}/${id}`, {
         method: 'DELETE',
      });
   }
}

export const eventService = new EventService();
