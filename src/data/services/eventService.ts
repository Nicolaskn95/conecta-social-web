import { IEvent } from '@/core/event';

export interface EventFilters {
   search?: string;
   status?: string;
   limit?: number;
   offset?: number;
}

export interface EventResponse {
   data: IEvent[];
   total?: number;
   page?: number;
   limit?: number;
}

export interface EventDetailResponse {
   data: IEvent;
}

class EventService {
   private baseUrl = process.env.NEXT_PUBLIC_API_URL;

   private async request<T>(
      endpoint: string,
      options: RequestInit = {},
      noAuth = false
   ): Promise<T> {
      const url = `${this.baseUrl}${
         endpoint.startsWith('/') ? endpoint : `/${endpoint}`
      }`;

      const headers: Record<string, string> = {
         'Content-Type': 'application/json',
         ...(options.headers as Record<string, string>),
      };

      if (!noAuth) {
         // Importar dinamicamente para evitar problemas de SSR
         const cookies = await import('js-cookie');
         const token = cookies.default.get('_conectasocial_token');
         if (token) {
            headers.Authorization = `Bearer ${token}`;
         }
      }

      const response = await fetch(url, {
         ...options,
         headers,
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));

         if (response.status === 401) {
            // Redirecionar para login se não autenticado
            if (typeof window !== 'undefined') {
               const { default: cookies } = await import('js-cookie');
               cookies.remove('_conectasocial_token');
               window.location.href = '/login';
            }
            throw new Error('Unauthorized - Session expired');
         }

         throw new Error(
            errorData.message || `Erro HTTP! Status: ${response.status}`
         );
      }

      try {
         return await response.json();
      } catch {
         return {} as T;
      }
   }

   // Buscar eventos ativos (autenticado)
   async getActiveEvents(filters?: EventFilters): Promise<EventResponse> {
      const queryParams = new URLSearchParams();

      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());
      if (filters?.offset)
         queryParams.append('offset', filters.offset.toString());

      const queryString = queryParams.toString();
      const endpoint = `/events/actives${queryString ? `?${queryString}` : ''}`;

      return this.request<EventResponse>(endpoint);
   }

   // Buscar eventos públicos (não autenticado)
   async getPublicEvents(limit = 3): Promise<EventResponse> {
      return this.request<EventResponse>(
         `/events/recent-with-instagram?limit=${limit}`,
         {},
         true
      );
   }

   // Buscar evento por ID
   async getEventById(id: string): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/events/${id}`);
   }

   // Criar evento
   async createEvent(event: Omit<IEvent, 'id'>): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>('/events', {
         method: 'POST',
         body: JSON.stringify(event),
      });
   }

   // Atualizar evento
   async updateEvent(
      id: string,
      event: Partial<IEvent>
   ): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/events/${id}`, {
         method: 'PUT',
         body: JSON.stringify(event),
      });
   }

   // Atualizar evento parcialmente
   async patchEvent(
      id: string,
      event: Partial<IEvent>
   ): Promise<EventDetailResponse> {
      return this.request<EventDetailResponse>(`/events/${id}`, {
         method: 'PATCH',
         body: JSON.stringify(event),
      });
   }

   // Deletar evento
   async deleteEvent(id: string): Promise<void> {
      return this.request<void>(`/events/${id}`, {
         method: 'DELETE',
      });
   }
}

export const eventService = new EventService();
