'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import { IFamily, FamilyStatus } from '@/core/family/model/IFamily';

function EditFamily({ params }: { params: { id: string } }) {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingData, setIsLoadingData] = useState(true);

   const [formData, setFormData] = useState<IFamily>({
      name: '',
      street: '',
      number: '',
      neighbourhood: '',
      city: '',
      uf: '',
      state: '',
      cep: '',
      status: FamilyStatus.ATIVO,
      active: true,
   });

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Famílias', href: '/dashboard/families' },
      { label: 'Editar Família' },
   ];

   useEffect(() => {
      const loadFamilyData = async () => {
         try {
            // Mock API call to get family data
            const mockFamily: IFamily = {
               id: params.id,
               name: 'Família Silva',
               street: 'Rua das Flores',
               number: '123',
               neighbourhood: 'Bairro das Flores',
               city: 'São Paulo',
               uf: 'SP',
               state: 'São Paulo',
               cep: '12345678',
               status: FamilyStatus.ATIVO,
               active: true,
            };
            setFormData(mockFamily);
         } catch (error) {
            console.error('Error loading family:', error);
            toast.error('Erro ao carregar dados da família');
         } finally {
            setIsLoadingData(false);
         }
      };

      loadFamilyData();
   }, [params.id]);

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
      setIsLoading(true);

      try {
         // Mock API call
         console.log('Updating family:', formData);
         toast.success('Família atualizada com sucesso!');
         router.push('/dashboard/families');
      } catch (error) {
         console.error('Error updating family:', error);
         toast.error('Erro ao atualizar família');
      } finally {
         setIsLoading(false);
      }
   };

   if (isLoadingData) {
      return (
         <div className="min-h-screen p-4 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
               <p className="mt-4 text-gray-600">
                  Carregando dados da família...
               </p>
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
                        htmlFor="neighbourhood"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Bairro *
                     </label>
                     <input
                        type="text"
                        id="neighbourhood"
                        name="neighbourhood"
                        value={formData.neighbourhood}
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

                  {/* UF */}
                  <div>
                     <label
                        htmlFor="uf"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        UF *
                     </label>
                     <input
                        type="text"
                        id="uf"
                        name="uf"
                        value={formData.uf}
                        onChange={handleInputChange}
                        required
                        maxLength={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Status */}
                  <div>
                     <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Status *
                     </label>
                     <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     >
                        <option value={FamilyStatus.ATIVO}>Ativo</option>
                        <option value={FamilyStatus.CANCELADO}>
                           Cancelado
                        </option>
                     </select>
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

export default EditFamily;
