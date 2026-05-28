import { boolean, number, object, string, ZodType } from 'zod';
import { IDonationToFamily } from '../model/IDonationToFamily';

export const donationToFamilySchema: ZodType<
   Omit<IDonationToFamily, 'id' | 'created_at' | 'updated_at' | 'donation' | 'family'>
> = object({
   id_donation: string().uuid('ID da doação deve ser um UUID válido'),
   id_family: string().uuid('ID da família deve ser um UUID válido'),
   quantity: number()
      .int('Quantidade deve ser um número inteiro')
      .min(1, 'Quantidade deve ser maior que zero'),
   update_message: string()
      .max(250, 'Observação não pode ter mais de 250 caracteres')
      .nullable()
      .optional(),
   active: boolean().optional(),
});
