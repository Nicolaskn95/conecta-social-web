import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { IEventForm } from '@/core/event/model/IEvent';

interface BasicInfoSectionProps {
   register: UseFormRegister<IEventForm>;
   errors: FieldErrors<IEventForm>;
}

export default function BasicInfoSection({
   register,
   errors,
}: BasicInfoSectionProps) {
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-bold text-gray-800">
            Informações Básicas
         </h2>
         <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-1 min-w-[250px]">
               <label htmlFor="titulo" className="font-semibold mb-1">
                  Título do evento <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="titulo"
                  className="input"
                  placeholder="Informe o título do evento"
                  {...register('name')}
               />
               {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
               )}
            </div>
            <div className="flex flex-col flex-1 min-w-[250px]">
               <label htmlFor="data" className="font-semibold mb-1">
                  Data do Evento <span className="text-red-500">*</span>
               </label>
               <input
                  type="datetime-local"
                  id="data"
                  className="input"
                  {...register('date')}
               />
               {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
               )}
            </div>
         </div>
         <div className="flex flex-col">
            <label htmlFor="descricao" className="font-semibold mb-1">
               Descrição do evento <span className="text-red-500">*</span>
            </label>
            <textarea
               id="descricao"
               className="input min-h-[100px]"
               placeholder="Descreva detalhadamente o evento"
               {...register('description')}
            />
            {errors.description && (
               <p className="text-red-500 text-sm">
                  {errors.description.message}
               </p>
            )}
         </div>
         <div className="flex flex-col">
            <label
               htmlFor="greeting_description"
               className="font-semibold mb-1"
            >
               Saudação do evento
            </label>
            <textarea
               id="greeting_description"
               className="input min-h-[60px]"
               placeholder="Mensagem de saudação do evento"
               {...register('greeting_description')}
            />
            {errors.greeting_description && (
               <p className="text-red-500 text-sm">
                  {errors.greeting_description.message}
               </p>
            )}
         </div>
         <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-1 min-w-[250px]">
               <label htmlFor="capacidade" className="font-semibold mb-1">
                  Capacidade de Participantes
               </label>
               <input
                  type="number"
                  id="capacidade"
                  className="input"
                  placeholder="Número máximo de participantes"
                  min="1"
                  {...register('attendance')}
               />
               {errors.attendance && (
                  <p className="text-red-500 text-sm">
                     {errors.attendance.message}
                  </p>
               )}
            </div>
            <div className="flex flex-col flex-1 min-w-[250px]">
               <label htmlFor="status" className="font-semibold mb-1">
                  Status <span className="text-red-500">*</span>
               </label>
               <select
                  id="status"
                  className="input"
                  {...register('status')}
                  defaultValue="ativo"
               >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
               </select>
               {errors.status && (
                  <p className="text-red-500 text-sm">
                     {errors.status.message}
                  </p>
               )}
            </div>
         </div>
      </div>
   );
}
