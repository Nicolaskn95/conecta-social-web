import { XIcon, CheckIcon, ExclamationMarkIcon } from '@phosphor-icons/react';
import { EventStatus } from '@/core/event/model/IEvent';
import { FamilyStatus } from '@/core/family/model/IFamily';

interface StatusProps {
   status: EventStatus | FamilyStatus;
   selected?: boolean;
}

// Type guards
const isEventStatus = (
   status: EventStatus | FamilyStatus
): status is EventStatus => {
   return Object.values(EventStatus).includes(status as EventStatus);
};

const getStatusStyles = (status: EventStatus | FamilyStatus): string => {
   if (isEventStatus(status)) {
      switch (status) {
         case EventStatus.CANCELADO:
            return 'bg-warning_light text-danger border border-warning_light';
         case EventStatus.ABERTO:
            return 'bg-tertiary text-primary border border-tertiary';
         case EventStatus.CONCLUIDO:
            return 'bg-success_light text-success border border-success_light';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   } else {
      switch (status) {
         case FamilyStatus.ATIVO:
            return 'bg-success_light text-success border border-success_light';
         case FamilyStatus.CANCELADO:
            return 'bg-warning_light text-danger border border-warning_light';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   }
};

const getStatusIcon = (status: EventStatus | FamilyStatus) => {
   if (isEventStatus(status)) {
      switch (status) {
         case EventStatus.CANCELADO:
            return <XIcon size={20} className="text-danger mr-1" />;
         case EventStatus.ABERTO:
            return (
               <ExclamationMarkIcon size={20} className="text-primary mr-1" />
            );
         case EventStatus.CONCLUIDO:
            return <CheckIcon size={20} className="text-green-600 mr-1" />;
         default:
            return null;
      }
   } else {
      switch (status) {
         case FamilyStatus.ATIVO:
            return <CheckIcon size={20} className="text-green-600 mr-1" />;
         case FamilyStatus.CANCELADO:
            return <XIcon size={20} className="text-danger mr-1" />;
         default:
            return null;
      }
   }
};

const getStatusText = (status: EventStatus | FamilyStatus): string => {
   if (isEventStatus(status)) {
      switch (status) {
         case EventStatus.CANCELADO:
            return 'Cancelado';
         case EventStatus.ABERTO:
            return 'Aberto';
         case EventStatus.CONCLUIDO:
            return 'Concluído';
         default:
            return 'Desconhecido';
      }
   } else {
      switch (status) {
         case FamilyStatus.ATIVO:
            return 'Ativo';
         case FamilyStatus.CANCELADO:
            return 'Cancelado';
         default:
            return 'Desconhecido';
      }
   }
};

export function Status({ status, selected }: StatusProps) {
   return (
      <div
         className={`flex items-center justify-center gap-1 px-3 py-1 rounded-md font-medium text-sm mb-2 w-32 ${getStatusStyles(
            status
         )} ${selected ? 'ring-2 ring-blue-400' : ''}`}
         style={{ minWidth: '8rem', maxWidth: '10rem' }}
      >
         {getStatusIcon(status)}
         {getStatusText(status)}
      </div>
   );
}

export default Status;
