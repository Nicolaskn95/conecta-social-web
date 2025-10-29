import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import cookies from 'js-cookie';

interface ApiOptions {
   headers?: Record<string, string>;
   noAuth?: boolean;
}

export default function useAPI() {
   const router = useRouter();
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const cookieName = '_conectasocial_token';

   // Função para obter token do cookie sem depender do useAuth
   const getToken = () => {
      return cookies.get(cookieName);
   };

   // Função para logout sem depender do useAuth
   const handleLogout = () => {
      cookies.remove(cookieName);
      router.push('/login');
   };

   const buildUrl = (path: string) => {
      return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
   };

   const buildHeaders = (options?: ApiOptions) => {
      const headers: HeadersInit = {
         'Content-Type': 'application/json',
         ...options?.headers,
      };

      if (!options?.noAuth) {
         const token = getToken();
         if (token) {
            headers.Authorization = `Bearer ${token}`;
         }
      }

      return headers;
   };

   async function handleResponse<T>(response: Response): Promise<T> {
      if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));

         if (response.status === 401) {
            handleLogout();
            toast.error('Sua sessão expirou. Faça login novamente.');
            throw new Error('Unauthorized - Session expired');
         }

         // Toast removido para evitar conflito com React Query
         // toast.error(
         //    errorData.message || `Erro HTTP! Status: ${response.status}`
         // );
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

   // CREATE
   async function post<T = any, U = any>(
      path: string,
      body: U,
      options?: ApiOptions
   ): Promise<T> {
      const completeUrl = buildUrl(path);

      try {
         const response = await fetch(completeUrl, {
            method: 'POST',
            headers: buildHeaders(options),
            body: JSON.stringify(body),
         });

         return handleResponse<T>(response);
      } catch (error) {
         toast.error(
            error instanceof Error ? error.message : 'Erro desconhecido'
         );
         throw error;
      }
   }

   // READ
   async function get<T = any>(path: string, options?: ApiOptions): Promise<T> {
      const completeUrl = buildUrl(path);

      try {
         const response = await fetch(completeUrl, {
            method: 'GET',
            headers: buildHeaders(options),
         });

         return handleResponse<T>(response);
      } catch (error) {
         toast.error(
            error instanceof Error ? error.message : 'Erro desconhecido'
         );
         throw error;
      }
   }

   // UPDATE
   async function put<T = any, U = any>(
      path: string,
      body: U,
      options?: ApiOptions
   ): Promise<T> {
      const completeUrl = buildUrl(path);

      try {
         const response = await fetch(completeUrl, {
            method: 'PUT',
            headers: buildHeaders(options),
            body: JSON.stringify(body),
         });

         return handleResponse<T>(response);
      } catch (error) {
         toast.error(
            error instanceof Error ? error.message : 'Erro desconhecido'
         );
         throw error;
      }
   }

   async function patch<T = any, U = any>(
      path: string,
      body: Partial<U>,
      options?: ApiOptions
   ): Promise<T> {
      const completeUrl = buildUrl(path);

      try {
         const response = await fetch(completeUrl, {
            method: 'PATCH',
            headers: buildHeaders(options),
            body: JSON.stringify(body),
         });

         return handleResponse<T>(response);
      } catch (error) {
         toast.error(
            error instanceof Error ? error.message : 'Erro desconhecido'
         );
         throw error;
      }
   }

   // DELETE
   async function del<T = any>(path: string, options?: ApiOptions): Promise<T> {
      const completeUrl = buildUrl(path);

      try {
         const response = await fetch(completeUrl, {
            method: 'DELETE',
            headers: buildHeaders(options),
         });

         return handleResponse<T>(response);
      } catch (error) {
         toast.error(
            error instanceof Error ? error.message : 'Erro desconhecido'
         );
         throw error;
      }
   }

   return {
      get, // Read
      post, // Create
      put, // Update (completo)
      patch, // Update (parcial)
      del, // Delete
   };
}
