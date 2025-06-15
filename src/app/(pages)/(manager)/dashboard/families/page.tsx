'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { toast } from 'react-toastify';
import { FamilyStatus, IFamily } from '@/core/family/model/IFamily';
import Status from '@/components/shared/Status';

function Families() {
   const router = useRouter();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [families, setFamilies] = useState<IFamily[]>([
      {
         id: '1',
         name: 'Família Silva',
         street: 'Rua das Flores',
         number: '123',
         neighbourhood: 'Bairro das Flores',
         city: 'São Paulo',
         uf: 'SP',
         state: 'São Paulo',
         cep: '12345-678',
         status: FamilyStatus.CANCELADO,
         active: true,
         created_at: new Date(),
      },
      {
         id: '2',
         name: 'Família Santos',
         street: 'Av. Principal',
         number: '456',
         neighbourhood: 'Bairro dos Santos',
         city: 'São Paulo',
         uf: 'SP',
         state: 'São Paulo',
         cep: '12345-678',
         status: FamilyStatus.ATIVO,
         active: true,
         created_at: new Date(),
      },
      {
         id: '3',
         name: 'Família Oliveira',
         street: 'Rua do Comércio',
         number: '789',
         neighbourhood: 'Bairro dos Oliveiras',
         city: 'São Paulo',
         uf: 'SP',
         state: 'São Paulo',
         cep: '12345-678',
         status: FamilyStatus.CANCELADO,
         active: true,
         created_at: new Date(),
      },
   ]);

   const register = () => {
      router.push('/dashboard/families/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias' },
   ];

   const columns = [
      { key: 'id', label: 'ID' },
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
      {
         key: 'status',
         label: 'Status',
         render: (value: FamilyStatus) => <Status status={value} />,
      },
   ];

   const handleEdit = (family: IFamily) => {
      router.push(`dashboard/families/${family.id}`);
   };

   const [selectedFamily, setSelectedFamily] = useState<IFamily | null>(null);

   const handleDelete = (family: IFamily) => {
      setSelectedFamily(family);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      try {
         // Mock delete operation
         setFamilies(families.filter((f) => f.id !== selectedFamily?.id));
         toast.success('Família excluída com sucesso!');
         setIsDeleteModalOpen(false);
      } catch (error) {
         toast.error('Erro ao excluir família');
         console.error('Erro ao excluir família:', error);
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
      // Mock search implementation
      console.log('Searching for:', value);
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary flex text-nowrap w-32 text-center"
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
