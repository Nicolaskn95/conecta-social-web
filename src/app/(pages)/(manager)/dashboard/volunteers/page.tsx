'use client';

import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { IVolunteer } from '@/core/volunteer';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import { Status } from '@/components/shared/Status';
import useAuth from '@/data/hooks/useAuth';
import {
   canDeleteEmployees,
   canManageVolunteers,
} from '@/core/auth/permissions';
import { useEmployees } from '@/data/hooks/employee/useEmployeeQueries';
import { useEmployeeMutations } from '@/data/hooks/employee/useEmployeeMutations';

function Volunteers() {
   const router = useRouter();
   const { user } = useAuth();
   const canManage = canManageVolunteers(user?.role);
   const canDelete = canDeleteEmployees(user?.role);
   const { data, isLoading } = useEmployees(canManage);
   const { deleteEmployee } = useEmployeeMutations();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [selectedVolunteer, setSelectedVolunteer] =
      useState<IVolunteer | null>(null);

   const volunteers = data?.data ?? [];

   const register = () => {
      router.push('/dashboard/volunteers/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Voluntários' },
   ];

   const columns = [
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: Date | string) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
      {
         key: 'name',
         label: 'Nome',
         render: (_value: string, volunteer: IVolunteer) =>
            `${volunteer.name} ${volunteer.surname}`,
      },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telefone' },
      {
         key: 'role',
         label: 'Função',
         render: (value: VolunteerRole) => <Status status={value} />,
      },
      { key: 'city', label: 'Cidade' },
   ];

   const handleEdit = (volunteer: IVolunteer) => {
      router.push(`/dashboard/volunteers/${volunteer.id}`);
   };

   const handleDelete = (volunteer: IVolunteer) => {
      setSelectedVolunteer(volunteer);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      if (!selectedVolunteer?.id) return;

      deleteEmployee.mutate(selectedVolunteer.id, {
         onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSelectedVolunteer(null);
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

   const onSearch = (value: string) => {
      // A busca local será substituída por filtro de API quando o endpoint suportar search.
   };

   if (!canManage) {
      return (
         <div className="min-h-screen p-4 bg-gray-100">
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
               Você não tem permissão para gerenciar voluntários.
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary justify-center flex text-nowrap w-36 text-center px-11"
               onClick={register}
            >
               Novo Voluntário
            </button>
         </div>
         <TableContainer
            title={isLoading ? 'Carregando voluntários...' : 'Todos os Voluntários'}
            columns={columns}
            data={volunteers}
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
                  Tem certeza que deseja excluir o voluntário &quot;
                  {selectedVolunteer?.name} {selectedVolunteer?.surname}
                  &quot;?
               </p>
               <div className="flex justify-end space-x-3">
                  <button
                     onClick={() => setIsDeleteModalOpen(false)}
                     className="btn-secondary"
                     disabled={deleteEmployee.isPending}
                  >
                     Cancelar
                  </button>
                  <button
                     onClick={handleDeleteConfirm}
                     className="btn-danger"
                     disabled={deleteEmployee.isPending}
                  >
                     {deleteEmployee.isPending ? 'Excluindo...' : 'Excluir'}
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default Volunteers;
