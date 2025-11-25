'use client';

import { donationSchema } from '@/core/donation/validation/donationSchema';
import { IDonation } from '@/core/donation/model/IDonation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useDonations } from '@/data/hooks/donation/useDonations';
import { useCategories } from '@/data/hooks/donation/useCategoryQueries';

export default function RegisterDonationPage() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const { addDonation } = useDonations();
   const { data: categoriesData } = useCategories();
   const categories = categoriesData?.data ?? [];

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações', href: '/dashboard/donations' },
      { label: 'Nova Doação' },
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
         addDonation(data);
         router.push('/dashboard/donations');
      } catch (error: any) {
         // Error handling is done in the mutation
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         {/* Fixed header with breadcrumb */}
         <div className="flex-none p-4 bg-gray-100">
            <Breadcrumb items={breadcrumbItems} />
         </div>

         {/* Scrollable content */}
         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6 pb-24">
               <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Nova Doação
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="name" className="font-semibold mb-1">
                              Nome
                           </label>
                           <input
                              type="text"
                              id="name"
                              className="input"
                              {...register('name')}
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm">
                                 {errors.name.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <label
                              htmlFor="category_id"
                              className="font-semibold mb-1"
                           >
                              Categoria <span className="text-red-500">*</span>
                           </label>
                           <select
                              id="category_id"
                              className="input"
                              {...register('category_id')}
                           >
                              <option value="">Selecione uma categoria</option>
                              {categories.map((cat) => (
                                 <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                 </option>
                              ))}
                           </select>
                           {errors.category_id && (
                              <p className="text-red-500 text-sm">
                                 {errors.category_id.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <label
                              htmlFor="description"
                              className="font-semibold mb-1"
                           >
                              Descrição
                           </label>
                           <textarea
                              id="description"
                              className="input"
                              {...register('description')}
                           />
                           {errors.description && (
                              <p className="text-red-500 text-sm">
                                 {errors.description.message}
                              </p>
                           )}
                        </div>
                        <div>
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
                              {...register('donator_name')}
                           />
                           {errors.donator_name && (
                              <p className="text-red-500 text-sm">
                                 {errors.donator_name.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <label
                              htmlFor="initial_quantity"
                              className="font-semibold mb-1"
                           >
                              Quantidade Inicial
                           </label>
                           <input
                              type="number"
                              id="initial_quantity"
                              className="input"
                              {...register('initial_quantity', {
                                 valueAsNumber: true,
                              })}
                           />
                           {errors.initial_quantity && (
                              <p className="text-red-500 text-sm">
                                 {errors.initial_quantity.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <label
                              htmlFor="current_quantity"
                              className="font-semibold mb-1"
                           >
                              Quantidade Atual
                           </label>
                           <input
                              type="number"
                              id="current_quantity"
                              className="input"
                              {...register('current_quantity', {
                                 valueAsNumber: true,
                              })}
                           />
                           {errors.current_quantity && (
                              <p className="text-red-500 text-sm">
                                 {errors.current_quantity.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <label htmlFor="size" className="font-semibold mb-1">
                              Tamanho
                           </label>
                           <input
                              type="text"
                              id="size"
                              className="input"
                              {...register('size')}
                           />
                           {errors.size && (
                              <p className="text-red-500 text-sm">
                                 {errors.size.message}
                              </p>
                           )}
                        </div>
                        <div>
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
                              {...register('gender')}
                           />
                           {errors.gender && (
                              <p className="text-red-500 text-sm">
                                 {errors.gender.message}
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
