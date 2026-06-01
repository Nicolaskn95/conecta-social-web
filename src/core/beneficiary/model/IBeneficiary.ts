import { IFamily } from '@/core/family/model/IFamily';

export interface IBeneficiary {
   id?: string;
   id_family: string;
   family?: IFamily;
   name: string;
   surname: string;
   birth_date: string;
   cpf?: string | null;
   rg?: string | null;
   email?: string | null;
   phone?: string | null;
   has_disability: boolean;
   disability_details?: string | null;
   gender: string;
   active?: boolean;
   created_at?: string | Date | null;
   updated_at?: string | Date | null;
}

export type BeneficiaryCreatePayload = Omit<
   IBeneficiary,
   'id' | 'created_at' | 'updated_at' | 'family'
>;

export type BeneficiaryUpdatePayload = Partial<BeneficiaryCreatePayload>;
