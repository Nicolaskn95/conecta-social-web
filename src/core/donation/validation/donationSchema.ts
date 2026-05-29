import { boolean, number, object, string, z, ZodType } from 'zod';
import {
   DonationCreatePayload,
   DonationStockAdjustmentPayload,
   DonationStockAdjustmentReason,
   DonationUpdatePayload,
} from '../model/IDonation';

const donationStringFields = {
   description: string()
      .max(250, 'Descrição não pode ter mais de 250 caracteres')
      .nullable()
      .optional(),
   donator_name: string()
      .max(90, 'Nome do doador não pode ter mais de 90 caracteres')
      .nullable()
      .optional(),
   gender: string()
      .max(10, 'Gênero não pode ter mais de 10 caracteres')
      .nullable()
      .optional(),
   size: string()
      .max(20, 'Tamanho não pode ter mais de 20 caracteres')
      .nullable()
      .optional(),
};

export const donationCreateSchema: ZodType<DonationCreatePayload> = object({
   category_id: string().uuid('ID da categoria deve ser um UUID válido'),
   name: string({
      required_error: 'Nome é obrigatório',
      invalid_type_error: 'Nome é obrigatório',
   })
      .min(2, 'Nome é obrigatório')
      .max(60, 'Nome não pode ter mais de 60 caracteres'),
   initial_quantity: number({
      required_error: 'Quantidade inicial é obrigatória',
      invalid_type_error: 'Quantidade inicial é obrigatória',
   })
      .int('Quantidade inicial deve ser um número inteiro')
      .min(1, 'Quantidade inicial deve ser maior que zero'),
   ...donationStringFields,
   active: boolean().optional(),
});

export const donationUpdateSchema: ZodType<DonationUpdatePayload> = object({
   category_id: string()
      .uuid('ID da categoria deve ser um UUID válido')
      .optional(),
   name: string()
      .min(2, 'Nome é obrigatório')
      .max(60, 'Nome não pode ter mais de 60 caracteres')
      .optional(),
   ...donationStringFields,
   active: boolean().optional(),
});

const stockAdjustmentReasons = [
   'SPOILAGE',
   'LOSS',
   'DAMAGE',
   'EXPIRATION',
   'INVENTORY_CORRECTION',
   'OTHER',
] as const satisfies readonly DonationStockAdjustmentReason[];

export const donationStockAdjustmentSchema: ZodType<DonationStockAdjustmentPayload> =
   object({
      delta_quantity: number({
         required_error: 'Informe o ajuste de estoque',
         invalid_type_error: 'Informe um número inteiro',
      })
         .int('Informe um número inteiro')
         .refine((value) => value !== 0, {
            message: 'O ajuste deve ser diferente de zero',
         }),
      reason: z.enum(stockAdjustmentReasons, {
         required_error: 'Selecione o motivo do ajuste',
      }),
      note: string()
         .max(500, 'A observação não pode ter mais de 500 caracteres')
         .optional(),
   }).superRefine((data, ctx) => {
      if (data.reason === 'OTHER' && !data.note?.trim()) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['note'],
            message: 'A observação é obrigatória quando o motivo é Outro',
         });
      }
   });

export const donationSchema = donationCreateSchema;
