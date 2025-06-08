import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { IEventForm } from '@/core/event/model/IEvent';

interface SocialMediaSectionProps {
   register: UseFormRegister<IEventForm>;
   errors: FieldErrors<IEventForm>;
}

export default function SocialMediaSection({
   register,
   errors,
}: SocialMediaSectionProps) {
   return (
      <div className="space-y-4">
         <h2 className="text-xl font-bold text-gray-800">Mídia Social</h2>
         <div className="flex flex-col">
            <label htmlFor="instagram" className="font-semibold mb-1">
               Post do Instagram (embed)
            </label>
            <input
               type="text"
               id="instagram"
               className="input"
               placeholder="Insira o link do post do Instagram"
               {...register('embedded_instagram')}
            />
            {errors.embedded_instagram && (
               <p className="text-red-500 text-sm">
                  {errors.embedded_instagram.message}
               </p>
            )}
         </div>
      </div>
   );
}
