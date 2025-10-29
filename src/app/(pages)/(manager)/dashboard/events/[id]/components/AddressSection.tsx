import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { IEventForm } from '@/core/event/model/IEvent';

interface AddressSectionProps {
   register: UseFormRegister<IEventForm>;
   errors: FieldErrors<IEventForm>;
   handleCepBlur: () => Promise<void>;
}

export default function AddressSection({
   register,
   errors,
   handleCepBlur,
}: AddressSectionProps) {
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-bold text-gray-800">Endereço</h2>
         <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-1 min-w-[200px]">
               <label htmlFor="cep" className="font-semibold mb-1">
                  CEP <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="cep"
                  className="input"
                  placeholder="00000-000"
                  {...register('cep')}
                  onBlur={handleCepBlur}
               />
               {errors.cep && (
                  <p className="text-red-500 text-sm">{errors.cep.message}</p>
               )}
            </div>
            <div className="flex flex-col flex-1 min-w-[200px]">
               <label htmlFor="street" className="font-semibold mb-1">
                  Rua <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="street"
                  className="input"
                  placeholder="Nome da rua"
                  {...register('street')}
               />
               {errors.street && (
                  <p className="text-red-500 text-sm">
                     {errors.street.message}
                  </p>
               )}
            </div>
            <div className="flex flex-col w-32">
               <label htmlFor="number" className="font-semibold mb-1">
                  Número <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="number"
                  className="input"
                  placeholder="Nº"
                  {...register('number')}
               />
               {errors.number && (
                  <p className="text-red-500 text-sm">
                     {errors.number.message}
                  </p>
               )}
            </div>
         </div>
         <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-1 min-w-[200px]">
               <label htmlFor="neighborhood" className="font-semibold mb-1">
                  Bairro <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="neighborhood"
                  className="input"
                  placeholder="Nome do bairro"
                  {...register('neighborhood')}
               />
               {errors.neighborhood && (
                  <p className="text-red-500 text-sm">
                     {errors.neighborhood.message}
                  </p>
               )}
            </div>
            <div className="flex flex-col flex-1 min-w-[200px]">
               <label htmlFor="complement" className="font-semibold mb-1">
                  Complemento
               </label>
               <input
                  type="text"
                  id="complement"
                  className="input"
                  placeholder="Complemento (opcional)"
                  {...register('complement')}
               />
               {errors.complement && (
                  <p className="text-red-500 text-sm">
                     {errors.complement.message}
                  </p>
               )}
            </div>
         </div>
         <div className="flex flex-wrap gap-4">
            <div className="flex flex-col flex-1 min-w-[200px]">
               <label htmlFor="city" className="font-semibold mb-1">
                  Cidade <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="city"
                  className="input"
                  placeholder="Nome da cidade"
                  {...register('city')}
               />
               {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
               )}
            </div>
            <div className="flex flex-col flex-1 min-w-[200px]">
               <label htmlFor="state" className="font-semibold mb-1">
                  Estado <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="state"
                  className="input"
                  placeholder="Nome do estado"
                  {...register('state')}
               />
               {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
               )}
            </div>
         </div>
      </div>
   );
}
