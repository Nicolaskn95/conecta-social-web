'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HandHeartIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { IFamily } from '@/core/family/model/IFamily';
import { useFamilies as useFamiliesContext } from '@/data/hooks/family/useFamilies';
import useAuth from '@/data/hooks/useAuth';
import { canDeleteRecords } from '@/core/auth/permissions';

function Families() {
   const router = useRouter();
   const { user } = useAuth();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const { families, removeFamily } = useFamiliesContext();
   const canDelete = canDeleteRecords(user?.role);

   const register = () => {
      router.push('/dashboard/families/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias' },
   ];

   const columns = [
      { key: 'name', label: 'Nome da Família' },
      { key: 'neighborhood', label: 'Bairro' },
      { key: 'city', label: 'Cidade' },
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: string) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                 })
               : '',
      },
   ];

   const handleEdit = (family: IFamily) => {
      router.push(`/dashboard/families/${family.id}`);
   };

   const handleDonate = (family: IFamily) => {
      if (!family.id) return;
      router.push(
         `/dashboard/donations-to-family/register?familyId=${encodeURIComponent(
            family.id
         )}`
      );
   };

   const [selectedFamily, setSelectedFamily] = useState<IFamily | null>(null);

   const handleDelete = (family: IFamily) => {
      setSelectedFamily(family);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      if (selectedFamily?.id) {
         removeFamily(selectedFamily.id);
         setIsDeleteModalOpen(false);
      }
   };

   const actions = [
      {
         key: 'donate',
         label: 'Doar',
         icon: (
            <div className="rounded-md p-2 text-green-700 bg-green-100 hover:bg-green-700 hover:text-white">
               <HandHeartIcon size={24} />
            </div>
         ),
         onClick: handleDonate,
         className: '',
      },
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

   const onSearch = (value: string) => {
      // TODO: Implement search logic
   };

   return (
      <div className="min-h-full p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary justify-center flex text-nowrap w-32 text-center"
               onClick={register}
            >
               Nova Família
            </button>
         </div>
         <TableContainer
            title="Todas as Famílias"
            columns={columns}
            data={families}
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
                  Tem certeza que deseja excluir a família &quot;
                  {selectedFamily?.name}
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

export default Families;
