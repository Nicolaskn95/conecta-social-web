'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import FormActionBar from '@/components/Form/FormActionBar';
import LottieAnimation from '@/components/shared/LottieAnimation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
   DonationStockAdjustmentPayload,
   DonationUpdatePayload,
} from '@/core/donation/model/IDonation';
import {
   donationStockAdjustmentSchema,
   donationUpdateSchema,
} from '@/core/donation/validation/donationSchema';
import { useDonationById } from '@/data/hooks/donation/useDonationQueries';
import { useDonationMutations } from '@/data/hooks/donation/useDonationMutations';
import { useCategories } from '@/data/hooks/donation/useCategoryQueries';
import { toast } from 'react-toastify';

const STOCK_ADJUSTMENT_REASON_OPTIONS: Array<{
   value: DonationStockAdjustmentPayload['reason'];
   label: string;
}> = [
   { value: 'SPOILAGE', label: 'Produto estragado' },
   { value: 'LOSS', label: 'Perda' },
   { value: 'DAMAGE', label: 'Dano' },
   { value: 'EXPIRATION', label: 'Vencimento' },
   { value: 'INVENTORY_CORRECTION', label: 'Correção de inventário' },
   { value: 'OTHER', label: 'Outro' },
];

export default function EditDonationPage() {
   const params = useParams();
   const router = useRouter();
   const id = Array.isArray(params.id) ? params.id[0] : params.id;
   const [isSavingDonation, setIsSavingDonation] = useState(false);
   const [isAdjustingStock, setIsAdjustingStock] = useState(false);

   const {
      data: donationData,
      isLoading: isLoadingData,
      error,
   } = useDonationById(id || '');

   const { updateDonation, adjustDonationStock } = useDonationMutations();
   const { data: categoriesData } = useCategories();
   const categories = useMemo(() => categoriesData?.data ?? [], [categoriesData?.data]);
   const donation = donationData?.data;

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<DonationUpdatePayload>({
      resolver: zodResolver(donationUpdateSchema),
   });

   const {
      register: registerStock,
      handleSubmit: handleSubmitStock,
      formState: { errors: stockErrors },
      watch,
      reset: resetStock,
   } = useForm<DonationStockAdjustmentPayload>({
      resolver: zodResolver(donationStockAdjustmentSchema),
      defaultValues: {
         reason: 'INVENTORY_CORRECTION',
      } as DonationStockAdjustmentPayload,
   });

   const stockReason = watch('reason');

   const selectedCategory = useMemo(() => {
      if (!donation) {
         return null;
      }

      return categories.find((category) => category.id === donation.category_id);
   }, [categories, donation]);

   const measureUnitDisplay = useMemo(() => {
      if (selectedCategory) {
         return `${selectedCategory.name} (${selectedCategory.measure_unity})`;
      }

      if (donation?.category) {
         return `${donation.category.name} (${donation.category.measure_unity})`;
      }

      return 'Categoria não identificada';
   }, [donation?.category, selectedCategory]);

   useEffect(() => {
      if (!donation) {
         return;
      }

      reset({
         category_id: donation.category_id,
         name: donation.name,
         description: donation.description ?? undefined,
         donator_name: donation.donator_name ?? undefined,
         gender: donation.gender ?? undefined,
         size: donation.size ?? undefined,
         active: donation.active,
      });
   }, [donation, reset]);

   useEffect(() => {
      if (error) {
         toast.error('Ocorreu um erro ao buscar a doação.');
      }
   }, [error]);

   const handleCancel = () => {
      router.push('/dashboard/donations');
   };

   const submitDonation: SubmitHandler<DonationUpdatePayload> = async (data) => {
      if (!id) {
         return;
      }

      setIsSavingDonation(true);

      updateDonation.mutate(
         { id, donation: data },
         {
            onSuccess: () => {
               router.push('/dashboard/donations');
            },
            onError: () => {
               setIsSavingDonation(false);
            },
         }
      );
   };

   const submitStockAdjustment: SubmitHandler<DonationStockAdjustmentPayload> =
      async (data) => {
         if (!id) {
            return;
         }

         setIsAdjustingStock(true);

         adjustDonationStock.mutate(
            {
               id,
               payload: {
                  delta_quantity: data.delta_quantity,
                  reason: data.reason,
                  note: data.note?.trim() ? data.note.trim() : undefined,
               },
            },
            {
               onSuccess: () => {
                  resetStock({
                     reason: 'INVENTORY_CORRECTION',
                  } as DonationStockAdjustmentPayload);
                  setIsAdjustingStock(false);
               },
               onError: () => {
                  setIsAdjustingStock(false);
               },
            }
         );
      };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações', href: '/dashboard/donations' },
      { label: donation?.name || 'Editar Doação' },
   ];

   if (isLoadingData) {
      return <LottieAnimation status="loading" />;
   }

   if (error || !donation) {
      return (
         <div className="h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-700 font-medium">
               Não foi possível carregar os dados da doação.
            </p>
         </div>
      );
   }

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         <div className="flex-none p-4 bg-gray-100">
            <Breadcrumb items={breadcrumbItems} />
         </div>
         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-8 pb-24">
               <form onSubmit={handleSubmit(submitDonation)} className="space-y-6">
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Detalhes da Doação
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="name" className="font-semibold mb-1">
                              Nome <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="name"
                              className="input"
                              required
                              {...register('name')}
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm">{errors.name.message}</p>
                           )}
                        </div>
                        <div>
                           <label htmlFor="category_id" className="font-semibold mb-1">
                              Categoria <span className="text-red-500">*</span>
                           </label>
                           <select
                              id="category_id"
                              className="input"
                              required
                              {...register('category_id')}
                           >
                              <option value="">Selecione uma categoria</option>
                              {categories.map((category) => (
                                 <option key={category.id} value={category.id}>
                                    {`${category.name} (${category.measure_unity})`}
                                 </option>
                              ))}
                           </select>
                           {errors.category_id && (
                              <p className="text-red-500 text-sm">
                                 {errors.category_id.message}
                              </p>
                           )}
                        </div>
                        <div className="md:col-span-2">
                           <label className="font-semibold mb-1 block">Unidade aplicada</label>
                           <div className="input bg-gray-50 text-gray-700">{measureUnitDisplay}</div>
                        </div>
                        <div>
                           <label htmlFor="description" className="font-semibold mb-1">
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
                           <label htmlFor="donator_name" className="font-semibold mb-1">
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
                              <p className="text-red-500 text-sm">{errors.size.message}</p>
                           )}
                        </div>
                        <div>
                           <label htmlFor="gender" className="font-semibold mb-1">
                              Gênero
                           </label>
                           <input
                              type="text"
                              id="gender"
                              className="input"
                              {...register('gender')}
                           />
                           {errors.gender && (
                              <p className="text-red-500 text-sm">{errors.gender.message}</p>
                           )}
                        </div>
                     </div>
                  </div>
                  <FormActionBar
                     onCancel={handleCancel}
                     isLoading={isSavingDonation}
                     submitLabel="Salvar"
                     loadingLabel="Salvando..."
                  />
               </form>

               <section className="space-y-4 border-t border-gray-200 pt-8">
                  <div>
                     <h2 className="text-xl font-bold text-gray-800">Ajuste de Estoque</h2>
                     <p className="text-sm text-gray-600 mt-1">
                        Registre perdas, vencimentos ou correções sem alterar o cadastro geral da doação.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                           Quantidade inicial
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mt-1">
                           {donation.initial_quantity}
                        </p>
                     </div>
                     <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                           Estoque atual
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mt-1">
                           {donation.current_quantity ?? 0}
                        </p>
                     </div>
                     <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                           Disponibilidade
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mt-1">
                           {(donation.current_quantity ?? 0) > 0 ? 'Disponível' : 'Sem estoque'}
                        </p>
                     </div>
                  </div>

                  <form
                     onSubmit={handleSubmitStock(submitStockAdjustment)}
                     className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                     <div>
                        <label htmlFor="delta_quantity" className="font-semibold mb-1">
                           Quantidade de ajuste <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="number"
                           id="delta_quantity"
                           className="input"
                           placeholder="Ex.: -2 ou 5"
                           {...registerStock('delta_quantity', {
                              valueAsNumber: true,
                           })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                           Use valor negativo para saída/perda e positivo para entrada/correção.
                        </p>
                        {stockErrors.delta_quantity && (
                           <p className="text-red-500 text-sm mt-1">
                              {stockErrors.delta_quantity.message}
                           </p>
                        )}
                     </div>

                     <div>
                        <label htmlFor="reason" className="font-semibold mb-1">
                           Motivo <span className="text-red-500">*</span>
                        </label>
                        <select id="reason" className="input" {...registerStock('reason')}>
                           {STOCK_ADJUSTMENT_REASON_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                 {option.label}
                              </option>
                           ))}
                        </select>
                        {stockErrors.reason && (
                           <p className="text-red-500 text-sm mt-1">
                              {stockErrors.reason.message}
                           </p>
                        )}
                     </div>

                     <div className="md:col-span-3">
                        <label htmlFor="note" className="font-semibold mb-1">
                           Observação {stockReason === 'OTHER' ? <span className="text-red-500">*</span> : null}
                        </label>
                        <textarea
                           id="note"
                           className="input"
                           placeholder="Detalhe do ajuste de estoque"
                           {...registerStock('note')}
                        />
                        {stockErrors.note && (
                           <p className="text-red-500 text-sm mt-1">{stockErrors.note.message}</p>
                        )}
                     </div>

                     <div className="md:col-span-3 flex justify-end">
                        <button
                           type="submit"
                           className="btn-primary w-48"
                           disabled={isAdjustingStock}
                        >
                           {isAdjustingStock ? 'Registrando...' : 'Registrar movimentação'}
                        </button>
                     </div>
                  </form>
               </section>
            </div>
         </div>
      </div>
   );
}
