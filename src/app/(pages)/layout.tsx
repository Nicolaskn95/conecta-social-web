import LottieAnimation from '@/components/shared/LottieAnimation';
import Page from '@/components/template/home/Page';
import { AuthProvider } from '@/data/context/AuthContext';
import { Suspense } from 'react';

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <Suspense fallback={<LottieAnimation status="loading" />}>
            <>{children}</>;
         </Suspense>
      </>
   );
}
