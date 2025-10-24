import { create } from 'zustand';
import { IVolunteer } from '@/core/volunteer';
import cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { toast } from 'react-toastify';

interface Session {
  token: string | null;
  user: Partial<IVolunteer> | null;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  loading: boolean;
  token: string | null;
  user: Partial<IVolunteer> | null;
  signed: boolean;
  navigationLoading: boolean;
}

interface AuthActions {
  login: (token: string) => void;
  logout: () => void;
  setNavigationLoading: (loading: boolean) => void;
  initializeAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

const cookieName = '_conectasocial_token';

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

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Estado inicial
  status: 'loading',
  loading: true,
  token: null,
  user: null,
  signed: false,
  navigationLoading: false,

  // Ações
  login: (token: string) => {
    cookies.set(cookieName, token, {
      expires: 1,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    
    const session = getSession();
    
    set({
      token: session.token,
      user: session.user,
      status: session.token ? 'authenticated' : 'unauthenticated',
      signed: !!session.token && !!session.user,
      loading: false,
    });

    toast.success('Login realizado com sucesso!');
  },

  logout: () => {
    cookies.remove(cookieName);
    
    set({
      token: null,
      user: null,
      status: 'unauthenticated',
      signed: false,
      loading: false,
    });

    toast.success('Logout realizado com sucesso!');
  },

  setNavigationLoading: (loading: boolean) => {
    set({ navigationLoading: loading });
  },

  initializeAuth: () => {
    set({ loading: true });
    
    try {
      const session = getSession();
      
      set({
        token: session.token,
        user: session.user,
        status: session.token ? 'authenticated' : 'unauthenticated',
        signed: !!session.token && !!session.user,
        loading: false,
      });
    } catch (error) {
      set({
        token: null,
        user: null,
        status: 'unauthenticated',
        signed: false,
        loading: false,
      });
    }
  },
}));