import { object, string, number, boolean, date } from 'zod';
import { Category } from '../model/IDonation';

export const donationSchema = object({
   id: string().optional(),
   category: string().refine(
      (value) => Object.values(Category).includes(value as Category),
      {
         message: 'Categoria inválida',
      }
   ),
   name: string()
      .min(2, 'Nome é obrigatório')
      .max(100, 'Nome não pode ter mais de 100 caracteres'),
   description: string()
      .min(2, 'Descrição é obrigatória')
      .max(500, 'Descrição não pode ter mais de 500 caracteres'),
   initial_quantity: number()
      .int('Quantidade inicial deve ser um número inteiro')
      .min(0, 'Quantidade inicial não pode ser negativa')
      .nullable(),
   current_quantity: number()
      .int('Quantidade atual deve ser um número inteiro')
      .min(0, 'Quantidade atual não pode ser negativa')
      .nullable(),
   donator_name: string()
      .max(100, 'Nome do doador não pode ter mais de 100 caracteres')
      .nullable(),
   user_updated: string().nullable().optional(),
   system_updated: boolean().optional(),
   available: boolean().optional(),
   gender: string()
      .max(20, 'Gênero não pode ter mais de 20 caracteres')
      .nullable(),
   size: string()
      .max(20, 'Tamanho não pode ter mais de 20 caracteres')
      .nullable(),
   active: boolean().optional(),

   created_at: date().nullable().optional(),
});
