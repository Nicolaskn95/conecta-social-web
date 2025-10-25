'use client';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/data/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const { initializeAuth, status, user, token, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);

  // Inicializa a autenticação quando o componente monta
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initializeAuth();
    }
  }, []);

  // Gerencia redirecionamentos baseados no status de autenticação
  useEffect(() => {
    // Só executa redirecionamentos quando não está carregando
    if (loading) return;

    if (status === 'authenticated' && user && token) {
      if (pathname === '/login') {
        router.push('/dashboard');
      }
    } else if (status === 'unauthenticated') {
      if (pathname.startsWith('/dashboard')) {
        router.push(`/login?destination=${pathname}`);
      }
    }
  }, [status, user, token, pathname, router, loading]);

  return <>{children}</>;
}
