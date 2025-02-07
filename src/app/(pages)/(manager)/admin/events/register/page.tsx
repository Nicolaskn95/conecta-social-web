'use client';

import { eventSchema, IEvent } from '@/core/event';
import useAPI from '@/data/hooks/useAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { Question } from '@phosphor-icons/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

function Register() {
   // Usando o React Hook Form com o Zod Resolver
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IEvent>({
      resolver: zodResolver(eventSchema),
   });

   const { httpPost } = useAPI();

   const submit: SubmitHandler<IEvent> = (data) => {
      console.log(data);
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center p-2 mb-4">
            <p className="font-bold">{'Inicio > Eventos > Cadastro'}</p>
         </div>
         <div className="p-6 bg-white rounded-3xl shadow-md border border-[#4AA1D3] space-y-6">
            <form onSubmit={handleSubmit(submit)}>
               {/* Título do evento */}
               <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="titulo" className="font-semibold mb-1">
                        Título do evento
                     </label>
                     <input
                        type="text"
                        id="titulo"
                        className="input"
                        placeholder="Informe o título do evento"
                        {...register('title')}
                     />
                     {errors.title && (
                        <p className="text-red-500">{errors.title.message}</p>
                     )}{' '}
                     {/* Exibindo erros */}
                  </div>

                  {/* CEP */}
                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="cep" className="font-semibold mb-1">
                        CEP
                     </label>
                     <input
                        type="text"
                        id="cep"
                        className="input"
                        placeholder="Digite o CEP"
                        {...register('cep')}
                     />
                     {errors.cep && (
                        <p className="text-red-500">{errors.cep.message}</p>
                     )}
                  </div>
               </div>

               {/* Descrição e Rua */}
               <div className="flex flex-wrap gap-4">
                  {/* <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="descricao" className="font-semibold mb-1">
                        Descrição do evento
                     </label>
                     <input
                        type="text"
                        id="descricao"
                        className="input"
                        placeholder="Breve descrição do evento"
                        {...register('')} 
                     />
                     {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                  </div> */}

                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="rua" className="font-semibold mb-1">
                        Rua
                     </label>
                     <input
                        type="text"
                        id="rua"
                        className="input"
                        placeholder="Logradouro"
                        {...register('address')}
                     />
                     {errors.address && (
                        <p className="text-red-500">
                           {errors.address?.message}
                        </p>
                     )}
                  </div>
               </div>

               {/* Data e Número */}
               <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="data" className="font-semibold mb-1">
                        Data do Evento
                     </label>
                     <input
                        type="date"
                        id="data"
                        className="input"
                        {...register('eventDate')}
                     />
                     {errors.eventDate && (
                        <p className="text-red-500">
                           {errors.eventDate.message}
                        </p>
                     )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="numero" className="font-semibold mb-1">
                        Número
                     </label>
                     <input
                        type="text"
                        id="numero"
                        className="input"
                        placeholder="Digite o número"
                        {...register('number')}
                     />
                     {errors.number && (
                        <p className="text-red-500">{errors.number?.message}</p>
                     )}
                  </div>
               </div>

               {/* Complemento e Instagram */}
               <div className="flex flex-wrap gap-4">
                  {/* <div className="flex flex-col flex-1 min-w-[250px]">
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
                        {...register('')} 
                     />
                  </div> */}

                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="instagram" className="font-semibold mb-1">
                        Post do Instagram (embed)
                     </label>
                     <input
                        type="text"
                        id="instagram"
                        className="input"
                        placeholder="Insira o link do post do Instagram"
                        {...register('embedPostInstagram')}
                     />
                     {errors.embedPostInstagram && (
                        <p className="text-red-500">
                           {errors.embedPostInstagram.message}
                        </p>
                     )}
                  </div>
               </div>

               {/* Estado e Cidade */}
               <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="estado" className="font-semibold mb-1">
                        Estado
                     </label>
                     <input
                        type="text"
                        id="estado"
                        className="input"
                        placeholder="Digite o estado"
                        {...register('state')}
                     />
                     {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                     )}
                  </div>

                  {/* <div className="flex flex-col flex-1 min-w-[250px]">
                     <label htmlFor="cidade" className="font-semibold mb-1">
                        Cidade
                     </label>
                     <input
                        type="text"
                        id="cidade"
                        className="input"
                        placeholder="Digite a cidade"
                        {...register('city')} 
                     />
                     {errors.city && (
                        <p className='text-red-500'>{errors.address?.city.message}</p>
                     )}
                  </div> */}
               </div>

               {/* Botões de ação */}
               <div className="flex justify-end gap-4">
                  <button type="button" className="btn-danger w-32 text-white">
                     Cancelar
                  </button>
                  <button type="submit" className="btn-primary w-32">
                     Cadastrar
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Register;
