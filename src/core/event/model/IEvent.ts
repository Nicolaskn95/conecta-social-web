import { IEmployee } from '@/core/employee';

export interface IEvent {
   id?: string;
   name: string;
   description?: string;
   greeting_description?: string;
   date: Date;

   attendance?: number; //pessoas participantes
   embedded_instagram?: string;

   cep: string;
   state: string;
   city: string;
   street: string;
   neighborhood: string;
   number: string;
   uf: string;
   complement: string;

   // active:
   status: string;
   logs: ILogEmployeeEvent[];
}

export interface ILogEmployeeEvent {
   id: string;
   event_id: string;
   employee_id: string;
   created_at: Date;
   updated_at: Date;
}
