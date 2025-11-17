import { object, string, ZodType } from 'zod';
import { IFamily } from '../model/IFamily';

// Helper function to extract only digits from a string
const extractDigits = (value: string): string => value.replace(/\D/g, '');

export const familySchema: ZodType<Omit<IFamily, 'id' | 'created_at' | 'updated_at'>> = object({
   name: string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome não pode ter mais de 100 caracteres'),

   street: string()
      .min(3, 'Rua é obrigatória')
      .max(200, 'Rua não pode ter mais de 200 caracteres'),

   number: string()
      .min(1, 'Número é obrigatório')
      .max(10, 'Número não pode ter mais de 10 caracteres'),

   neighborhood: string()
      .min(3, 'Bairro é obrigatório')
      .max(100, 'Bairro não pode ter mais de 100 caracteres'),

   city: string()
      .min(2, 'Cidade é obrigatória')
      .max(100, 'Cidade não pode ter mais de 100 caracteres'),

   state: string()
      .min(2, 'Estado é obrigatório')
      .max(100, 'Estado não pode ter mais de 100 caracteres'),

   cep: string()
      .refine(
         (val) => {
            const digits = extractDigits(val);
            return digits.length === 8;
         },
         {
            message: 'CEP deve ter exatamente 8 dígitos',
         }
      )
      .refine(
         (val) => {
            const digits = extractDigits(val);
            return /^\d{8}$/.test(digits);
         },
         {
            message: 'CEP deve conter apenas números',
         }
      ),
});
