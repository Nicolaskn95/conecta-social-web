import { object, string, date } from 'zod';

export const eventSchema = object({
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
      .length(8, 'CEP deve ter exatamente 8 caracteres')
      .regex(/^\d{8}$/, 'CEP deve conter apenas números'),

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

   complement: string()
      .max(100, 'Complemento não pode ter mais de 100 caracteres')
      .optional(),

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
   greeting_description: string().nullable().optional(),
});
