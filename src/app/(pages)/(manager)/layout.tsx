import ForceAuthentication from '@/components/shared/ForceAuthentication';
import Page from '@/components/template/manager/Page';
import { EventProvider } from '@/data/context/EventContext';

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ForceAuthentication>
         <EventProvider>{children}</EventProvider>
      </ForceAuthentication>
   );
}
