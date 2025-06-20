'use client';

import { donationSchema } from '@/core/donation/validation/donationSchema';
import { Category, IDonation } from '@/core/donation/model/IDonation';
import useAPI from '@/data/hooks/useAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Breadcrumb from '@/components/Breadcrumb';

function RegisterDonation() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const { post } = useAPI();

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações', href: '/dashboard/donations' },
      { label: 'Cadastro', href: '/dashboard/donations/register' },
   ];

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IDonation>({
      resolver: zodResolver(donationSchema),
   });

   const handleCancel = () => {
      router.push('/dashboard/donations');
   };

   const submit: SubmitHandler<IDonation> = async (data) => {
      setIsLoading(true);
      try {
         await post('/donations', data);
         toast.success('Doação cadastrada com sucesso!');
         router.push('/dashboard/donations');
      } catch (error: any) {
         toast.error(
            error?.response?.data?.message ||
               'Erro ao cadastrar doação. Tente novamente.'
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
                        Informações da Doação
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="category"
                              className="font-semibold mb-1"
                           >
                              Categoria <span className="text-red-500">*</span>
                           </label>
                           <select
                              id="category"
                              className="input"
                              {...register('category')}
                           >
                              <option value={Category.VESTIMENTA}>
                                 Vestimenta
                              </option>
                              <option value={Category.ALIMENTO}>
                                 Alimento
                              </option>
                              <option value={Category.BRINQUEDO}>
                                 Brinquedo
                              </option>
                           </select>
                           {errors.category && (
                              <p className="text-red-500 text-sm">
                                 {errors.category.message as string}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="name" className="font-semibold mb-1">
                              Nome <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="name"
                              className="input"
                              placeholder="Informe o nome"
                              {...register('name')}
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm">
                                 {errors.name.message as string}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-col">
                        <label
                           htmlFor="description"
                           className="font-semibold mb-1"
                        >
                           Descrição <span className="text-red-500">*</span>
                        </label>
                        <textarea
                           id="description"
                           className="input min-h-[100px]"
                           placeholder="Informe a descrição"
                           {...register('description')}
                        />
                        {errors.description && (
                           <p className="text-red-500 text-sm">
                              {errors.description.message as string}
                           </p>
                        )}
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="initial_quantity"
                              className="font-semibold mb-1"
                           >
                              Quantidade Inicial{' '}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="number"
                              id="initial_quantity"
                              className="input"
                              placeholder="Informe a quantidade inicial"
                              {...register('initial_quantity', {
                                 valueAsNumber: true,
                              })}
                           />
                           {errors.initial_quantity && (
                              <p className="text-red-500 text-sm">
                                 {errors.initial_quantity.message as string}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="current_quantity"
                              className="font-semibold mb-1"
                           >
                              Quantidade Atual{' '}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="number"
                              id="current_quantity"
                              className="input"
                              placeholder="Informe a quantidade atual"
                              {...register('current_quantity', {
                                 valueAsNumber: true,
                              })}
                           />
                           {errors.current_quantity && (
                              <p className="text-red-500 text-sm">
                                 {errors.current_quantity.message as string}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="donator_name"
                              className="font-semibold mb-1"
                           >
                              Nome do Doador
                           </label>
                           <input
                              type="text"
                              id="donator_name"
                              className="input"
                              placeholder="Informe o nome do doador"
                              {...register('donator_name')}
                           />
                           {errors.donator_name && (
                              <p className="text-red-500 text-sm">
                                 {errors.donator_name.message as string}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="gender"
                              className="font-semibold mb-1"
                           >
                              Gênero
                           </label>
                           <input
                              type="text"
                              id="gender"
                              className="input"
                              placeholder="Informe o gênero"
                              {...register('gender')}
                           />
                           {errors.gender && (
                              <p className="text-red-500 text-sm">
                                 {errors.gender.message as string}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="size" className="font-semibold mb-1">
                              Tamanho
                           </label>
                           <input
                              type="text"
                              id="size"
                              className="input"
                              placeholder="Informe o tamanho"
                              {...register('size')}
                           />
                           {errors.size && (
                              <p className="text-red-500 text-sm">
                                 {errors.size.message as string}
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

export default RegisterDonation;
