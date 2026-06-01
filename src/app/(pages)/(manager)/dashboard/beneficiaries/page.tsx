'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TableContainer from '@/components/Panel/TableContainer';
import Modal from '@/components/Modal/Modal';
import useAuth from '@/data/hooks/useAuth';
import { canDeleteRecords } from '@/core/auth/permissions';
import { formatDateDDMMYYYY } from '@/utils/date';
import { IBeneficiary } from '@/core/beneficiary/model/IBeneficiary';
import { useFamilies } from '@/data/hooks/family/useFamilyQueries';
import { useBeneficiaries } from '@/data/hooks/beneficiary/useBeneficiaryQueries';
import { useBeneficiaryMutations } from '@/data/hooks/beneficiary/useBeneficiaryMutations';

function BeneficiariesPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const preselectedFamilyId = searchParams.get('familyId') ?? '';
   const { user } = useAuth();
   const canDelete = canDeleteRecords(user?.role);

   const [search, setSearch] = useState('');
   const [familyFilter, setFamilyFilter] = useState(preselectedFamilyId);
   const [disabilityFilter, setDisabilityFilter] = useState<'all' | 'yes' | 'no'>('all');
   const [includeInactive, setIncludeInactive] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [selectedBeneficiary, setSelectedBeneficiary] = useState<IBeneficiary | null>(
      null
   );

   useEffect(() => {
      if (preselectedFamilyId) {
         setFamilyFilter(preselectedFamilyId);
      }
   }, [preselectedFamilyId]);

   const filters = useMemo(() => {
      return {
         search: search.trim() || undefined,
         family_id: familyFilter || undefined,
         has_disability:
            disabilityFilter === 'all'
               ? undefined
               : disabilityFilter === 'yes',
         include_inactive: includeInactive || undefined,
      };
   }, [search, familyFilter, disabilityFilter, includeInactive]);

   const { data: beneficiariesResponse, isLoading } = useBeneficiaries(filters);
   const { data: familiesResponse } = useFamilies();
   const { deleteBeneficiary } = useBeneficiaryMutations();

   const beneficiaries = beneficiariesResponse?.data ?? [];
   const families = familiesResponse?.data ?? [];

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Beneficiários' },
   ];

   const columns = [
      {
         key: 'name',
         label: 'Nome',
         render: (_value: string, beneficiary: IBeneficiary) =>
            `${beneficiary.name} ${beneficiary.surname}`,
      },
      {
         key: 'family',
         label: 'Família',
         render: (value: IBeneficiary['family']) => value?.name ?? '-',
      },
      {
         key: 'has_disability',
         label: 'Deficiência',
         render: (value: boolean, item: IBeneficiary) =>
            value ? (
               <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                     Sim
                  </span>
                  {item.disability_details && (
                     <span className="text-xs text-gray-600">
                        {item.disability_details}
                     </span>
                  )}
               </div>
            ) : (
               <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  Não
               </span>
            ),
      },
      {
         key: 'birth_date',
         label: 'Nascimento',
         render: (value: string) => formatDateDDMMYYYY(value),
      },
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: string) => formatDateDDMMYYYY(value),
      },
   ];

   const handleRegister = () => {
      const params = new URLSearchParams();
      if (familyFilter) {
         params.set('familyId', familyFilter);
      }

      const queryString = params.toString();
      router.push(
         `/dashboard/beneficiaries/register${
            queryString ? `?${queryString}` : ''
         }`
      );
   };

   const handleEdit = (beneficiary: IBeneficiary) => {
      router.push(`/dashboard/beneficiaries/${beneficiary.id}`);
   };

   const handleDelete = (beneficiary: IBeneficiary) => {
      setSelectedBeneficiary(beneficiary);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = () => {
      if (!selectedBeneficiary?.id) {
         return;
      }

      deleteBeneficiary.mutate(selectedBeneficiary.id, {
         onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSelectedBeneficiary(null);
         },
      });
   };

   const actions = [
      {
         key: 'edit',
         label: 'Editar',
         icon: (
            <div className="rounded-md p-2 text-primary bg-tertiary hover:bg-primary hover:text-white">
               <PencilIcon size={24} />
            </div>
         ),
         onClick: handleEdit,
         className: '',
      },
      ...(canDelete
         ? [
              {
                 key: 'delete',
                 label: 'Deletar',
                 icon: (
                    <div className="text-danger hover:text-white bg-danger_hover rounded-md p-2 hover:bg-danger">
                       <TrashIcon size={24} />
                    </div>
                 ),
                 onClick: handleDelete,
                 className: '',
              },
           ]
         : []),
   ];

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary justify-center flex text-nowrap w-40 text-center"
               onClick={handleRegister}
            >
               Novo Beneficiário
            </button>
         </div>

         <div className="mb-4 rounded-2xl border border-[#4AA1D3] bg-white p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
               <div className="flex flex-col">
                  <label htmlFor="familyFilter" className="mb-1 text-sm font-semibold">
                     Família
                  </label>
                  <select
                     id="familyFilter"
                     className="input"
                     value={familyFilter}
                     onChange={(event) => setFamilyFilter(event.target.value)}
                  >
                     <option value="">Todas as famílias</option>
                     {families.map((family) => (
                        <option key={family.id} value={family.id}>
                           {family.name}
                        </option>
                     ))}
                  </select>
               </div>

               <div className="flex flex-col">
                  <label
                     htmlFor="disabilityFilter"
                     className="mb-1 text-sm font-semibold"
                  >
                     Situação de deficiência
                  </label>
                  <select
                     id="disabilityFilter"
                     className="input"
                     value={disabilityFilter}
                     onChange={(event) =>
                        setDisabilityFilter(event.target.value as 'all' | 'yes' | 'no')
                     }
                  >
                     <option value="all">Todos</option>
                     <option value="yes">Com deficiência</option>
                     <option value="no">Sem deficiência</option>
                  </select>
               </div>

               <div className="flex items-center gap-2 pt-6 md:pt-7">
                  <input
                     id="includeInactive"
                     type="checkbox"
                     checked={includeInactive}
                     onChange={(event) => setIncludeInactive(event.target.checked)}
                  />
                  <label htmlFor="includeInactive" className="text-sm font-medium">
                     Incluir inativos
                  </label>
               </div>
            </div>
         </div>

         <TableContainer
            title={
               isLoading ? 'Carregando beneficiários...' : 'Todos os Beneficiários'
            }
            columns={columns}
            data={beneficiaries}
            actions={actions}
            onSearch={setSearch}
         />

         <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirmar Exclusão"
         >
            <div className="space-y-4">
               <p>
                  Tem certeza que deseja desativar o beneficiário &quot;
                  {selectedBeneficiary?.name} {selectedBeneficiary?.surname}
                  &quot;?
               </p>
               <div className="flex justify-end space-x-3">
                  <button
                     onClick={() => setIsDeleteModalOpen(false)}
                     className="btn-secondary"
                     disabled={deleteBeneficiary.isPending}
                  >
                     Cancelar
                  </button>
                  <button
                     onClick={handleDeleteConfirm}
                     className="btn-danger"
                     disabled={deleteBeneficiary.isPending}
                  >
                     {deleteBeneficiary.isPending ? 'Desativando...' : 'Desativar'}
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default BeneficiariesPage;
