'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { IFamily } from '@/core/family/model/IFamily';
import { useFamilyById } from '@/data/hooks/family/useFamilyQueries';
import { useFamilyMutations } from '@/data/hooks/family/useFamilyMutations';
import LottieAnimation from '@/components/shared/LottieAnimation';

export default function EditFamily() {
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

   const [formData, setFormData] = useState<IFamily>({
      name: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: '',
      active: true,
   });

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias', href: '/dashboard/families' },
      { label: 'Editar Família' },
   ];

   useEffect(() => {
      if (familyData?.data) {
         setFormData(familyData.data);
      }
   }, [familyData]);

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id) return;

      setIsLoading(true);
      try {
         // Remove id, created_at e updated_at antes de enviar
         const { id: _, created_at, updated_at, ...familyData } = formData;

         updateFamily.mutate(
            { id, family: familyData },
            {
               onSuccess: () => {
                  router.push('/dashboard/families');
               },
               onError: () => {
                  setIsLoading(false);
               },
            }
         );
      } catch (error) {
         setIsLoading(false);
      }
   };

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
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
         </div>

         <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold mb-6">Editar Família</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome da Família */}
                  <div>
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Nome da Família *
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* CEP */}
                  <div>
                     <label
                        htmlFor="cep"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        CEP *
                     </label>
                     <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Rua */}
                  <div>
                     <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Rua *
                     </label>
                     <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Número */}
                  <div>
                     <label
                        htmlFor="number"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Número *
                     </label>
                     <input
                        type="text"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Bairro */}
                  <div>
                     <label
                        htmlFor="neighborhood"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Bairro *
                     </label>
                     <input
                        type="text"
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Cidade */}
                  <div>
                     <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Cidade *
                     </label>
                     <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Estado */}
                  <div>
                     <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Estado *
                     </label>
                     <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>
               </div>

               <div className="flex justify-end space-x-3 pt-6">
                  <button
                     type="button"
                     onClick={() => router.push('/dashboard/families')}
                     className="btn-secondary"
                  >
                     Cancelar
                  </button>
                  <button
                     type="submit"
                     className="btn-primary"
                     disabled={isLoading}
                  >
                     {isLoading ? 'Salvando...' : 'Salvar'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
