'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { donationSchema } from '@/core/donation/validation/donationSchema';
import { IDonation, Category } from '@/core/donation/model/IDonation';

const mockDonations: IDonation[] = [
   {
      id: '1',
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
      created_at: new Date('2024-07-20'),
   },
   {
      id: '2',
      category: Category.ALIMENTO,
      name: 'Arroz',
      description: 'Pacotes de arroz 5kg',
      initial_quantity: 20,
      current_quantity: 15,
      donator_name: 'Maria Santos',
      available: true,
      gender: null,
      size: null,
      active: true,
      created_at: new Date('2024-07-18'),
   },
   {
      id: '3',
      category: Category.BRINQUEDO,
      name: 'Hot Wheels',
      description: 'Hot Wheels em bom estado',
      initial_quantity: 5,
      current_quantity: 3,
      donator_name: 'Pedro Oliveira',
      available: true,
      gender: null,
      size: null,
      active: true,
      created_at: new Date('2024-07-15'),
   },
];

export default function EditDonationPage() {
   const params = useParams();
   const router = useRouter();
   const [donation, setDonation] = useState<IDonation | null>(null);
   const [loading, setLoading] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<IDonation>({
      resolver: zodResolver(donationSchema),
   });

   useEffect(() => {
      const fetchDonation = async () => {
         try {
            const donationData = mockDonations.find((d) => d.id === params.id);
            if (!donationData) {
               toast.error('Doação não encontrada');
               router.push('/dashboard/donations');
               return;
            }
            setDonation(donationData);
            reset(donationData);
         } catch (error) {
            console.error('Error fetching donation:', error);
            toast.error('Erro ao carregar doação');
         } finally {
            setLoading(false);
         }
      };

      fetchDonation();
   }, [params.id, router, reset]);

   const handleCancel = () => {
      router.push('/dashboard/donations');
   };

   const submit: SubmitHandler<IDonation> = async (data) => {
      setIsLoading(true);
      try {
         await new Promise((resolve) => setTimeout(resolve, 1000));
         toast.success('Doação atualizada com sucesso!');
         router.push('/dashboard/donations');
      } catch (error: any) {
         toast.error(
            error?.response?.data?.message ||
               'Erro ao atualizar doação. Tente novamente.'
         );
      } finally {
         setIsLoading(false);
      }
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações', href: '/dashboard/donations' },
      { label: donation?.name || 'Editar Doação' },
   ];

   if (loading) {
      return <div>Carregando...</div>;
   }

   if (!donation) {
      return <div>Doação não encontrada</div>;
   }

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         <div className="flex-none p-4 bg-gray-100">
            <Breadcrumb items={breadcrumbItems} />
         </div>
         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6 pb-24">
               <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Detalhes da Doação
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
                              htmlFor="category"
                              className="font-semibold mb-1"
                           >
                              Categoria
                           </label>
                           <select
                              id="category"
                              className="input"
                              {...register('category')}
                           >
                              {Object.values(Category).map((cat) => (
                                 <option key={cat} value={cat}>
                                    {cat}
                                 </option>
                              ))}
                           </select>
                           {errors.category && (
                              <p className="text-red-500 text-sm">
                                 {errors.category.message}
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
                  <div className="flex justify-end gap-4 pt-4">
                     <button
                        type="button"
                        className="btn-danger"
                        onClick={handleCancel}
                        disabled={isLoading}
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
      </div>
   );
}
