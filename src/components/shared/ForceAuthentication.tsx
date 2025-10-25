'use client';
import useAuth from '@/data/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import LottieAnimation from './LottieAnimation';
import { useEffect, useState } from 'react';

interface ForceAuthenticationProps {
   children: React.ReactNode;
}

export default function ForceAuthentication({
   children,
}: ForceAuthenticationProps) {
   const { user, loading: authLoading } = useAuth();
   const router = useRouter();
   const path = usePathname();

   const [navigationLoading, setNavigationLoading] = useState(false);
   const [previousPath, setPreviousPath] = useState(path);

   useEffect(() => {
      if (path !== previousPath) {
         setNavigationLoading(true);
         const timer = setTimeout(() => {
            setNavigationLoading(false);
            setPreviousPath(path);
         }, 500); // Show loading for 500ms
         return () => clearTimeout(timer);
      }
   }, [path, previousPath]);

   if ((authLoading && !user?.email) || navigationLoading) {
      return <LottieAnimation status="loading" />;
   }
   if (!user?.email) {
      router.push(`/login?destination=${path}`);
      return <LottieAnimation status="loading" />;
   }

   return children;
}
