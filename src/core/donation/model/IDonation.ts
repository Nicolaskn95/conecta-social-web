export interface IDonation {
   id?: string;
   category: Category;
   name: string;
   description: string;
   initial_quantity: number | null;
   current_quantity: number | null;
   donator_name: string | null;
   user_updated?: string | null;
   system_updated?: boolean;
   available?: boolean;
   gender: string | null;
   size: string | null;
   active?: boolean;
   //    status: string;
   created_at?: Date | null;
   updated_at?: Date | null;
}
// TERÁ UM CRUD DE CATEGORIAS?

export enum Category {
   VESTIMENTA = 'Vestimenta',
   ALIMENTO = 'Alimento',
   BRINQUEDO = 'Brinquedo',
}
