'use client';
import { IPrivateUser } from '@/core/privateUser';
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
   user: IPrivateUser | null;
}

interface AuthContextProps {
   loading: boolean;
   token: string | null;
   user: IPrivateUser | null;
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

      if (!token) {
         return { token: null, user: null };
      }

      try {
         const payload: any = jwtDecode(token);
         const isValid = payload.exp! > Date.now() / 1000;

         if (!isValid) {
            return { token: null, user: null };
         }

         return {
            token,
            user: {
               id: payload.id,
               name: payload.name,
               email: payload.email,
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
