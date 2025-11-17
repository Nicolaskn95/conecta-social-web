'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { IFamily } from '@/core/family/model/IFamily';
import { useFamilies as useFamiliesContext } from '@/data/hooks/family/useFamilies';

function Families() {
   const router = useRouter();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const { families, removeFamily } = useFamiliesContext();

   const register = () => {
      router.push('/dashboard/families/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias' },
   ];

   const columns = [
      {
         key: 'created_at',
         label: 'Data de criação',
         render: (value: string) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
      { key: 'name', label: 'Nome da Família' },
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: string) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
      { key: 'city', label: 'Cidade' },
   ];

   const handleEdit = (family: IFamily) => {
      router.push(`/dashboard/families/${family.id}`);
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
