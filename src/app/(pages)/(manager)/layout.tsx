import ForceAuthentication from '@/components/shared/ForceAuthentication';
import { DonationProvider } from '@/data/context/DonationContext';
import { EventProvider } from '@/data/context/EventContext';
import { FamilyProvider } from '@/data/context/FamilyContext';

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ForceAuthentication>
         <EventProvider>
            <FamilyProvider>
               <DonationProvider>{children}</DonationProvider>
            </FamilyProvider>
         </EventProvider>
      </ForceAuthentication>
   );
}
