'use client';
import { createContext, useState } from 'react';
import { IDonation } from '@/core/donation/model/IDonation';
import { useDonations } from '../hooks/donation/useDonationQueries';
import { useDonationMutations } from '../hooks/donation/useDonationMutations';
import useAuth from '../hooks/useAuth';

export interface DonationContextProps {
   search: string;
   setSearch: (search: string) => void;
   donations: IDonation[];
   isLoading: boolean;
   addDonation: (donation: IDonation) => void;
   updateDonation: (donation: IDonation) => void;
   removeDonation: (donationId: string) => void;
   refetchDonations: () => void;
}

const DonationContext = createContext<DonationContextProps>({} as any);

export function DonationProvider(props: any) {
   const { token } = useAuth();
   const [search, setSearch] = useState<string>('');

   // Hooks do React Query
   const {
      data: donationsData,
      isLoading,
      refetch: refetchDonations,
   } = useDonations({ search }, { enabled: !!token });

   // Hooks de mutação
   const {
      createDonation,
      updateDonation: updateDonationMutation,
      deleteDonation,
   } = useDonationMutations();

   const donations = donationsData?.data ?? [];

   const addDonation = (donation: IDonation) => {
      const {
         id,
         created_at,
         updated_at,
         category,
         current_quantity,
         ...donationData
      } = donation;
      createDonation.mutate(donationData);
   };

   const updateDonation = (updatedDonation: IDonation) => {
      if (updatedDonation.id) {
         const { id, created_at, updated_at, category, ...donationData } =
            updatedDonation;
         updateDonationMutation.mutate({
            id: updatedDonation.id,
            donation: donationData,
         });
      }
   };

   const removeDonation = (donationId: string) => {
      deleteDonation.mutate(donationId);
   };

   return (
      <DonationContext.Provider
         value={{
            search,
            setSearch,
            donations,
            isLoading,
            addDonation,
            updateDonation,
            removeDonation,
            refetchDonations,
         }}
      >
         {props.children}
      </DonationContext.Provider>
   );
}

export default DonationContext;
