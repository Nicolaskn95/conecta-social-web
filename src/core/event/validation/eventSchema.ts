import { object, string } from 'zod';

export const eventSchema = object({
   title: string().min(1, 'Title is required'),
   eventDate: string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
   }),
   cep: string().length(8, 'CEP must be exactly 8 characters'),
   address: string().min(1, 'Address is required'),
   state: string().min(1, 'State is required'),
   number: string().min(1, 'Number is required'),
   embedPostInstagram: string().min(1, 'Instagram embed post is required'),
});
