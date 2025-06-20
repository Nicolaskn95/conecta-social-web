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
   status: string;

   // active:
   logs?: ILogEmployeeEvent[];
}

// Interface for form handling where date is a string
export interface IEventForm extends Omit<IEvent, 'date'> {
   date: string;
}

export interface ILogEmployeeEvent {
   id: string;
   event_id: string;
   employee_id: string;
   created_at: Date;
   updated_at: Date;
}

export enum EventStatus {
   CANCELADO = 'Cancelado',
   ABERTO = 'Aberto',
   CONCLUIDO = 'Concluído',
}
