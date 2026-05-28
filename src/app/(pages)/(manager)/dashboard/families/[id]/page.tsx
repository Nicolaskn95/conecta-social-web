'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import LottieAnimation from '@/components/shared/LottieAnimation';
import FormActionBar from '@/components/Form/FormActionBar';
import { IFamily } from '@/core/family/model/IFamily';
import { familySchema } from '@/core/family/validation/familySchema';
import { useFamilyById } from '@/data/hooks/family/useFamilyQueries';
import { useFamilyMutations } from '@/data/hooks/family/useFamilyMutations';
import useCEP from '@/data/hooks/useCEP';

export default function EditFamilyPage() {
   const params = useParams();
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const id = Array.isArray(params.id) ? params.id[0] : params.id;

   const {
      data: familyData,
      isLoading: isLoadingData,
      error,
   } = useFamilyById(id || '');
   const { updateFamily } = useFamilyMutations();

   const {
      data: cepData,
      loading: cepLoading,
      error: cepError,
      fetchCEP,
   } = useCEP();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
      reset,
   } = useForm<IFamily>({
      resolver: zodResolver(familySchema),
   });

   const cepValue = watch('cep');

   useEffect(() => {
      if (familyData?.data) {
         reset(familyData.data);
      }
   }, [familyData, reset]);

   useEffect(() => {
      if (cepData) {
         if (cepData.localidade) setValue('city', cepData.localidade);
         if (cepData.logradouro) setValue('street', cepData.logradouro);
         if (cepData.bairro) setValue('neighborhood', cepData.bairro);
         if (cepData.estado) setValue('state', cepData.estado);
      }
   }, [cepData, setValue]);

   const handleCepBlur = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
         await fetchCEP(cepValue);
      }
   };

   const handleCancel = () => {
      router.push('/dashboard/families');
   };

   const submit: SubmitHandler<IFamily> = async (data) => {
      if (!id) return;

      setIsLoading(true);
      try {
         const { id: _id, created_at, updated_at, ...familyPayload } = data;

         updateFamily.mutate(
            { id, family: familyPayload },
            {
               onSuccess: () => {
                  router.push('/dashboard/families');
               },
               onError: () => {
                  setIsLoading(false);
               },
            }
         );
      } catch {
         setIsLoading(false);
      }
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias', href: '/dashboard/families' },
      { label: familyData?.data?.name || 'Editar Família' },
   ];

   if (isLoadingData) {
      return <LottieAnimation status="loading" />;
   }

   if (error || !familyData?.data) {
      return (
         <div className="min-h-screen p-4 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
               <p className="text-red-500">Erro ao carregar dados da família</p>
            </div>
         </div>
      );
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
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Informações da Família
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="family_name"
                              className="font-semibold mb-1"
                           >
                              Nome da família{' '}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="family_name"
                              className="input"
                              placeholder="Informe o nome da família"
                              {...register('name')}
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm">
                                 {errors.name.message as string}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Endereço
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
                                 {errors.cep.message as string}
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
                              value={
                                 typeof cepData?.estado === 'string' &&
                                 cepData.estado !== ''
                                    ? cepData.estado
                                    : watch('state') || ''
                              }
                              onChange={(e) =>
                                 setValue('state', e.target.value)
                              }
                           />
                           {errors.state && (
                              <p className="text-red-500 text-sm">
                                 {errors.state.message as string}
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
                              value={
                                 typeof cepData?.localidade === 'string' &&
                                 cepData.localidade !== ''
                                    ? cepData.localidade
                                    : watch('city') || ''
                              }
                              onChange={(e) => setValue('city', e.target.value)}
                           />
                           {errors.city && (
                              <p className="text-red-500 text-sm">
                                 {errors.city.message as string}
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
                                 typeof cepData?.bairro === 'string' &&
                                 cepData.bairro !== ''
                                    ? cepData.bairro
                                    : watch('neighborhood') || ''
                              }
                              onChange={(e) =>
                                 setValue('neighborhood', e.target.value)
                              }
                           />
                           {errors.neighborhood && (
                              <p className="text-red-500 text-sm">
                                 {errors.neighborhood.message as string}
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
                                 typeof cepData?.logradouro === 'string' &&
                                 cepData.logradouro !== ''
                                    ? cepData.logradouro
                                    : watch('street') || ''
                              }
                              onChange={(e) =>
                                 setValue('street', e.target.value)
                              }
                           />
                           {errors.street && (
                              <p className="text-red-500 text-sm">
                                 {errors.street?.message as string}
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
                                 {errors.number?.message as string}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  <FormActionBar
                     onCancel={handleCancel}
                     isLoading={isLoading}
                     submitLabel="Salvar"
                     loadingLabel="Salvando..."
                  />
               </form>
            </div>
         </div>
      </div>
   );
}
