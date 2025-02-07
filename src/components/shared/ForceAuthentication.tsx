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
   const { user, loading } = useAuth();
   const router = useRouter();
   const path = usePathname();

   if (loading && !user?.email) {
      console.log(loading);
      console.log(user?.email);
      return <LottieAnimation status="loading" />;
   }
   if (!user?.email) {
      router.push(`/login?destination=${path}`);
      return <LottieAnimation status="loading" />;
   }

   return children;
}
