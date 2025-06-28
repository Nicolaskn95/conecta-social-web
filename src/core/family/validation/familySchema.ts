import { object, string, boolean, enum as zodEnum, ZodType } from 'zod';
import { IFamily } from '../model/IFamily';

// Helper function to extract only digits from a string
const extractDigits = (value: string): string => value.replace(/\D/g, '');

export enum FamilyStatus {
   ATIVO = 'Ativo',
   CANCELADO = 'Cancelado',
}

export const familySchema: ZodType<IFamily> = object({
   id: string().optional(),
   name: string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome não pode ter mais de 100 caracteres'),

   street: string()
      .min(3, 'Rua é obrigatória')
      .max(200, 'Rua não pode ter mais de 200 caracteres'),

   number: string()
      .min(1, 'Número é obrigatório')
      .max(10, 'Número não pode ter mais de 10 caracteres'),

   neighbourhood: string()
      .min(3, 'Bairro é obrigatório')
      .max(100, 'Bairro não pode ter mais de 100 caracteres'),

   city: string()
      .min(2, 'Cidade é obrigatória')
      .max(100, 'Cidade não pode ter mais de 100 caracteres'),

   uf: string()
      .min(2, 'UF é obrigatório')
      .max(2, 'UF deve ter 2 caracteres')
      .regex(/^[A-Z]{2}$/, 'UF deve ser a sigla em maiúsculas'),

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

   status: zodEnum([FamilyStatus.ATIVO, FamilyStatus.CANCELADO], {
      errorMap: () => ({ message: 'Status inválido' }),
   }),
});
