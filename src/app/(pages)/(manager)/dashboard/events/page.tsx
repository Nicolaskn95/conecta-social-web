'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { IEvent } from '@/core/event';
import { useEvents } from '@/data/hooks/useEvents';
import { useEventMutations } from '@/data/hooks/useEventMutations';
import { Status } from '@/components/shared/Status';
import { toast } from 'react-toastify';
import useAuth from '@/data/hooks/useAuth';
import { canCreateEvents, canDeleteRecords } from '@/core/auth/permissions';

function Events() {
	   const router = useRouter();
	   const { user } = useAuth();
	   const { deleteEvent } = useEventMutations();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	   const { events } = useEvents();
	   const canDelete = canDeleteRecords(user?.role);
	   const canCreate = canCreateEvents(user?.role);

   const register = () => {
      router.push('/dashboard/events/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Eventos' },
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
      { key: 'name', label: 'Nome' },
      { key: 'description', label: 'Descrição' },
      {
         key: 'date',
         label: 'Data',
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
         render: (value: string) => <Status status={value} />,
      },
   ];

   const handleEdit = (event: any) => {
      router.push(`/dashboard/events/${event.id}`);
   };

   const [selectedEvent, setSelectedEvent] = useState<any>(null);

   const handleDelete = (event: IEvent) => {
      setSelectedEvent(event);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = () => {
      deleteEvent.mutate(selectedEvent.id, {
         onSuccess: () => {
            setIsDeleteModalOpen(false);
         },
         onError: (error) => {
            console.error('Erro ao excluir evento:', error);
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
	         ? [{
	         key: 'delete',
	         label: 'Deletar',
         icon: (
            <div className="text-danger hover:text-white bg-danger_hover rounded-md p-2 hover:bg-danger">
               <TrashIcon size={24} />
            </div>
         ),
	         onClick: handleDelete,
	         className: '',
	      }]
	         : []),
	   ];

   const onSearch = (value: string) => {
      // TODO: Implement search/filter logic
   };

   return (
      <div className="min-h-full p-4 bg-gray-100 pb-8">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            {canCreate && (
               <button
                  className="btn-primary justify-center flex text-nowrap w-32 text-center"
                  onClick={register}
               >
                  Novo Evento
               </button>
            )}
         </div>
         <TableContainer
            title="Todos os Eventos"
            columns={columns}
            data={events}
            actions={actions}
            onSearch={onSearch}
            showFilters={true}
         />
         <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirmar Exclusão"
         >
            <div className="space-y-4">
               <p>
                  Tem certeza que deseja excluir o evento &quot;
                  {selectedEvent?.name}
                  &quot;?
               </p>
               <div className="flex justify-end space-x-3">
                  <button
                     onClick={() => setIsDeleteModalOpen(false)}
                     className="btn-secondary"
                     disabled={deleteEvent.isPending}
                  >
                     Cancelar
                  </button>
                  <button
                     onClick={handleDeleteConfirm}
                     className="btn-danger"
                     disabled={deleteEvent.isPending}
                  >
                     {deleteEvent.isPending ? 'Excluindo...' : 'Excluir'}
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   );
}

export default Events;
