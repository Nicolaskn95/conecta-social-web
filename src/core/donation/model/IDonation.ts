export interface ICategory {
   id: string;
   name: string;
   measure_unity: string;
   active: boolean;
   created_at: Date;
}

export interface IDonation {
   id?: string;
   category_id: string;
   category?: ICategory;
   name: string;
   description?: string | null;
   initial_quantity: number;
   current_quantity: number;
   donator_name?: string | null;
   gender?: string | null;
   size?: string | null;
   active?: boolean;
   available?: boolean;
   created_at?: Date | null;
   updated_at?: Date | null;
}

export enum Category {
   VESTIMENTA = 'Vestimenta',
   ALIMENTO = 'Alimento',
   BRINQUEDO = 'Brinquedo',
}
