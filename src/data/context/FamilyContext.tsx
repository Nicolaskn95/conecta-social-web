'use client';
import { createContext, useState } from 'react';
import { IFamily } from '@/core/family/model/IFamily';
import { useFamilies } from '../hooks/family/useFamilyQueries';
import { useFamilyMutations } from '../hooks/family/useFamilyMutations';
import useAuth from '../hooks/useAuth';

export interface FamilyContextProps {
   search: string;
   setSearch: (search: string) => void;
   families: IFamily[];
   isLoading: boolean;
   addFamily: (family: IFamily) => void;
   updateFamily: (family: IFamily) => void;
   removeFamily: (familyId: string) => void;
   refetchFamilies: () => void;
}

const FamilyContext = createContext<FamilyContextProps>({} as any);

export function FamilyProvider(props: any) {
   const { token } = useAuth();
   const [search, setSearch] = useState<string>('');

   // Hooks do React Query
   const {
      data: familiesData,
      isLoading,
      refetch: refetchFamilies,
   } = useFamilies({ search }, { enabled: !!token });

   // Hooks de mutação
   const {
      createFamily,
      updateFamily: updateFamilyMutation,
      deleteFamily,
   } = useFamilyMutations();
   const families = familiesData?.data ?? [];
   const addFamily = (family: IFamily) => {
      createFamily.mutate(family);
   };

   const updateFamily = (updatedFamily: IFamily) => {
      if (updatedFamily.id) {
         updateFamilyMutation.mutate({
            id: updatedFamily.id,
            family: updatedFamily,
         });
      }
   };

   const removeFamily = (familyId: string) => {
      deleteFamily.mutate(familyId);
   };

   return (
      <FamilyContext.Provider
         value={{
            search,
            setSearch,
            families,
            isLoading,
            addFamily,
            updateFamily,
            removeFamily,
            refetchFamilies,
         }}
      >
         {props.children}
      </FamilyContext.Provider>
   );
}

export default FamilyContext;
