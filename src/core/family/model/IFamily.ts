export interface IFamily {
   monthly_income_cents?: number | null;
   housing_description?: string | null;
   preferred_delivery_mode?: "PICKUP" | "DELIVERY" | null;
   id?: string;
   name: string;
   street: string;
   number: string;
   neighborhood: string;
   city: string;
   state: string;
   cep: string;
   active?: boolean;
   created_at?: Date;
   updated_at?: Date;
}
