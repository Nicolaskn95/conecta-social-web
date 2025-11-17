// Serviço base para futuras entidades
export interface BaseFilters {
   search?: string;
   status?: string;
   limit?: number;
   offset?: number;
}

export interface BaseResponse<T> {
   data: T[];
   total?: number;
   page?: number;
   limit?: number;
}

export interface BaseDetailResponse<T> {
   data: T;
}

export abstract class BaseService<
   T,
   CreateT = Omit<T, 'id'>,
   UpdateT = Partial<T>
> {
   protected baseUrl = process.env.NEXT_PUBLIC_API_URL;
   protected entityPath: string;

   constructor(entityPath: string) {
      this.entityPath = entityPath;
   }

   public async request<U>(
      endpoint: string,
      options: RequestInit = {},
      noAuth = false
   ): Promise<U> {
      const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`
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
         return {} as U;
      }
   }

   // Métodos CRUD genéricos
   async getAll(filters?: BaseFilters): Promise<BaseResponse<T>> {
      const queryParams = new URLSearchParams();

      if (filters?.search) queryParams.append('search', filters.search);
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());
      if (filters?.offset)
         queryParams.append('offset', filters.offset.toString());

      const queryString = queryParams.toString();
      const endpoint = `/${this.entityPath}${queryString ? `?${queryString}` : ''
         }`;

      return this.request<BaseResponse<T>>(endpoint);
   }

   async getById(id: string): Promise<BaseDetailResponse<T>> {
      return this.request<BaseDetailResponse<T>>(`/${this.entityPath}/${id}`);
   }

   async create(data: CreateT): Promise<BaseDetailResponse<T>> {
      return this.request<BaseDetailResponse<T>>(`/${this.entityPath}`, {
         method: 'POST',
         body: JSON.stringify(data),
      });
   }

   async update(id: string, data: UpdateT): Promise<BaseDetailResponse<T>> {
      return this.request<BaseDetailResponse<T>>(`/${this.entityPath}/${id}`, {
         method: 'PUT',
         body: JSON.stringify(data),
      });
   }

   async patch(
      id: string,
      data: Partial<UpdateT>
   ): Promise<BaseDetailResponse<T>> {
      return this.request<BaseDetailResponse<T>>(`/${this.entityPath}/${id}`, {
         method: 'PATCH',
         body: JSON.stringify(data),
      });
   }

   async delete(id: string): Promise<void> {
      return this.request<void>(`/${this.entityPath}/${id}`, {
         method: 'DELETE',
      });
   }
}
