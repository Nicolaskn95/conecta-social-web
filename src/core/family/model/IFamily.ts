export interface IFamily {
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
