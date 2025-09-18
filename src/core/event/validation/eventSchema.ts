import { object, string, date, ZodType } from 'zod';
import { IEventForm } from '../model/IEvent';

// Helper function to extract only digits from a string
const extractDigits = (value: string): string => value.replace(/\D/g, '');

export const eventSchema: ZodType<IEventForm> = object({
   name: string()
      .min(3, 'O título deve ter pelo menos 3 caracteres')
      .max(100, 'O título não pode ter mais de 100 caracteres'),

   description: string()
      .min(10, 'A descrição deve ter pelo menos 10 caracteres')
      .max(1000, 'A descrição não pode ter mais de 1000 caracteres'),

   date: string()
      .refine((val) => !isNaN(Date.parse(val)), {
         message: 'Data inválida',
      })
      .refine((val) => new Date(val) > new Date(), {
         message: 'A data do evento deve ser futura',
      }),

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

   uf: string()
      .min(2, 'UF é obrigatório')
      .max(2, 'UF deve ter 2 caracteres')
      .regex(/^[A-Z]{2}$/, 'UF deve ser a sigla em maiúsculas'),

   state: string()
      .min(2, 'Estado é obrigatório')
      .max(100, 'Estado não pode ter mais de 100 caracteres'),

   city: string()
      .min(2, 'Cidade é obrigatória')
      .max(100, 'Cidade não pode ter mais de 100 caracteres'),

   street: string()
      .min(3, 'Rua é obrigatória')
      .max(200, 'Rua não pode ter mais de 200 caracteres'),

   number: string()
      .min(1, 'Número é obrigatório')
      .max(10, 'Número não pode ter mais de 10 caracteres'),

   neighborhood: string()
      .min(3, 'Bairro é obrigatório')
      .max(100, 'Bairro não pode ter mais de 100 caracteres'),

   complement: string().max(
      100,
      'Complemento não pode ter mais de 100 caracteres'
   ),

   embedded_instagram: string()
      .regex(/<blockquote class="instagram-media".*<\/blockquote>/, {
         message: 'Código de embed inválido',
      })
      .optional(),

   status: string()
      .min(5, 'Status é obrigatório')
      .max(20, 'Status não pode ter mais de 20 caracteres')
      .refine((val) => ['Aberto', 'Cancelado', 'Concluído'].includes(val), {
         message: 'Status deve ser "Aberto", "Cancelado" ou "Concluído"',
      }),
   greeting_description: string().optional().default(''),
});
