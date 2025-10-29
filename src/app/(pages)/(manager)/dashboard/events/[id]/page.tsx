'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { eventSchema, IEvent } from '@/core/event';
import { IEventForm } from '@/core/event/model/IEvent';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import useCEP from '@/data/hooks/useCEP';
import { useEventMutations } from '@/data/hooks/useEventMutations';
import { useEventById } from '@/data/hooks/useEventQueries';
import BasicInfoSection from './components/BasicInfoSection';
import AddressSection from './components/AddressSection';
import SocialMediaSection from './components/SocialMediaSection';
import LottieAnimation from '@/components/shared/LottieAnimation';

export default function EditEventPage() {
   const params = useParams();
   const router = useRouter();
   const { updateEvent } = useEventMutations();

   const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
   const { data: eventData, isLoading: loading, error } = useEventById(eventId);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
      reset,
   } = useForm<IEventForm>({
      resolver: zodResolver(eventSchema),
   });

   const {
      data: cepData,
      loading: cepLoading,
      error: cepError,
      fetchCEP,
   } = useCEP();

   const cepValue = watch('cep');

   useEffect(() => {
      if (eventData?.data) {
         const formattedEventData: IEventForm = {
            ...eventData.data,
            date: eventData.data.date
               ? new Date(eventData.data.date).toISOString().slice(0, 16)
               : '',
         };
         reset(formattedEventData);
      }
   }, [eventData, reset]);

   useEffect(() => {
      if (cepData) {
         if (cepData.localidade) setValue('city', cepData.localidade);
         if (cepData.logradouro) setValue('street', cepData.logradouro);
         if (cepData.bairro) setValue('neighborhood', cepData.bairro);
         if (cepData.complemento) setValue('complement', cepData.complemento);
         if (cepData.estado) setValue('state', cepData.estado);
      }
   }, [cepData, setValue]);

   const handleCepBlur = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
         await fetchCEP(cepValue);
      }
   };

   const handleCancel = () => {
      router.push('/dashboard/events');
   };

   const submit: SubmitHandler<IEventForm> = async (data) => {
      const apiData: IEvent = {
         ...data,
         date: new Date(data.date),
      };

      updateEvent.mutate(
         { id: eventId, event: apiData },
         {
            onSuccess: () => {
               router.push('/dashboard/events');
            },
            onError: (error) => {
               console.error('Erro ao atualizar evento:', error);
            },
         }
      );
   };

   const event = eventData?.data;
   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Eventos', href: '/dashboard/events' },
      { label: event?.name || 'Editar Evento' },
   ];

   if (loading) {
      return <LottieAnimation status="loading" />;
   }

   if (error || !event) {
      return <div>Evento não encontrado</div>;
   }

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         <div className="flex-none p-4 bg-gray-100">
            <div className="flex justify-between items-center p-2">
               <Breadcrumb items={breadcrumbItems} />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6 pb-24">
               <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  <BasicInfoSection register={register} errors={errors} />
                  <AddressSection
                     register={register}
                     errors={errors}
                     handleCepBlur={handleCepBlur}
                  />
                  <SocialMediaSection register={register} errors={errors} />

                  <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white">
                     <button
                        type="button"
                        className="btn-danger w-32 text-white"
                        onClick={handleCancel}
                        disabled={updateEvent.isPending}
                     >
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="btn-primary w-32"
                        disabled={updateEvent.isPending}
                     >
                        {updateEvent.isPending ? 'Salvando...' : 'Salvar'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
