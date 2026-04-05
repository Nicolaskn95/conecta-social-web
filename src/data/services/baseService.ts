const AUTH_COOKIE_NAME = '_conectasocial_token';

export type ApiAuthMode = 'required' | 'none';

export interface ApiRequestBehavior {
   auth?: ApiAuthMode;
   redirectOn401?: boolean;
   ignoreStatuses?: number[];
}

interface ApiErrorBody {
   message?: string;
   error?: string;
   [key: string]: unknown;
}

export class ApiRequestError extends Error {
   constructor(
      message: string,
      readonly status: number,
      readonly body: ApiErrorBody = {},
      readonly ignored = false
   ) {
      super(message);
      this.name = 'ApiRequestError';
   }
}

const DEFAULT_REQUEST_BEHAVIOR: Required<ApiRequestBehavior> = {
   auth: 'required',
   redirectOn401: true,
   ignoreStatuses: [],
};

async function getAuthToken(auth: ApiAuthMode): Promise<string | null> {
   if (auth === 'none') {
      return null;
   }

   const cookies = await import('js-cookie');
   return cookies.default.get(AUTH_COOKIE_NAME) ?? null;
}

async function clearAuthAndRedirect() {
   if (typeof window === 'undefined') {
      return;
   }

   const { default: cookies } = await import('js-cookie');
   cookies.remove(AUTH_COOKIE_NAME);
   window.location.href = '/login';
}

function getErrorMessage(errorData: ApiErrorBody, status: number) {
   return errorData.message || errorData.error || `Erro HTTP! Status: ${status}`;
}

function buildApiUrl(baseUrl: string | undefined, endpoint: string) {
   if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_API_URL não está configurada.');
   }

   return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

export async function requestJson<U>(
   baseUrl: string | undefined,
   endpoint: string,
   options: RequestInit = {},
   behavior: ApiRequestBehavior = {}
): Promise<U> {
   const resolvedBehavior: Required<ApiRequestBehavior> = {
      ...DEFAULT_REQUEST_BEHAVIOR,
      ...behavior,
      ignoreStatuses: behavior.ignoreStatuses ?? [],
   };

   const url = buildApiUrl(baseUrl, endpoint);

   const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
   };

   const token = await getAuthToken(resolvedBehavior.auth);
   if (token) {
      headers.Authorization = `Bearer ${token}`;
   }

   const response = await fetch(url, {
      ...options,
      headers,
   });

   if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as ApiErrorBody;
      const ignored = resolvedBehavior.ignoreStatuses.includes(response.status);

      if (
         response.status === 401 &&
         resolvedBehavior.redirectOn401 &&
         !ignored
      ) {
         await clearAuthAndRedirect();
      }

      throw new ApiRequestError(
         getErrorMessage(errorData, response.status),
         response.status,
         errorData,
         ignored
      );
   }

   try {
      return await response.json();
   } catch {
      return {} as U;
   }
}

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
      behavior: ApiRequestBehavior = {}
   ): Promise<U> {
      return requestJson<U>(this.baseUrl, endpoint, options, behavior);
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
