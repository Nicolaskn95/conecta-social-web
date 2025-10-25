import LottieAnimation from '@/components/shared/LottieAnimation';
import Page from '@/components/template/home/Page';
import { Suspense } from 'react';

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <Suspense fallback={<LottieAnimation status="loading" />}>
            <>{children}</>
         </Suspense>
      </>
   );
}
