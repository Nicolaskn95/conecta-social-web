'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import { Category, IDonation } from '@/core/donation/model/IDonation';

function EditDonation({ params }: { params: { id: string } }) {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingData, setIsLoadingData] = useState(true);

   const [formData, setFormData] = useState<Partial<IDonation>>({
      category: Category.VESTIMENTA,
      name: '',
      description: '',
      initial_quantity: null,
      current_quantity: null,
      donator_name: null,
      available: true,
      gender: null,
      size: null,
      active: true,
   });

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações', href: '/dashboard/donations' },
      { label: 'Editar Doação' },
   ];

   useEffect(() => {
      const loadDonationData = async () => {
         try {
            // Mock API call to get donation data
            const mockDonation = {
               id: params.id,
               category: Category.VESTIMENTA,
               name: 'Camisetas',
               description: 'Camisetas em bom estado',
               initial_quantity: 10,
               current_quantity: 8,
               donator_name: 'João Silva',
               available: true,
               gender: 'Unissex',
               size: 'M',
               active: true,
               created_at: new Date(),
            };
            setFormData(mockDonation);
         } catch (error) {
            console.error('Error loading donation:', error);
            toast.error('Erro ao carregar dados da doação');
         } finally {
            setIsLoadingData(false);
         }
      };

      loadDonationData();
   }, [params.id]);

   const handleInputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
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
         console.log('Updating donation:', formData);
         toast.success('Doação atualizada com sucesso!');
         router.push('/dashboard/donations');
      } catch (error) {
         console.error('Error updating donation:', error);
         toast.error('Erro ao atualizar doação');
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
                  Carregando dados da doação...
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
            <h1 className="text-2xl font-semibold mb-6">Editar Doação</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Categoria */}
                  <div>
                     <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Categoria *
                     </label>
                     <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Nome */}
                  <div>
                     <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Nome *
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

                  {/* Descrição */}
                  <div className="col-span-2">
                     <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Descrição *
                     </label>
                     <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                     />
                  </div>

                  {/* Quantidade Inicial */}
                  <div>
                     <label
                        htmlFor="initial_quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Quantidade Inicial *
                     </label>
                     <input
                        type="number"
                        id="initial_quantity"
                        name="initial_quantity"
                        value={formData.initial_quantity || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Quantidade Atual */}
                  <div>
                     <label
                        htmlFor="current_quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Quantidade Atual *
                     </label>
                     <input
                        type="number"
                        id="current_quantity"
                        name="current_quantity"
                        value={formData.current_quantity || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Nome do Doador */}
                  <div>
                     <label
                        htmlFor="donator_name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Nome do Doador
                     </label>
                     <input
                        type="text"
                        id="donator_name"
                        name="donator_name"
                        value={formData.donator_name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Gênero */}
                  <div>
                     <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Gênero
                     </label>
                     <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     />
                  </div>

                  {/* Tamanho */}
                  <div>
                     <label
                        htmlFor="size"
                        className="block text-sm font-medium text-gray-700 mb-1"
                     >
                        Tamanho
                     </label>
                     <input
                        type="text"
                        id="size"
                        name="size"
                        value={formData.size || ''}
                        onChange={handleInputChange}
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
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                     >
                        <option value={Category.VESTIMENTA}>Vestimenta</option>
                        <option value={Category.ALIMENTO}>Alimento</option>
                        <option value={Category.BRINQUEDO}>Brinquedo</option>
                     </select>
                  </div>
               </div>

               <div className="flex justify-end space-x-3 pt-6">
                  <button
                     type="button"
                     onClick={() => router.push('/dashboard/donations')}
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

export default EditDonation;
