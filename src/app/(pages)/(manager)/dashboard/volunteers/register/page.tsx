'use client';

import { IVolunteer } from '@/core/volunteer';
import { createVolunteerFormSchema } from '@/core/volunteer/validation/volunteerSchema';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import Breadcrumb from '@/components/Breadcrumb';
import useCEP from '@/data/hooks/useCEP';
import { formatCPF, formatCEP, formatPhone } from '@/utils/masks';

function Register() {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);

   // useCEP hook
   const {
      data: cepData,
      loading: cepLoading,
      error: cepError,
      fetchCEP,
   } = useCEP();

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Voluntários', href: '/dashboard/volunteers' },
      { label: 'Cadastro', href: '/dashboard/volunteers/register' },
   ];

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
   } = useForm<IVolunteer>({
      resolver: zodResolver(createVolunteerFormSchema),
   });

   const cepValue = watch('cep');

   const handleCepBlur = async () => {
      if (cepValue && cepValue.replace(/\D/g, '').length === 8) {
         await fetchCEP(cepValue);
      }
   };

   React.useEffect(() => {
      if (cepData) {
         if (cepData.uf) setValue('uf', cepData.uf);
         if (cepData.localidade) setValue('city', cepData.localidade);
         if (cepData.logradouro) setValue('street', cepData.logradouro);
         if (cepData.bairro) setValue('neighborhood', cepData.bairro);
         if (cepData.complemento) setValue('complement', cepData.complemento);
         if (cepData.estado) setValue('state', cepData.estado);
      }
   }, [cepData, setValue]);

   const handleCancel = () => {
      router.push('/dashboard/volunteers');
   };

   const submit: SubmitHandler<IVolunteer> = async (data) => {
      setIsLoading(true);
      try {
         // Mock API call - simulate success
         console.log('Volunteer data to submit:', data);
         await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
         toast.success('Voluntário cadastrado com sucesso!');
         router.push('/dashboard/volunteers');
      } catch (error: any) {
         toast.error(
            error?.response?.data?.message ||
               'Erro ao cadastrar voluntário. Tente novamente.'
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
                  {/* Informações Pessoais */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Informações Pessoais
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="nome" className="font-semibold mb-1">
                              Nome <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="nome"
                              className="input"
                              placeholder="Informe o nome"
                              {...register('name')}
                           />
                           {errors.name && (
                              <p className="text-red-500 text-sm">
                                 {errors.name.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="sobrenome"
                              className="font-semibold mb-1"
                           >
                              Sobrenome <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="sobrenome"
                              className="input"
                              placeholder="Informe o sobrenome"
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
                           <label
                              htmlFor="nascimento"
                              className="font-semibold mb-1"
                           >
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
                              type="text"
                              id="cpf"
                              className="input"
                              placeholder="000.000.000-00"
                              {...register('cpf')}
                              onChange={(e) => {
                                 const formatted = formatCPF(e.target.value);
                                 setValue('cpf', formatted);
                              }}
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
                           <label
                              htmlFor="email"
                              className="font-semibold mb-1"
                           >
                              Email <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="email"
                              id="email"
                              className="input"
                              placeholder="email@exemplo.com"
                              {...register('email')}
                           />
                           {errors.email && (
                              <p className="text-red-500 text-sm">
                                 {errors.email.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="telefone"
                              className="font-semibold mb-1"
                           >
                              Telefone <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="tel"
                              id="telefone"
                              className="input"
                              placeholder="(00) 00000-0000"
                              {...register('phone')}
                              onChange={(e) => {
                                 const formatted = formatPhone(e.target.value);
                                 setValue('phone', formatted);
                              }}
                              maxLength={15}
                           />
                           {errors.phone && (
                              <p className="text-red-500 text-sm">
                                 {errors.phone.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="senha"
                              className="font-semibold mb-1"
                           >
                              Senha <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="password"
                              id="senha"
                              className="input"
                              placeholder="Digite sua senha"
                              {...register('password')}
                           />
                           {errors.password && (
                              <p className="text-red-500 text-sm">
                                 {errors.password.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="funcao"
                              className="font-semibold mb-1"
                           >
                              Função <span className="text-red-500">*</span>
                           </label>
                           <select
                              id="funcao"
                              className="input"
                              {...register('role')}
                              defaultValue={VolunteerRole.VOLUNTEER}
                           >
                              <option value={VolunteerRole.VOLUNTEER}>
                                 Voluntário
                              </option>
                              <option value={VolunteerRole.MANAGER}>
                                 Gerente
                              </option>
                              <option value={VolunteerRole.ADMIN}>
                                 Administrador
                              </option>
                           </select>
                           {errors.role && (
                              <p className="text-red-500 text-sm">
                                 {errors.role.message}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Endereço */}
                  <div className="space-y-4">
                     <h2 className="text-xl font-bold text-gray-800">
                        Endereço
                     </h2>
                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="cep" className="font-semibold mb-1">
                              CEP <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="cep"
                              className="input"
                              placeholder="00000-000"
                              {...register('cep')}
                              onChange={(e) => {
                                 const formatted = formatCEP(e.target.value);
                                 setValue('cep', formatted);
                              }}
                              onBlur={handleCepBlur}
                              maxLength={9}
                           />
                           {cepLoading && (
                              <p className="text-blue-500 text-sm">
                                 Buscando CEP...
                              </p>
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
                              type="text"
                              id="uf"
                              className="input"
                              placeholder="UF"
                              {...register('uf')}
                              value={cepData?.uf || watch('uf') || ''}
                              onChange={(e) =>
                                 setValue('uf', e.target.value.toUpperCase())
                              }
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
                           <label
                              htmlFor="estado"
                              className="font-semibold mb-1"
                           >
                              Estado <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="estado"
                              className="input"
                              placeholder="Digite o estado"
                              {...register('state')}
                              value={cepData?.estado || watch('state') || ''}
                              onChange={(e) =>
                                 setValue('state', e.target.value)
                              }
                           />
                           {errors.state && (
                              <p className="text-red-500 text-sm">
                                 {errors.state.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="cidade"
                              className="font-semibold mb-1"
                           >
                              Cidade <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="cidade"
                              className="input"
                              placeholder="Digite a cidade"
                              {...register('city')}
                              value={cepData?.localidade || watch('city') || ''}
                              onChange={(e) => setValue('city', e.target.value)}
                           />
                           {errors.city && (
                              <p className="text-red-500 text-sm">
                                 {errors.city.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="bairro"
                              className="font-semibold mb-1"
                           >
                              Bairro <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="bairro"
                              className="input"
                              placeholder="Digite o bairro"
                              {...register('neighborhood')}
                              value={
                                 cepData?.bairro || watch('neighborhood') || ''
                              }
                              onChange={(e) =>
                                 setValue('neighborhood', e.target.value)
                              }
                           />
                           {errors.neighborhood && (
                              <p className="text-red-500 text-sm">
                                 {errors.neighborhood.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label htmlFor="rua" className="font-semibold mb-1">
                              Rua <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="rua"
                              className="input"
                              placeholder="Logradouro"
                              {...register('street')}
                              value={
                                 cepData?.logradouro || watch('street') || ''
                              }
                              onChange={(e) =>
                                 setValue('street', e.target.value)
                              }
                           />
                           {errors.street && (
                              <p className="text-red-500 text-sm">
                                 {errors.street?.message}
                              </p>
                           )}
                        </div>

                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="numero"
                              className="font-semibold mb-1"
                           >
                              Número <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="text"
                              id="numero"
                              className="input"
                              placeholder="Digite o número"
                              {...register('number')}
                           />
                           {errors.number && (
                              <p className="text-red-500 text-sm">
                                 {errors.number?.message}
                              </p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col flex-1 min-w-[250px]">
                           <label
                              htmlFor="complemento"
                              className="font-semibold mb-1"
                           >
                              Complemento
                           </label>
                           <input
                              type="text"
                              id="complemento"
                              className="input"
                              placeholder="Bloco, apartamento..."
                              {...register('complement')}
                              value={
                                 cepData?.complemento ||
                                 watch('complement') ||
                                 ''
                              }
                              onChange={(e) =>
                                 setValue('complement', e.target.value)
                              }
                           />
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

export default Register;
