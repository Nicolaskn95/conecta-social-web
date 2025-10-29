'use client';

import { familySchema } from '@/core/family/validation/familySchema';
import { FamilyStatus, IFamily } from '@/core/family/model/IFamily';
import useAPI from '@/data/hooks/useAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Breadcrumb from '@/components/Breadcrumb';
import useCEP from '@/data/hooks/useCEP';

function RegisterFamily() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const { post } = useAPI();

   // useCEP hook
   const {
      data: cepData,
      loading: cepLoading,
      error: cepError,
      fetchCEP,
   } = useCEP();

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias', href: '/dashboard/families' },
      { label: 'Cadastro', href: '/dashboard/families/register' },
   ];

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
   } = useForm<IFamily>({
      resolver: zodResolver(familySchema),
   });
   const cepValue = watch('cep');

   const handleCepBlur = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
         await fetchCEP(cepValue);
      }
   };

   React.useEffect(() => {
      if (cepData) {
         if (cepData.uf) setValue('uf', cepData.uf);
         if (cepData.localidade) setValue('city', cepData.localidade);
         if (cepData.logradouro) setValue('street', cepData.logradouro);
         if (cepData.bairro) setValue('neighbourhood', cepData.bairro);
         if (cepData.estado) setValue('state', cepData.estado);
      }
   }, [cepData, setValue]);

   const handleCancel = () => {
      router.push('/dashboard/families');
   };

   const submit: SubmitHandler<IFamily> = async (data) => {
      setIsLoading(true);
      try {
         // await post('/families', data);
         await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
         toast.success('Família cadastrada com sucesso!');
         router.push('/dashboard/families');
      } catch (error: any) {
         toast.error(
            error?.response?.data?.message ||
               'Erro ao cadastrar família. Tente novamente.'
         );
      } finally {
         setIsLoading(false);
      }
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
                              defaultValue={FamilyStatus.ATIVO}
                              {...register('status')}
                           >
                              <option value={FamilyStatus.ATIVO}>
                                 {FamilyStatus.ATIVO}
                              </option>
                              <option value={FamilyStatus.CANCELADO}>
                                 {FamilyStatus.CANCELADO}
                              </option>
                           </select>
                           {errors.status && (
                              <p className="text-red-500 text-sm">
                                 {errors.status.message as string}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Endereço */}
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
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="uf" className="font-semibold mb-1">
                              UF <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="uf"
                              className="input"
                              placeholder="UF"
                              {...register('uf')}
                              value={
                                 typeof cepData?.uf === 'string' &&
                                 cepData.uf !== ''
                                    ? cepData.uf
                                    : watch('uf') || ''
                              }
                              onChange={(e) =>
                                 setValue('uf', e.target.value.toUpperCase())
                              }
                              maxLength={2}
                           />
                           {errors.uf && (
                              <p className="text-red-500 text-sm">
                                 {errors.uf.message as string}
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
                              {...register('neighbourhood')}
                              value={
                                 typeof cepData?.bairro === 'string' &&
                                 cepData.bairro !== ''
                                    ? cepData.bairro
                                    : watch('neighbourhood') || ''
                              }
                              onChange={(e) =>
                                 setValue('neighbourhood', e.target.value)
                              }
                           />
                           {errors.neighbourhood && (
                              <p className="text-red-500 text-sm">
                                 {errors.neighbourhood.message as string}
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

                  {/* Botões de ação */}
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
                        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default RegisterFamily;
