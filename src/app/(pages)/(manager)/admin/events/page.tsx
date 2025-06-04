'use client';
import DashboardTableContainer from '@/components/Dashboard/DashboardTableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAPI from '@/data/hooks/useAPI';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { toast } from 'react-toastify';
import { IEvent } from '@/core/event';
import { useEvents } from '@/data/hooks/useEvents';

function Events() {
   const router = useRouter();
   const { del } = useAPI();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const { events, loadEvent } = useEvents();

   const register = () => {
      router.push('/admin/events/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/admin' },
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
   ];

   const handleEdit = (event: any) => {
      router.push(`/admin/events/${event.id}`);
   };

   const [selectedEvent, setSelectedEvent] = useState<any>(null);

   const handleDelete = (event: IEvent) => {
      setSelectedEvent(event);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      try {
         await del(`/events/${selectedEvent.id}`);
         toast.success('Evento excluído com sucesso!');
         setIsDeleteModalOpen(false);
         // Update the events list by filtering out the deleted event
         loadEvent();
      } catch (error) {
         toast.error('Erro ao excluir evento');
         console.error('Erro ao excluir evento:', error);
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
      // Optionally implement search/filter logic here
      // For now, just log
      console.log(value);
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary flex text-nowrap w-32 text-center"
               onClick={register}
            >
               Novo Evento
            </button>
         </div>
         <DashboardTableContainer
            title="Todos os Eventos"
            columns={columns}
            data={events}
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
                  Tem certeza que deseja excluir o evento "{selectedEvent?.name}
                  "?
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

export default Events;
