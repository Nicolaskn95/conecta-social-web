'use client';
import DashboardTableContainer from '@/components/Dashboard/DashboardTableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAPI from '@/data/hooks/useAPI';

function Events() {
   const router = useRouter();
   const { get } = useAPI();
   const [data, setData] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

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

   useEffect(() => {
      async function fetchEvents() {
         setLoading(true);
         try {
            const events = await get('/events');
            console.log(events);
            setData(events.data);
         } catch (error) {
            console.error('Erro ao buscar eventos:', error);
         } finally {
            setLoading(false);
         }
      }
      fetchEvents();
   }, []);

   const actions = [
      {
         key: 'edit',
         label: 'Editar',
         icon: <span className="material-icons">edit</span>,
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
            data={data}
            // loading={loading}
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
