'use client';
import DashboardTableContainer from '@/components/Dashboard/DashboardTableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React from 'react';

function Events() {
   const router = useRouter();
   const register = () => {
      router.push('/admin/events/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/admin' },
      { label: 'Eventos' },
   ];

   const columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nome' },
      { key: 'description', label: 'Descrição' },
      { key: 'date', label: 'Data' },
   ];
   const data = [
      {
         id: 1,
         name: 'Evento 1',
         description: 'Descrição do evento 1',
         date: '2021-01-01',
      },
      {
         id: 2,
         name: 'Evento 2',
         description: 'Descrição do evento 2',
         date: '2021-01-02',
      },
   ];
   const actions = [
      {
         key: 'edit',
         label: 'Editar',
         icon: <span className="material-icons">edit</span>,
      },
   ];
   const onSearch = (value: string) => {
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
            data={data}
            actions={actions.map((action) => ({
               ...action,
               onClick: () => {}, // placeholder, replace with actual handler
               className: '',
            }))}
            onSearch={onSearch}
         />
      </div>
   );
}

export default Events;
