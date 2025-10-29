'use client';

import { eventSchema, IEvent } from '@/core/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb';
import useCEP from '@/data/hooks/useCEP';
import { useEventMutations } from '@/data/hooks/useEventMutations';

function Register() {
   const router = useRouter();
   const { createEvent } = useEventMutations();

   // useCEP hook
   const {
      data: cepData,
      loading: cepLoading,
      error: cepError,
      fetchCEP,
   } = useCEP();

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Eventos', href: '/dashboard/events' },
      { label: 'Cadastro', href: '/dashboard/events/register' },
   ];

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
   } = useForm<IEvent>({
      resolver: zodResolver(eventSchema),
   });

   const cepValue = watch('cep');

   const handleCepBlur = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
         await fetchCEP(cepValue);
      }
   };

   React.useEffect(() => {
      if (cepData) {
         if (cepData.localidade) setValue('city', cepData.localidade);
         if (cepData.logradouro) setValue('street', cepData.logradouro);
         if (cepData.bairro) setValue('neighborhood', cepData.bairro);
         if (cepData.complemento) setValue('complement', cepData.complemento);
         if (cepData.estado) setValue('state', cepData.estado);
      }
   }, [cepData, setValue]);

   const handleCancel = () => {
      router.push('/dashboard/events');
   };

   const submit: SubmitHandler<IEvent> = async (data) => {
      // Converter data de string para Date se necessário
      const eventData = {
         ...data,
         date: new Date(data.date),
      };

      createEvent.mutate(eventData, {
         onSuccess: () => {
            router.push('/dashboard/events');
         },
         onError: (error) => {
            console.error('Erro ao criar evento:', error);
         },
      });
   };

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         {/* Fixed header with breadcrumb */}
         <div className="flex-none p-4 bg-gray-100">
            <div className="flex justify-between items-center p-2">
               <Breadcrumb items={breadcrumbItems} />
            </div>
         </div>

         {/* Scrollable content */}
         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6 pb-24">
               <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Informações Básicas
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="titulo"
                              className="font-semibold mb-1"
                           >
                              Título do evento{' '}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="titulo"
                              className="input"
                              placeholder="Informe o título do evento"
                              {...register('name')}
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm">
                                 {errors.name.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="data" className="font-semibold mb-1">
                              Data do Evento{' '}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="datetime-local"
                              id="data"
                              className="input"
                              {...register('date')}
                           />
                           {errors.date && (
                              <p className="text-red-500 text-sm">
                                 {errors.date.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="capacidade"
                              className="font-semibold mb-1"
                           >
                              Capacidade de Participantes
                           </label>
                           <input
                              type="number"
                              id="capacidade"
                              className="input"
                              placeholder="Número máximo de participantes"
                              min="1"
                              {...register('attendance')}
                           />
                           {errors.attendance && (
                              <p className="text-red-500 text-sm">
                                 {errors.attendance.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="status"
                              className="font-semibold mb-1"
                           >
                              Status <span className="text-red-500">*</span>
                           </label>
                           <select
                              id="status"
                              className="input"
                              {...register('status')}
                              defaultValue="Aberto"
                           >
                              <option value="Cancelado">Cancelado</option>
                              <option value="Aberto">Aberto</option>
                              <option value="Concluído">Concluído</option>
                           </select>
                           {errors.status && (
                              <p className="text-red-500 text-sm">
                                 {errors.status.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-col">
                        <label
                           htmlFor="descricao"
                           className="font-semibold mb-1"
                        >
                           Descrição do evento{' '}
                           <span className="text-red-500">*</span>
                        </label>
                        <textarea
                           id="descricao"
                           className="input min-h-[100px]"
                           placeholder="Descreva detalhadamente o evento"
                           {...register('description')}
                        />
                        {errors.description && (
                           <p className="text-red-500 text-sm">
                              {errors.description.message}
                           </p>
                        )}
                     </div>
                  </div>

                  {/* Localização */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Localização
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="cep" className="font-semibold mb-1">
                              CEP <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="cep"
                              className="input"
                              placeholder="Digite o CEP"
                              {...register('cep')}
                              onBlur={handleCepBlur}
                              maxLength={9}
                           />
                           {cepLoading && (
                              <p className="text-blue-500 text-sm">
                                 Buscando CEP...
                              </p>
                           )}
                           {cepError && (
                              <p className="text-red-500 text-sm">{cepError}</p>
                           )}
                           {errors.cep && (
                              <p className="text-red-500 text-sm">
                                 {errors.cep.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="estado"
                              className="font-semibold mb-1"
                           >
                              Estado <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="estado"
                              className="input"
                              placeholder="Digite o estado"
                              {...register('state')}
                              value={cepData?.estado || watch('state') || ''}
                              onChange={(e) =>
                                 setValue('state', e.target.value)
                              }
                           />
                           {errors.state && (
                              <p className="text-red-500 text-sm">
                                 {errors.state.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="cidade"
                              className="font-semibold mb-1"
                           >
                              Cidade <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="cidade"
                              className="input"
                              placeholder="Digite a cidade"
                              {...register('city')}
                              value={cepData?.localidade || watch('city') || ''}
                              onChange={(e) => setValue('city', e.target.value)}
                           />
                           {errors.city && (
                              <p className="text-red-500 text-sm">
                                 {errors.city.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="bairro"
                              className="font-semibold mb-1"
                           >
                              Bairro <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="bairro"
                              className="input"
                              placeholder="Digite o bairro"
                              {...register('neighborhood')}
                              value={
                                 cepData?.bairro || watch('neighborhood') || ''
                              }
                              onChange={(e) =>
                                 setValue('neighborhood', e.target.value)
                              }
                           />
                           {errors.neighborhood && (
                              <p className="text-red-500 text-sm">
                                 {errors.neighborhood.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="rua" className="font-semibold mb-1">
                              Rua <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="rua"
                              className="input"
                              placeholder="Logradouro"
                              {...register('street')}
                              value={
                                 cepData?.logradouro || watch('street') || ''
                              }
                              onChange={(e) =>
                                 setValue('street', e.target.value)
                              }
                           />
                           {errors.street && (
                              <p className="text-red-500 text-sm">
                                 {errors.street?.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="numero"
                              className="font-semibold mb-1"
                           >
                              Número <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="numero"
                              className="input"
                              placeholder="Digite o número"
                              {...register('number')}
                           />
                           {errors.number && (
                              <p className="text-red-500 text-sm">
                                 {errors.number?.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="complemento"
                              className="font-semibold mb-1"
                           >
                              Complemento
                           </label>
                           <input
                              type="text"
                              id="complemento"
                              className="input"
                              placeholder="Bloco, apartamento..."
                              {...register('complement')}
                              value={
                                 cepData?.complemento ||
                                 watch('complement') ||
                                 ''
                              }
                              onChange={(e) =>
                                 setValue('complement', e.target.value)
                              }
                           />
                        </div>
                     </div>
                  </div>

                  {/* Mídia Social */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Mídia Social
                     </h2>
                     <div className="flex flex-col">
                        <label
                           htmlFor="instagram"
                           className="font-semibold mb-1"
                        >
                           Post do Instagram
                        </label>
                        <input
                           type="url"
                           id="instagram"
                           className="input"
                           placeholder="https://www.instagram.com/p/DKZm15CskZp/"
                           {...register('embedded_instagram')}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                           Cole aqui o link do post do Instagram (ex:
                           https://www.instagram.com/p/DKZm15CskZp/)
                        </p>
                        {errors.embedded_instagram && (
                           <p className="text-red-500 text-sm">
                              {errors.embedded_instagram.message}
                           </p>
                        )}
                     </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white">
                     <button
                        type="button"
                        className="btn-danger w-32 text-white"
                        onClick={handleCancel}
                        disabled={createEvent.isPending}
                     >
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="btn-primary w-32"
                        disabled={createEvent.isPending}
                     >
                        {createEvent.isPending ? 'Cadastrando...' : 'Cadastrar'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Register;
