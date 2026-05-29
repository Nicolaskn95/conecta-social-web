import { z, ZodType } from 'zod';
import {
   BeneficiaryCreatePayload,
   BeneficiaryUpdatePayload,
} from '@/core/beneficiary/model/IBeneficiary';

const optionalTrimmedString = (max: number) =>
   z
      .string()
      .trim()
      .max(max)
      .optional()
      .or(z.literal(''))
      .transform((value) => (value === '' ? undefined : value));

const optionalCpf = z
   .string()
   .trim()
   .optional()
   .or(z.literal(''))
   .transform((value) => {
      if (!value) {
         return undefined;
      }

      const digits = value.replace(/\D/g, '');
      return digits;
   })
   .refine((value) => !value || /^\d{11}$/.test(value), {
      message: 'CPF deve conter 11 dígitos',
   });

const beneficiaryBaseSchema = z.object({
   id_family: z.string().uuid('Selecione uma família válida'),
   name: z
      .string()
      .trim()
      .min(1, 'Nome é obrigatório')
      .max(30, 'Nome não pode ter mais de 30 caracteres'),
   surname: z
      .string()
      .trim()
      .min(1, 'Sobrenome é obrigatório')
      .max(60, 'Sobrenome não pode ter mais de 60 caracteres'),
   birth_date: z
      .string()
      .trim()
      .min(1, 'Data de nascimento é obrigatória')
      .refine((value) => !Number.isNaN(new Date(value).getTime()), {
         message: 'Data de nascimento inválida',
      }),
   cpf: optionalCpf,
   rg: optionalTrimmedString(15),
   email: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .transform((value) => (value === '' ? undefined : value))
      .refine((value) => !value || z.string().email().safeParse(value).success, {
         message: 'E-mail inválido',
      }),
   phone: optionalTrimmedString(15),
   has_disability: z.boolean(),
   disability_details: optionalTrimmedString(90),
   gender: z
      .string()
      .trim()
      .min(1, 'Gênero é obrigatório')
      .max(30, 'Gênero não pode ter mais de 30 caracteres'),
   active: z.boolean().optional(),
});

export const beneficiaryCreateSchema: ZodType<BeneficiaryCreatePayload> =
   beneficiaryBaseSchema.superRefine((value, ctx) => {
      if (value.has_disability && !value.disability_details) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['disability_details'],
            message: 'Informe os detalhes da deficiência',
         });
      }
   });

export const beneficiaryUpdateSchema: ZodType<BeneficiaryUpdatePayload> =
   beneficiaryBaseSchema.partial().superRefine((value, ctx) => {
      if (value.has_disability === true && !value.disability_details) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['disability_details'],
            message: 'Informe os detalhes da deficiência',
         });
      }
   });
