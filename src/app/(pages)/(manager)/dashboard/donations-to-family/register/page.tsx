'use client';
import { DonationSuggestions } from '@/components/DonationWorkflow/DonationSuggestions';
import type { Suggestion } from '@/data/services/recommendations';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Recipient, RecipientExtras } from '@/components/DonationWorkflow/RecipientExtras';
import { ApiRequestError } from '@/data/services/baseService';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { donationToFamilySchema } from '@/core/donation/validation/donationToFamilySchema';
import { IDonationToFamily } from '@/core/donation/model/IDonationToFamily';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDonationsWithStock } from '@/data/hooks/donation/useDonationQueries';
import { useFamilies } from '@/data/hooks/family/useFamilyQueries';
import { useDonationToFamilyMutations } from '@/data/hooks/donation-to-family/useDonationToFamilyMutations';
import FormActionBar from '@/components/Form/FormActionBar';

type DonationToFamilyForm = Omit<
   IDonationToFamily,
   'id' | 'created_at' | 'updated_at' | 'donation' | 'family'
>;

export default function RegisterDonationToFamilyPage() {
   const router = useRouter();
   const queryClient = useQueryClient();
   const searchParams = useSearchParams();
   const preselectedDonationId = searchParams.get('donationId') ?? '';
   const [applied, setApplied] = useState<Suggestion>();
   const preselectedFamilyId = searchParams.get('familyId') ?? '';
   const [isLoading, setIsLoading] = useState(false);
   const { data: donationsResponse } = useDonationsWithStock();
   const { data: familiesResponse } = useFamilies();
   const { createDonationToFamily } = useDonationToFamilyMutations();

   const [recipient, setRecipient] = useState<Recipient>({});
   const [submitError, setSubmitError] = useState('');
   const attempt = useRef<{ body: string; id: string } | null>(null);

   const donations = donationsResponse?.data ?? [];
   const families = familiesResponse?.data ?? [];

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      control,
      formState: { errors },
   } = useForm<DonationToFamilyForm>({
      resolver: zodResolver(donationToFamilySchema),
      defaultValues: {
         id_donation: preselectedDonationId || undefined,
         id_family: preselectedFamilyId || undefined,
      },
   });

   useEffect(() => {
      if (preselectedFamilyId) {
         setValue('id_family', preselectedFamilyId);
         setRecipient({});
         setApplied(undefined);
      }
   }, [preselectedFamilyId, setValue]);

   const familyId = watch('id_family');
   const selectedDonationId = watch('id_donation');
   const selectedDonation = donations.find(
      (donation) => donation.id === selectedDonationId
   );

   const suggestion = applied && applied.id_need === recipient.id_need ? applied : undefined;
   const exceedsSuggestedQuantity = suggestion?.max_separable_quantity != null &&
      Number(watch('quantity')) > suggestion.max_separable_quantity;

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações para Família', href: '/dashboard/donations-to-family' },
      { label: 'Novo Registro' },
   ];

   const onSubmit: SubmitHandler<DonationToFamilyForm> = async (formData) => {
      if (isLoading) return;
      if (!attempt.current && exceedsSuggestedQuantity) {
         setSubmitError('A quantidade supera o máximo separável deste pedido.');
         return;
      }
      const command = { ...formData, ...recipient };
      const body = JSON.stringify(command);
      if (attempt.current && attempt.current.body !== body) {
         setSubmitError('Reenvie a separação anterior com os mesmos dados antes de iniciar outra.');
         return;
      }
      attempt.current ??= { body, id: crypto.randomUUID() };
      setIsLoading(true); setSubmitError('');
      try {
         await createDonationToFamily.mutateAsync({ ...command, request_id: attempt.current.id });
         attempt.current = null;
         void queryClient.invalidateQueries({ queryKey: ['donation-recommendations'] });
         router.push('/dashboard/donations-to-family');
      } catch (error) {
         if (error instanceof ApiRequestError && error.status < 500) {
            attempt.current = null;
            if (error.status === 400 || error.status === 409) {
               setApplied(undefined);
               await Promise.all(['needs', 'donations', 'donations-to-family', 'donation-recommendations'].map(key => queryClient.invalidateQueries({ queryKey: [key] })));
            }
         }
         setSubmitError((error as Error).message);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         <div className="flex-none p-4 bg-gray-100">
            <Breadcrumb items={breadcrumbItems} />
         </div>

         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6 pb-24">
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Registro de Doação para Família
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label
                              htmlFor="id_donation"
                              className="font-semibold mb-1"
                           >
                              Item da Doação <span className="text-red-500">*</span>
                           </label>
                           <Controller
                              name="id_donation"
                              control={control}
                              render={({ field }) => (
                                 <select id="id_donation" className="input" value={field.value ?? ''}
                                    onBlur={field.onBlur} ref={field.ref} onChange={event => {
                                       if (applied) { setApplied(undefined); setRecipient({}); }
                                       field.onChange(event);
                                    }}>
                                    <option value="">Selecione uma doação</option>
                                    {donations.map(donation => (
                                       <option key={donation.id} value={donation.id}>
                                          {donation.name} ({donation.category?.measure_unity ?? 'UN'})
                                       </option>
                                    ))}
                                 </select>
                              )}
                           />
                           {donations.length === 0 && (
                              <p className="text-sm text-gray-500 mt-1">
                                 Nenhuma doação com estoque disponível no momento.
                              </p>
                           )}
                           {errors.id_donation && (
                              <p className="text-red-500 text-sm">
                                 {errors.id_donation.message}
                              </p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="id_family" className="font-semibold mb-1">
                              Família <span className="text-red-500">*</span>
                           </label>
                           <Controller
                              name="id_family"
                              control={control}
                              render={({ field }) => (
                                 <select
                                    id="id_family"
                                    className="input"
                                    value={field.value ?? ''}
                                    onChange={event => {
                                       if (event.target.value !== field.value) {
                                          setApplied(undefined);
                                          setRecipient({});
                                       }
                                       field.onChange(event);
                                    }}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                 >
                                    <option value="">Selecione uma família</option>
                                    {families.map((family) => (
                                       <option key={family.id} value={family.id}>
                                          {family.name}
                                       </option>
                                    ))}
                                 </select>
                              )}
                           />
                           {preselectedFamilyId && (
                              <p className="text-xs text-gray-600 mt-1">
                                 Família pré-selecionada a partir da lista.
                              </p>
                           )}
                           {errors.id_family && (
                              <p className="text-red-500 text-sm">
                                 {errors.id_family.message}
                              </p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="quantity" className="font-semibold mb-1">
                              Quantidade a Doar <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="number"
                              id="quantity"
                              className="input"
                              {...register('quantity', { valueAsNumber: true })}
                           />
                           {selectedDonation && (
                              <p className="text-xs text-gray-600 mt-1">
                                 Estoque disponível:{' '}
                                 {`${selectedDonation.current_quantity ?? 0} ${
                                    selectedDonation.category?.measure_unity ?? ''
                                 }`.trim()}
                              </p>
                           )}
                           {errors.quantity && (
                              <p className="text-red-500 text-sm">
                                 {errors.quantity.message}
                              </p>
                           )}
                        </div>

                        <div>
                           <label
                              htmlFor="update_message"
                              className="font-semibold mb-1"
                           >
                              Observação
                           </label>
                           <textarea
                              id="update_message"
                              className="input"
                              {...register('update_message')}
                           />
                           {errors.update_message && (
                              <p className="text-red-500 text-sm">
                                 {errors.update_message.message}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  {selectedDonationId && selectedDonation && <DonationSuggestions key={selectedDonationId} donationId={selectedDonationId}
                     initialOpen={selectedDonation.id === preselectedDonationId} disabled={isLoading || !!attempt.current}
                     onSelect={item => {
                        setValue('id_family', item.id_family, { shouldValidate: true });
                        setRecipient(current => ({ ...current, id_beneficiary: item.id_beneficiary ?? undefined, id_need: item.id_need }));
                        setApplied(item);
                        setSubmitError('');
                     }} />}
                  {suggestion && <p role="status" className="rounded-lg bg-blue-50 p-3">
                     Pedido selecionado: {suggestion.need_label}{suggestion.beneficiary_name ? ' · ' + suggestion.beneficiary_name : ''}
                     {suggestion.max_separable_quantity == null ? ' · Quantidade a confirmar' : ' · Máximo separável: ' + suggestion.max_separable_quantity}
                  </p>}
                  {exceedsSuggestedQuantity && <p role="alert" className="text-red-700">A quantidade supera o máximo separável deste pedido.</p>}
                  <RecipientExtras family={familyId} value={recipient} onChange={setRecipient} />
                  {submitError && <p role="alert" className="text-red-700">{submitError}</p>}
                  <FormActionBar
                     onCancel={() => router.push('/dashboard/donations-to-family')}
                     isLoading={isLoading}
                     submitLabel="Separar para a família"
                     loadingLabel="Registrando..."
                     submitWidthClassName="w-40"
                  />
               </form>
            </div>
         </div>
      </div>
   );
}
