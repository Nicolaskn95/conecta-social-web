'use client';
import { IEmployee } from '@/core/employee';
import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthProviderProps {
   children: ReactNode;
}

interface Session {
   token: string | null;
   user: Partial<IEmployee> | null;
}

interface AuthContextProps {
   loading: boolean;
   token: string | null;
   user: Partial<IEmployee> | null;
   login: (token: string) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as any);
export default AuthContext;

export function AuthProvider({ children }: AuthProviderProps) {
   const cookieName = '_conectasocial_token';

   const [loading, setLoading] = useState<boolean>(true);
   const [auth, setAuth] = useState<Session>({ token: null, user: null });

   function login(token: string) {
      cookies.set(cookieName, token, { expires: 1 });
      const session = getSession();
      console.log('session', session);
      setAuth(session);
      setLoading(false);
   }
   function logout() {
      cookies.remove(cookieName);
      setAuth({ token: null, user: null });
      setLoading(false);
   }

   const sessionLoading = useCallback(function () {
      try {
         setLoading(true);
         const session = getSession();
         setAuth(session);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      sessionLoading();
   }, [sessionLoading]);

   function getSession(): Session {
      const token = cookies.get(cookieName);
      console.log('token', token);

      if (!token) {
         return { token: null, user: null };
      }

      try {
         const payload: any = jwtDecode(token);
         console.log('payload', payload);
         const isValid = payload.exp! > Date.now() / 1000;

         if (!isValid) {
            return { token: null, user: null };
         }

         return {
            token,
            user: {
               id: payload.sub,
               email: payload.email,
               name: payload.name,
               surname: payload.surname,
            },
         };
      } catch (error) {
         return { token: null, user: null };
      }
   }

   return (
      <AuthContext.Provider
         value={{
            loading,
            token: auth.token,
            user: auth.user,
            login,
            logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}
