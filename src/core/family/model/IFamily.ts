export interface IFamily {
   id?: string;
   name: string;
   street: string;
   number: string;
   neighbourhood: string;
   city: string;
   uf: string;
   state: string;
   cep: string;
   status: FamilyStatus;
   active: boolean;
   created_at?: Date;
}

export enum FamilyStatus {
   ATIVO = 'Ativo',
   CANCELADO = 'Cancelado',
}
