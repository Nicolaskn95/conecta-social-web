import { object, string, date, enum as zodEnum, ZodType } from 'zod';
import { IVolunteer, VolunteerRole } from '../model/IVolunteer';

// Helper function to extract only digits from a string
const extractDigits = (value: string): string => value.replace(/\D/g, '');

export const volunteerSchema = object({
   id: string().optional(),

   name: string()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome não pode ter mais de 100 caracteres'),

   surname: string()
      .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
      .max(100, 'Sobrenome não pode ter mais de 100 caracteres'),

   birth_date: date().refine(
      (val) => {
         const today = new Date();
         const age = today.getFullYear() - val.getFullYear();
         const monthDiff = today.getMonth() - val.getMonth();

         if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < val.getDate())
         ) {
            return age - 1 >= 16;
         }
         return age >= 16;
      },
      {
         message: 'Voluntário deve ter pelo menos 16 anos',
      }
   ),

   cpf: string()
      .refine(
         (val) => {
            const digits = extractDigits(val);
            return digits.length === 11;
         },
         {
            message: 'CPF deve ter exatamente 11 dígitos',
         }
      )
      .refine(
         (val) => {
            const digits = extractDigits(val);
            return /^\d{11}$/.test(digits);
         },
         {
            message: 'CPF deve conter apenas números',
         }
      )
      .refine(
         (val) => {
            const digits = extractDigits(val);

            // Basic CPF validation
            if (digits.length !== 11) return false;

            // Check if all digits are the same
            if (/^(\d)\1{10}$/.test(digits)) return false;

            // Validate first digit
            let sum = 0;
            for (let i = 0; i < 9; i++) {
               sum += parseInt(digits[i]) * (10 - i);
            }
            let remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(digits[9])) return false;

            // Validate second digit
            sum = 0;
            for (let i = 0; i < 10; i++) {
               sum += parseInt(digits[i]) * (11 - i);
            }
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(digits[10])) return false;

            return true;
         },
         {
            message: 'CPF inválido',
         }
      ),

   email: string()
      .email('Email deve ter um formato válido')
      .max(255, 'Email não pode ter mais de 255 caracteres'),

   phone: string()
      .min(10, 'Telefone deve ter pelo menos 10 caracteres')
      .max(15, 'Telefone não pode ter mais de 15 caracteres')
      .regex(
         /^[\d\s\-\(\)\+]+$/,
         'Telefone deve conter apenas números, espaços, hífens, parênteses e +'
      ),

   password: string()
      .min(8, 'Senha deve ter pelo menos 8 caracteres')
      .max(100, 'Senha não pode ter mais de 100 caracteres')
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
         'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
      ),

   role: zodEnum(
      [VolunteerRole.ADMIN, VolunteerRole.VOLUNTEER, VolunteerRole.MANAGER],
      {
         errorMap: () => ({ message: 'Função inválida' }),
      }
   ),

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

   street: string()
      .min(3, 'Rua é obrigatória')
      .max(200, 'Rua não pode ter mais de 200 caracteres'),

   neighborhood: string()
      .min(3, 'Bairro é obrigatório')
      .max(100, 'Bairro não pode ter mais de 100 caracteres'),

   number: string()
      .min(1, 'Número é obrigatório')
      .max(10, 'Número não pode ter mais de 10 caracteres'),

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

   complement: string()
      .max(100, 'Complemento não pode ter mais de 100 caracteres')
      .optional(),

   created_at: date().optional(),
   updated_at: date().optional(),
   logs: object({
      id: string().optional(),
      id_volunteer: string(),
      id_event: string(),
      log_message: string()
         .min(1, 'Mensagem do log é obrigatória')
         .max(500, 'Mensagem do log não pode ter mais de 500 caracteres'),
   })
      .array()
      .optional(),
});

// Schema for form data (handles string dates from forms)
export const volunteerFormSchema = object({
   id: string().optional(),

   name: string()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome não pode ter mais de 100 caracteres'),

   surname: string()
      .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
      .max(100, 'Sobrenome não pode ter mais de 100 caracteres'),

   birth_date: string()
      .refine((val) => !isNaN(Date.parse(val)), {
         message: 'Data de nascimento inválida',
      })
      .refine(
         (val) => {
            const birthDate = new Date(val);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (
               monthDiff < 0 ||
               (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
               return age - 1 >= 16;
            }
            return age >= 16;
         },
         {
            message: 'Voluntário deve ter pelo menos 16 anos',
         }
      ),

   cpf: string()
      .refine(
         (val) => {
            const digits = extractDigits(val);
            return digits.length === 11;
         },
         {
            message: 'CPF deve ter exatamente 11 dígitos',
         }
      )
      .refine(
         (val) => {
            const digits = extractDigits(val);
            return /^\d{11}$/.test(digits);
         },
         {
            message: 'CPF deve conter apenas números',
         }
      )
      .refine(
         (val) => {
            const digits = extractDigits(val);

            // Basic CPF validation
            if (digits.length !== 11) return false;

            // Check if all digits are the same
            if (/^(\d)\1{10}$/.test(digits)) return false;

            // Validate first digit
            let sum = 0;
            for (let i = 0; i < 9; i++) {
               sum += parseInt(digits[i]) * (10 - i);
            }
            let remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(digits[9])) return false;

            // Validate second digit
            sum = 0;
            for (let i = 0; i < 10; i++) {
               sum += parseInt(digits[i]) * (11 - i);
            }
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(digits[10])) return false;

            return true;
         },
         {
            message: 'CPF inválido',
         }
      ),

   email: string()
      .email('Email deve ter um formato válido')
      .max(255, 'Email não pode ter mais de 255 caracteres'),

   phone: string()
      .min(10, 'Telefone deve ter pelo menos 10 caracteres')
      .max(15, 'Telefone não pode ter mais de 15 caracteres')
      .regex(
         /^[\d\s\-\(\)\+]+$/,
         'Telefone deve conter apenas números, espaços, hífens, parênteses e +'
      ),

   password: string()
      .min(8, 'Senha deve ter pelo menos 8 caracteres')
      .max(100, 'Senha não pode ter mais de 100 caracteres')
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
         'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
      ),

   role: zodEnum(
      [VolunteerRole.ADMIN, VolunteerRole.VOLUNTEER, VolunteerRole.MANAGER],
      {
         errorMap: () => ({ message: 'Função inválida' }),
      }
   ),

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

   street: string()
      .min(3, 'Rua é obrigatória')
      .max(200, 'Rua não pode ter mais de 200 caracteres'),

   neighborhood: string()
      .min(3, 'Bairro é obrigatório')
      .max(100, 'Bairro não pode ter mais de 100 caracteres'),

   number: string()
      .min(1, 'Número é obrigatório')
      .max(10, 'Número não pode ter mais de 10 caracteres'),

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

   complement: string()
      .max(100, 'Complemento não pode ter mais de 100 caracteres')
      .optional(),
});

// Schema for creating a new volunteer (without id and timestamps)
export const createVolunteerSchema = volunteerSchema.omit({
   id: true,
   created_at: true,
   updated_at: true,
   logs: true,
});

// Schema for updating a volunteer
export const updateVolunteerSchema = volunteerSchema.partial().omit({
   id: true,
   created_at: true,
   updated_at: true,
   logs: true,
});

// Schema for creating a new volunteer from form data
export const createVolunteerFormSchema = volunteerFormSchema.omit({
   id: true,
});

// Schema for updating a volunteer from form data
export const updateVolunteerFormSchema = volunteerFormSchema.partial().omit({
   id: true,
});
