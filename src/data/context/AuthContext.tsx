'use client';
import { IVolunteer } from '@/core/volunteer';
import {
   createContext,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { toast } from 'react-toastify';

interface AuthProviderProps {
   children: ReactNode;
}

interface Session {
   token: string | null;
   user: Partial<IVolunteer> | null;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextProps {
   status: AuthStatus;
   loading: boolean;
   token: string | null;
   user: Partial<IVolunteer> | null;
   signed: boolean;
   login: (token: string) => void;
   logout: () => void;
   router: ReturnType<typeof useRouter>;
}

const AuthContext = createContext<AuthContextProps>({} as any);
export default AuthContext;

export function AuthProvider({ children }: AuthProviderProps) {
   const cookieName = '_conectasocial_token';
   const router = useRouter();
   const pathname = usePathname();

   // Estados de autenticação
   const [loading, setLoading] = useState<boolean>(true);
   const [navigationLoading, setNavigationLoading] = useState<boolean>(false);
   const [auth, setAuth] = useState<Session>({ token: null, user: null });
   const [status, setStatus] = useState<AuthStatus>('loading');

   function login(token: string) {
      cookies.set(cookieName, token, {
         expires: 1,
         secure: process.env.NODE_ENV === 'production', // HTTPS em produção
         sameSite: 'strict', // Proteção CSRF
         path: '/', // Disponível em toda a aplicação
      });
      const session = getSession();
      setAuth(session);
      setLoading(false);
      setStatus(session.token ? 'authenticated' : 'unauthenticated');

      toast.success('Login realizado com sucesso!');
   }
   function logout() {
      cookies.remove(cookieName);
      setAuth({ token: null, user: null });
      setLoading(false);
      setStatus('unauthenticated');

      toast.success('Logout realizado com sucesso!');

      if (pathname.startsWith('/dashboard')) {
         router.push('/login');
      }
   }

   const sessionLoading = useCallback(function () {
      try {
         setLoading(true);
         const session = getSession();
         setAuth(session);
         setStatus(session.token ? 'authenticated' : 'unauthenticated');
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      sessionLoading();
   }, [sessionLoading]);

   useEffect(() => {
      if (status === 'authenticated' && auth.user) {
         const { user } = auth;

         if (pathname === '/login') {
            router.push('/dashboard');
         }
      } else if (status === 'unauthenticated') {
         if (pathname.startsWith('/dashboard')) {
            router.push(`/login?destination=${pathname}`);
         }
      }
   }, [status, auth.user, pathname, router]);

   useEffect(() => {
      const handleRouteChangeStart = () => {
         setNavigationLoading(true);
      };

      const handleRouteChangeComplete = () => {
         setNavigationLoading(false);
      };
   }, []);

   function getSession(): Session {
      const token = cookies.get(cookieName);

      if (!token) {
         return { token: null, user: null };
      }

      try {
         const payload: any = jwtDecode(token);
         const isValid = payload.exp! > Date.now() / 1000;

         if (!isValid) {
            cookies.remove(cookieName);
            toast.error('Sua sessão expirou. Faça login novamente.');
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
         cookies.remove(cookieName);
         toast.error('Erro na validação da sessão. Faça login novamente.');
         return { token: null, user: null };
      }
   }

   return (
      <AuthContext.Provider
         value={{
            status,
            loading: loading || navigationLoading,
            token: auth.token,
            user: auth.user,
            signed: status === 'authenticated' && !!auth.user,
            login,
            logout,
            router,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}
