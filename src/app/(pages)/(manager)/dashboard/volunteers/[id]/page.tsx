'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { IVolunteer } from '@/core/volunteer';
import { updateVolunteerFormSchema } from '@/core/volunteer/validation/volunteerSchema';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import useCEP from '@/data/hooks/useCEP';
import { useRoleOptions } from '@/data/hooks/useResources';
import { formatCPF, formatCEP, formatPhone } from '@/utils/masks';
import { useEmployeeById } from '@/data/hooks/employee/useEmployeeQueries';
import { useEmployeeMutations } from '@/data/hooks/employee/useEmployeeMutations';
import useAuth from '@/data/hooks/useAuth';
import {
   canChangeEmployeePassword,
   canChangeEmployeeRole,
   canManageVolunteers,
} from '@/core/auth/permissions';
import LottieAnimation from '@/components/shared/LottieAnimation';

function formatBirthDate(value?: Date | string) {
   if (!value) return '';
   return new Date(value).toISOString().slice(0, 10);
}

export default function EditVolunteerPage() {
   const params = useParams();
   const router = useRouter();
   const { user } = useAuth();
   const { updateBasic, updateRole, updatePassword } = useEmployeeMutations();
   const canManage = canManageVolunteers(user?.role);
   const canEditRole = canChangeEmployeeRole(user?.role);
   const canEditPassword = canChangeEmployeePassword(user?.role);
   const { options: roleOptions } = useRoleOptions({ enabled: canManage });
   const employeeId = Array.isArray(params.id) ? params.id[0] : params.id;
   const { data, isLoading, error } = useEmployeeById(employeeId, canManage);
   const volunteer = data?.data;
   const [roleValue, setRoleValue] = useState<VolunteerRole>(
      VolunteerRole.VOLUNTEER
   );
   const [newPassword, setNewPassword] = useState('');

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
      reset,
   } = useForm<IVolunteer>({
      resolver: zodResolver(updateVolunteerFormSchema),
   });

   const {
      data: cepData,
      loading: cepLoading,
      error: cepError,
      fetchCEP,
   } = useCEP();

   const cepValue = watch('cep');

   useEffect(() => {
      if (!volunteer) return;

      reset({
         ...volunteer,
         birth_date: formatBirthDate(volunteer.birth_date),
         uf: volunteer.uf ?? '',
         password: undefined,
      });
      setRoleValue(volunteer.role);
   }, [reset, volunteer]);

   useEffect(() => {
      if (cepData) {
         if (cepData.uf) setValue('uf', cepData.uf);
         if (cepData.localidade) setValue('city', cepData.localidade);
         if (cepData.logradouro) setValue('street', cepData.logradouro);
         if (cepData.bairro) setValue('neighborhood', cepData.bairro);
         if (cepData.complemento) setValue('complement', cepData.complemento);
         if (cepData.estado) setValue('state', cepData.estado);
      }
   }, [cepData, setValue]);

   const handleCepBlur = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
         await fetchCEP(cepValue);
      }
   };

   const handleCancel = () => {
      router.push('/dashboard/volunteers');
   };

   const submit: SubmitHandler<IVolunteer> = async (formData) => {
      updateBasic.mutate(
         { id: employeeId, employee: formData },
         {
            onSuccess: () => router.push('/dashboard/volunteers'),
         }
      );
   };

   const handleRoleUpdate = () => {
      updateRole.mutate({ id: employeeId, role: roleValue });
   };

   const handlePasswordUpdate = () => {
      if (!newPassword.trim()) return;
      updatePassword.mutate(
         { id: employeeId, data: { password: newPassword } },
         {
            onSuccess: () => setNewPassword(''),
         }
      );
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Voluntários', href: '/dashboard/volunteers' },
      {
         label: volunteer
            ? `${volunteer.name} ${volunteer.surname}`
            : 'Editar Voluntário',
      },
   ];

   if (!canManage) {
      return (
         <div className="min-h-screen p-4 bg-gray-100">
            <Breadcrumb items={breadcrumbItems} />
            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
               Você não tem permissão para editar voluntários.
            </div>
         </div>
      );
   }

   if (isLoading) {
      return <LottieAnimation status="loading" />;
   }

   if (error || !volunteer) {
      return <div>Voluntário não encontrado</div>;
   }

   return (
      <div className="h-screen flex flex-col bg-gray-100">
         <div className="flex-none p-4 bg-gray-100">
            <div className="flex justify-between items-center p-2">
               <Breadcrumb items={breadcrumbItems} />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-4">
            <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6 pb-24">
               <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Informações Pessoais
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="nome" className="font-semibold mb-1">
                              Nome <span className="text-red-500">*</span>
                           </label>
                           <input id="nome" className="input" {...register('name')} />
                           {errors.name && (
                              <p className="text-red-500 text-sm">
                                 {errors.name.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="sobrenome" className="font-semibold mb-1">
                              Sobrenome <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="sobrenome"
                              className="input"
                              {...register('surname')}
                           />
                           {errors.surname && (
                              <p className="text-red-500 text-sm">
                                 {errors.surname.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="nascimento" className="font-semibold mb-1">
                              Data de Nascimento{' '}
                              <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="date"
                              id="nascimento"
                              className="input"
                              {...register('birth_date')}
                           />
                           {errors.birth_date && (
                              <p className="text-red-500 text-sm">
                                 {errors.birth_date.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="cpf" className="font-semibold mb-1">
                              CPF <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="cpf"
                              className="input"
                              {...register('cpf')}
                              onChange={(event) =>
                                 setValue('cpf', formatCPF(event.target.value))
                              }
                              maxLength={14}
                           />
                           {errors.cpf && (
                              <p className="text-red-500 text-sm">
                                 {errors.cpf.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="email" className="font-semibold mb-1">
                              Email <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="email"
                              id="email"
                              className="input"
                              {...register('email')}
                           />
                           {errors.email && (
                              <p className="text-red-500 text-sm">
                                 {errors.email.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="telefone" className="font-semibold mb-1">
                              Telefone <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="telefone"
                              className="input"
                              {...register('phone')}
                              onChange={(event) =>
                                 setValue('phone', formatPhone(event.target.value))
                              }
                              maxLength={15}
                           />
                           {errors.phone && (
                              <p className="text-red-500 text-sm">
                                 {errors.phone.message}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">Endereço</h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="cep" className="font-semibold mb-1">
                              CEP <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="cep"
                              className="input"
                              {...register('cep')}
                              onChange={(event) =>
                                 setValue('cep', formatCEP(event.target.value))
                              }
                              onBlur={handleCepBlur}
                              maxLength={9}
                           />
                           {cepLoading && (
                              <p className="text-blue-500 text-sm">Buscando CEP...</p>
                           )}
                           {cepError && (
                              <p className="text-red-500 text-sm">{cepError}</p>
                           )}
                           {errors.cep && (
                              <p className="text-red-500 text-sm">
                                 {errors.cep.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="uf" className="font-semibold mb-1">
                              UF <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="uf"
                              className="input"
                              {...register('uf')}
                              maxLength={2}
                           />
                           {errors.uf && (
                              <p className="text-red-500 text-sm">
                                 {errors.uf.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="estado" className="font-semibold mb-1">
                              Estado <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="estado"
                              className="input"
                              {...register('state')}
                           />
                           {errors.state && (
                              <p className="text-red-500 text-sm">
                                 {errors.state.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="cidade" className="font-semibold mb-1">
                              Cidade <span className="text-red-500">*</span>
                           </label>
                           <input id="cidade" className="input" {...register('city')} />
                           {errors.city && (
                              <p className="text-red-500 text-sm">
                                 {errors.city.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="bairro" className="font-semibold mb-1">
                              Bairro <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="bairro"
                              className="input"
                              {...register('neighborhood')}
                           />
                           {errors.neighborhood && (
                              <p className="text-red-500 text-sm">
                                 {errors.neighborhood.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="rua" className="font-semibold mb-1">
                              Rua <span className="text-red-500">*</span>
                           </label>
                           <input id="rua" className="input" {...register('street')} />
                           {errors.street && (
                              <p className="text-red-500 text-sm">
                                 {errors.street.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="numero" className="font-semibold mb-1">
                              Número <span className="text-red-500">*</span>
                           </label>
                           <input
                              id="numero"
                              className="input"
                              {...register('number')}
                           />
                           {errors.number && (
                              <p className="text-red-500 text-sm">
                                 {errors.number.message}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="complemento" className="font-semibold mb-1">
                              Complemento
                           </label>
                           <input
                              id="complemento"
                              className="input"
                              {...register('complement')}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white">
                     <button
                        type="button"
                        className="btn-danger w-32 text-white"
                        onClick={handleCancel}
                        disabled={updateBasic.isPending}
                     >
                        Cancelar
                     </button>
                     <button
                        type="submit"
                        className="btn-primary w-32"
                        disabled={updateBasic.isPending}
                     >
                        {updateBasic.isPending ? 'Salvando...' : 'Salvar'}
                     </button>
                  </div>
               </form>

               {(canEditRole || canEditPassword) && (
                  <div className="space-y-4 border-t border-gray-200 pt-6">
                     <h2 className="text-xl font-bold text-gray-800">
                        Ações administrativas
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        {canEditRole && (
                           <div className="flex flex-col flex-1 min-w-[250px]">
                              <label htmlFor="funcao" className="font-semibold mb-1">
                                 Função
                              </label>
                              <div className="flex gap-3">
                                 <select
                                    id="funcao"
                                    className="input"
                                    value={roleValue}
                                    onChange={(event) =>
                                       setRoleValue(event.target.value as VolunteerRole)
                                    }
                                 >
                                    {roleOptions.map((roleOption) => (
                                       <option
                                          key={roleOption.value}
                                          value={roleOption.value}
                                       >
                                          {roleOption.label}
                                       </option>
                                    ))}
                                 </select>
                                 <button
                                    type="button"
                                    className="btn-primary w-32"
                                    onClick={handleRoleUpdate}
                                    disabled={updateRole.isPending}
                                 >
                                    Atualizar
                                 </button>
                              </div>
                           </div>
                        )}

                        {canEditPassword && (
                           <div className="flex flex-col flex-1 min-w-[250px]">
                              <label htmlFor="senha" className="font-semibold mb-1">
                                 Nova senha
                              </label>
                              <div className="flex gap-3">
                                 <input
                                    type="password"
                                    id="senha"
                                    className="input"
                                    value={newPassword}
                                    onChange={(event) =>
                                       setNewPassword(event.target.value)
                                    }
                                    placeholder="Nova senha"
                                 />
                                 <button
                                    type="button"
                                    className="btn-primary w-32"
                                    onClick={handlePasswordUpdate}
                                    disabled={
                                       updatePassword.isPending || !newPassword.trim()
                                    }
                                 >
                                    Atualizar
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
