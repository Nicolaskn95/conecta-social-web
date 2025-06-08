import { XIcon, CheckIcon, ExclamationMarkIcon } from '@phosphor-icons/react';
import { EventStatus } from '../../core/event/model/IEvent';

interface StatusProps {
   status: EventStatus;
   selected?: boolean;
}

const statusStyles = {
   [EventStatus.CANCELADO]:
      'bg-warning_light text-danger border border-warning_light',
   [EventStatus.ABERTO]: 'bg-tertiary text-primary border border-tertiary',
   [EventStatus.CONCLUIDO]:
      'bg-success_light text-success border border-success_light',
};

const iconMap = {
   [EventStatus.CANCELADO]: <XIcon size={20} className="text-danger mr-1" />,
   [EventStatus.ABERTO]: (
      <ExclamationMarkIcon size={20} className="text-primary mr-1" />
   ),
   [EventStatus.CONCLUIDO]: (
      <CheckIcon size={20} className="text-green-600 mr-1" />
   ),
};

export function Status({ status, selected }: StatusProps) {
   return (
      <div
         className={`flex items-center gap-1 px-3 py-1 rounded-md font-medium text-sm mb-2 ${
            statusStyles[status]
         } ${selected ? 'ring-2 ring-blue-400' : ''}`}
      >
         {iconMap[status]}
         {status}
      </div>
   );
}

export default Status;
