import Page from '@/components/template/home/Page';
import { AuthProvider } from '@/data/context/AuthContext';

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <>{children}</>;
      </>
   );
}
