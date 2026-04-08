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
   complement: string;
   status: EventStatus;

   // active:
   logs?: ILogVolunteerEvent[];
}

// Interface for form handling where date is a string
export interface IEventForm extends Omit<IEvent, 'date'> {
   date: string;
}

export interface ILogVolunteerEvent {
   id: string;
   event_id: string;
   volunteer_id: string;
   created_at: Date;
   updated_at: Date;
}

export enum EventStatus {
   SCHEDULED = 'SCHEDULED',
   COMPLETED = 'COMPLETED',
   CANCELED = 'CANCELED',
}

export interface EventStatusOption {
   label: string;
   value: EventStatus;
}

export const EVENT_STATUS_OPTIONS: EventStatusOption[] = [
   { label: 'Aberto', value: EventStatus.SCHEDULED },
   { label: 'Concluído', value: EventStatus.COMPLETED },
   { label: 'Cancelado', value: EventStatus.CANCELED },
];

const normalizeStatus = (value: string): string =>
   value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();

export const parseEventStatus = (
   status?: string | null
): EventStatus | null => {
   if (!status) return null;

   const normalized = normalizeStatus(status);

   if (normalized.includes('COMPLET') || normalized.includes('CONCLUID')) {
      return EventStatus.COMPLETED;
   }

   if (normalized.includes('CANCEL')) {
      return EventStatus.CANCELED;
   }

   if (normalized.includes('SCHEDULED') || normalized.includes('ABERTO') || normalized.includes('ATIVO')) {
      return EventStatus.SCHEDULED;
   }

   return null;
};

export const normalizeEventStatusValue = (
   status?: string | null,
   fallback: EventStatus = EventStatus.SCHEDULED
): EventStatus => parseEventStatus(status) ?? fallback;

export const getEventStatusLabel = (status?: string | null): string => {
   const parsed = parseEventStatus(status);

   if (parsed === EventStatus.COMPLETED) return 'Concluído';
   if (parsed === EventStatus.CANCELED) return 'Cancelado';
   if (parsed === EventStatus.SCHEDULED) return 'Aberto';

   return status ?? 'Desconhecido';
};
