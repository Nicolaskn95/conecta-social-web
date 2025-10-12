'use client';
import useAuth from '@/data/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import LottieAnimation from './LottieAnimation';

interface ForceAuthenticationProps {
   children: React.ReactNode;
}

export default function ForceAuthentication({
   children,
}: ForceAuthenticationProps) {
   const { status, user, loading: authLoading } = useAuth();
   const router = useRouter();
   const path = usePathname();

   // Mostra loading enquanto está verificando autenticação
   if (authLoading || status === 'loading') {
      return <LottieAnimation status="loading" />;
   }

   // Redireciona para login se não estiver autenticado
   if (status === 'unauthenticated' || !user?.email) {
      router.push(`/login?destination=${path}`);
      return <LottieAnimation status="loading" />;
   }

   return children;
}
