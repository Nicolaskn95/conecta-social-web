'use client';
import { useEvents } from '@/data/hooks/useEvents';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { eventSchema, IEvent } from '@/core/event';
import { IEventForm } from '@/core/event/model/IEvent';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import useCEP from '@/data/hooks/useCEP';
import useAPI from '@/data/hooks/useAPI';
import BasicInfoSection from './components/BasicInfoSection';
import AddressSection from './components/AddressSection';
import SocialMediaSection from './components/SocialMediaSection';

export default function EditEventPage() {
   const params = useParams();
   const router = useRouter();
   const { put } = useAPI();
   const { loadEvent, events } = useEvents();
   const [event, setEvent] = useState<IEvent | null>(null);
   const [loading, setLoading] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

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
      const fetchEvent = async () => {
         try {
            const eventData = events.find((event) => event.id === params.id);
            if (!eventData) {
               toast.error('Evento não encontrado');
               router.push('/dashboard/events');
               return;
            }
            setEvent(eventData);
            const formattedEventData: IEventForm = {
               ...eventData,
               date: eventData.date
                  ? new Date(eventData.date).toISOString().slice(0, 16)
                  : '',
            };
            reset(formattedEventData);
         } catch (error) {
            console.error('Error fetching event:', error);
            toast.error('Erro ao carregar evento');
         } finally {
            setLoading(false);
         }
      };

      fetchEvent();
   }, [params.id, loadEvent, router, events, reset]);

   useEffect(() => {
      if (cepData) {
         if (cepData.uf) setValue('uf', cepData.uf);
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
      setIsLoading(true);
      try {
         const id = Array.isArray(params.id) ? params.id[0] : params.id;
         const apiData: IEvent = {
            ...data,
            date: new Date(data.date),
         };
         await put(`/events/${id}`, apiData);
         toast.success('Evento atualizado com sucesso!');
         router.push('/dashboard/events');
         loadEvent();
      } catch (error: any) {
         toast.error(
            error?.response?.data?.message ||
               'Erro ao atualizar evento. Tente novamente.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Eventos', href: '/dashboard/events' },
      { label: event?.name || 'Editar Evento' },
   ];

   if (loading) {
      return <div>Carregando...</div>;
   }

   if (!event) {
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
                        disabled={isLoading}
                     >
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="btn-primary w-32"
                        disabled={isLoading}
                     >
                        {isLoading ? 'Salvando...' : 'Salvar'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
