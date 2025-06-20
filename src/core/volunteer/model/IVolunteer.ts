export interface IVolunteer {
   id?: string;
   name: string;
   surname: string;
   birth_date: Date;
   cpf: string;
   email: string;
   phone: string;
   password: string;

   role: VolunteerRole;

   cep: string;
   street: string;
   neighborhood: string;
   number: string;
   city: string;
   uf: string;
   state: string;
   complement?: string;

   // active: boolean;
   created_at?: Date;
   updated_at?: Date;
   logs?: ILogVolunteerEvent[];
}

export interface ILogVolunteerEvent {
   id?: string;
   id_volunteer: string;
   id_event: string;
   log_message: string;
}

export enum VolunteerRole {
   ADMIN = 'ADMIN',
   VOLUNTEER = 'VOLUNTEER',
   MANAGER = 'MANAGER',
}
