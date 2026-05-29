'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import FormActionBar from '@/components/Form/FormActionBar';
import { BeneficiaryCreatePayload } from '@/core/beneficiary/model/IBeneficiary';
import { beneficiaryCreateSchema } from '@/core/beneficiary/validation/beneficiarySchema';
import { useFamilies } from '@/data/hooks/family/useFamilyQueries';
import { useBeneficiaryMutations } from '@/data/hooks/beneficiary/useBeneficiaryMutations';
import { useDisabilitySuggestions } from '@/data/hooks/beneficiary/useBeneficiaryQueries';
import { formatCPF, formatPhone } from '@/utils/masks';

const GENDER_OPTIONS = [
   'Masculino',
   'Feminino',
   'Outro',
   'Prefiro não informar',
] as const;

export default function RegisterBeneficiaryPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const preselectedFamilyId = searchParams.get('familyId') ?? '';
   const [isSaving, setIsSaving] = useState(false);

   const { data: familiesResponse } = useFamilies();
   const families = familiesResponse?.data ?? [];
   const { createBeneficiary } = useBeneficiaryMutations();

   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm<BeneficiaryCreatePayload>({
      resolver: zodResolver(beneficiaryCreateSchema),
      defaultValues: {
         id_family: preselectedFamilyId || undefined,
         has_disability: false,
      },
   });

   useEffect(() => {
      if (preselectedFamilyId) {
         setValue('id_family', preselectedFamilyId);
      }
   }, [preselectedFamilyId, setValue]);

   const hasDisability = watch('has_disability');
   const disabilityInput = watch('disability_details') ?? '';

   useEffect(() => {
      if (!hasDisability) {
         setValue('disability_details', undefined);
      }
   }, [hasDisability, setValue]);

   const { data: suggestionsResponse } = useDisabilitySuggestions(
      hasDisability ? disabilityInput : undefined
   );

   const disabilitySuggestions = useMemo(() => {
      return suggestionsResponse?.data ?? [];
   }, [suggestionsResponse?.data]);

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Beneficiários', href: '/dashboard/beneficiaries' },
      { label: 'Cadastro' },
   ];

   const submit: SubmitHandler<BeneficiaryCreatePayload> = (data) => {
      setIsSaving(true);

      const payload: BeneficiaryCreatePayload = {
         ...data,
         cpf: data.cpf?.replace(/\D/g, '') || undefined,
         disability_details: data.has_disability
            ? data.disability_details?.trim() || undefined
            : undefined,
      };

      createBeneficiary.mutate(payload, {
         onSuccess: () => {
            router.push('/dashboard/beneficiaries');
         },
         onError: () => {
            setIsSaving(false);
         },
      });
   };

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
                        Informações do Beneficiário
                     </h2>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="id_family" className="font-semibold mb-1">
                              Família <span className="text-red-500">*</span>
                           </label>
                           <select id="id_family" className="input" {...register('id_family')}>
                              <option value="">Selecione uma família</option>
                              {families.map((family) => (
                                 <option key={family.id} value={family.id}>
                                    {family.name}
                                 </option>
                              ))}
                           </select>
                           {errors.id_family && (
                              <p className="text-red-500 text-sm">{errors.id_family.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="birth_date" className="font-semibold mb-1">
                              Data de nascimento <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="date"
                              id="birth_date"
                              className="input"
                              {...register('birth_date')}
                           />
                           {errors.birth_date && (
                              <p className="text-red-500 text-sm">{errors.birth_date.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="name" className="font-semibold mb-1">
                              Nome <span className="text-red-500">*</span>
                           </label>
                           <input id="name" className="input" {...register('name')} />
                           {errors.name && (
                              <p className="text-red-500 text-sm">{errors.name.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="surname" className="font-semibold mb-1">
                              Sobrenome <span className="text-red-500">*</span>
                           </label>
                           <input id="surname" className="input" {...register('surname')} />
                           {errors.surname && (
                              <p className="text-red-500 text-sm">{errors.surname.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="gender" className="font-semibold mb-1">
                              Gênero <span className="text-red-500">*</span>
                           </label>
                           <select id="gender" className="input" {...register('gender')}>
                              <option value="">Selecione uma opção</option>
                              {GENDER_OPTIONS.map((option) => (
                                 <option key={option} value={option}>
                                    {option}
                                 </option>
                              ))}
                           </select>
                           {errors.gender && (
                              <p className="text-red-500 text-sm">{errors.gender.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="cpf" className="font-semibold mb-1">
                              CPF
                           </label>
                           <input
                              id="cpf"
                              className="input"
                              placeholder="000.000.000-00"
                              {...register('cpf')}
                              onChange={(event) =>
                                 setValue('cpf', formatCPF(event.target.value))
                              }
                              maxLength={14}
                           />
                           {errors.cpf && (
                              <p className="text-red-500 text-sm">{errors.cpf.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="rg" className="font-semibold mb-1">
                              RG
                           </label>
                           <input id="rg" className="input" {...register('rg')} />
                           {errors.rg && (
                              <p className="text-red-500 text-sm">{errors.rg.message}</p>
                           )}
                        </div>

                        <div>
                           <label htmlFor="phone" className="font-semibold mb-1">
                              Celular
                           </label>
                           <input
                              id="phone"
                              className="input"
                              type="tel"
                              placeholder="(00) 00000-0000"
                              {...register('phone')}
                              onChange={(event) =>
                                 setValue('phone', formatPhone(event.target.value))
                              }
                              maxLength={15}
                           />
                           {errors.phone && (
                              <p className="text-red-500 text-sm">{errors.phone.message}</p>
                           )}
                        </div>

                        <div className="md:col-span-2">
                           <label htmlFor="email" className="font-semibold mb-1">
                              E-mail
                           </label>
                           <input id="email" className="input" {...register('email')} />
                           {errors.email && (
                              <p className="text-red-500 text-sm">{errors.email.message}</p>
                           )}
                        </div>

                        <div className="md:col-span-2">
                           <label className="font-semibold mb-1 flex items-center gap-2">
                              <input type="checkbox" {...register('has_disability')} />
                              Possui deficiência?
                           </label>
                        </div>

                        {hasDisability && (
                           <div className="md:col-span-2">
                              <label
                                 htmlFor="disability_details"
                                 className="font-semibold mb-1"
                              >
                                 Detalhes da deficiência{' '}
                                 <span className="text-red-500">*</span>
                              </label>
                              <input
                                 id="disability_details"
                                 className="input"
                                 list="disability-suggestions"
                                 {...register('disability_details')}
                              />
                              <datalist id="disability-suggestions">
                                 {disabilitySuggestions.map((suggestion) => (
                                    <option key={suggestion} value={suggestion} />
                                 ))}
                              </datalist>
                              {errors.disability_details && (
                                 <p className="text-red-500 text-sm">
                                    {errors.disability_details.message}
                                 </p>
                              )}
                           </div>
                        )}
                     </div>
                  </div>

                  <FormActionBar
                     onCancel={() => router.push('/dashboard/beneficiaries')}
                     isLoading={isSaving}
                     submitLabel="Salvar"
                     loadingLabel="Salvando..."
                  />
               </form>
            </div>
         </div>
      </div>
   );
}
