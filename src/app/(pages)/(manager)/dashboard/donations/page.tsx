'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { IDonation } from '@/core/donation/model/IDonation';
import Status from '@/components/shared/Status';
import { useDonations } from '@/data/hooks/donation/useDonations';

function Donations() {
   const router = useRouter();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const { donations, removeDonation } = useDonations();
   const [selectedDonation, setSelectedDonation] = useState<IDonation | null>(
      null
   );

   const register = () => {
      router.push('/dashboard/donations/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações' },
   ];

   const columns = [
      { key: 'name', label: 'Nome' },
      {
         key: 'category',
         label: 'Categoria',
         render: (value: IDonation['category']) => 
            value ? <Status status={value.name as any} /> : '-',
      },
      { key: 'donator_name', label: 'Doador' },
      {
         key: 'current_quantity',
         label: 'Quantidade Atual',
         render: (value: number | null) => value?.toString() || '0',
      },
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: Date | null) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
   ];

   const handleEdit = (donation: IDonation) => {
      router.push(`/dashboard/donations/${donation.id}`);
   };

   const handleDelete = (donation: IDonation) => {
      setSelectedDonation(donation);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      if (selectedDonation?.id) {
         removeDonation(selectedDonation.id);
         setIsDeleteModalOpen(false);
         setSelectedDonation(null);
      }
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
   ];

   const onSearch = (value: string) => {
      // TODO: Implement search logic
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary justify-center flex text-nowrap w-32 text-center"
               onClick={register}
            >
               Nova Doação
            </button>
         </div>
         <TableContainer
            title="Todas as Doações"
            columns={columns}
            data={donations}
            actions={actions}
            onSearch={onSearch}
         />
         <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirmar Exclusão"
         >
            <div className="space-y-4">
               <p>
                  Tem certeza que deseja excluir a doação &quot;
                  {selectedDonation?.name}
                  &quot;?
               </p>
               <div className="flex justify-end space-x-3">
                  <button
                     onClick={() => setIsDeleteModalOpen(false)}
                     className="btn-secondary"
                  >
                     Cancelar
                  </button>
                  <button onClick={handleDeleteConfirm} className="btn-danger">
                     Excluir
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default Donations;
