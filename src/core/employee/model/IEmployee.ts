export interface IEmployee {
   id?: string;
   name: string;
   surname: string;
   birth_date: Date;
   cpf: string;
   email: string;
   phone: string;
   password: string;

   role: EmployeeRole;

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
   logs?: ILogEmployeeEvent[];
}

export interface ILogEmployeeEvent {
   id?: string;
   id_employee: string;
   id_event: string;
   log_message: string;
}

export enum EmployeeRole {
   ADMIN = 'ADMIN',
   VOLUNTEER = 'VOLUNTEER',
   MANAGER = 'MANAGER',
}
