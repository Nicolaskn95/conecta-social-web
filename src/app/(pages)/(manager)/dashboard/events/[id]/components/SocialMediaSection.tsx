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
               Post do Instagram
            </label>
            <input
               type="url"
               id="instagram"
               className="input"
               placeholder="https://www.instagram.com/p/DKZm15CskZp/"
               {...register('embedded_instagram')}
            />
            <p className="text-sm text-gray-500 mt-1">
               Cole aqui o link do post do Instagram (ex:
               https://www.instagram.com/p/DKZm15CskZp/)
            </p>
            {errors.embedded_instagram && (
               <p className="text-red-500 text-sm">
                  {errors.embedded_instagram.message}
               </p>
            )}
         </div>
      </div>
   );
}
