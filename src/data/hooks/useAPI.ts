import { toast } from 'react-toastify';
import useAuth from './useAuth';

interface LoginReqBody {
   email: string;
   password: string;
}

export default function useAPI() {
   const { token } = useAuth();
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

   const buildUrl = (path: string) => {
      return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
   };

   async function get(path: string) {
      const completeUrl = buildUrl(path);

      if (!token) {
         toast.error('Token não informado');
         throw new Error('Token não informado');
      }

      try {
         const response = await fetch(completeUrl, {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message);
            throw new Error(
               errorData.message || `HTTP error! Status: ${response.status}`
            );
         }
         const text = await response.text();
         return text;
      } catch (error) {
         toast.error(
            error instanceof Error ? error.message : 'Erro desconhecido'
         );
         throw error;
      }
   }

   async function post(path: string, body: LoginReqBody) {
      const completeUrl = buildUrl(path);

      try {
         const response = await fetch(completeUrl, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
         });

         if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message);
            throw new Error(
               errorData.message || `HTTP error! Status: ${response.status}`
            );
         }

         const text = await response.text();
         return JSON.parse(text);
      } catch (error) {
         throw error;
      }
   }

   return { get, post };
}
