import { object, string, number, boolean, ZodType } from 'zod';
import { IDonation } from '../model/IDonation';
// TODO: ALTERAR current_quantity, ACTIVE E AVAILABLE PARA OPCIONAL
// UGLY CODE: ALTERAR current_quantity, ACTIVE E AVAILABLE PARA OPCIONAL
export const donationSchema: ZodType<
   Omit<IDonation, 'id' | 'created_at' | 'updated_at' | 'category'>
> = object({
   category_id: string().uuid('ID da categoria deve ser um UUID válido'),
   name: string()
      .min(2, 'Nome é obrigatório')
      .max(60, 'Nome não pode ter mais de 60 caracteres'),
   description: string()
      .max(250, 'Descrição não pode ter mais de 250 caracteres')
      .nullable()
      .optional(),
   initial_quantity: number()
      .int('Quantidade inicial deve ser um número inteiro')
      .min(0, 'Quantidade inicial não pode ser negativa'),
   current_quantity: number()
      .int('Quantidade atual deve ser um número inteiro')
      .min(0, 'Quantidade atual não pode ser negativa'),
   donator_name: string()
      .max(90, 'Nome do doador não pode ter mais de 90 caracteres')
      .nullable()
      .optional(),
   available: boolean().optional(),
   gender: string()
      .max(10, 'Gênero não pode ter mais de 10 caracteres')
      .nullable()
      .optional(),
   size: string()
      .max(20, 'Tamanho não pode ter mais de 20 caracteres')
      .nullable()
      .optional(),
   active: boolean().optional(),
});
