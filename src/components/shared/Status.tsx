import {
   XIcon,
   CheckIcon,
   ExclamationMarkIcon,
   ShoppingCartIcon,
   RobotIcon,
   TShirtIcon,
   IdentificationBadgeIcon,
} from '@phosphor-icons/react';
import {
   EventStatus,
   getEventStatusLabel,
   parseEventStatus,
} from '@/core/event/model/IEvent';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';

interface StatusProps {
   status: string | VolunteerRole;
   selected?: boolean;
}

const isVolunteerRole = (
   status: string | VolunteerRole
): status is VolunteerRole => {
   return Object.values(VolunteerRole).includes(status as VolunteerRole);
};

const normalizeLabel = (value: string): string =>
   value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

const formatGenericLabel = (value: string): string => {
   const trimmed = value.trim();

   if (!trimmed) {
      return 'Desconhecido';
   }

   if (!trimmed.includes('_')) {
      return trimmed;
   }

   return trimmed
      .toLowerCase()
      .split('_')
      .filter(Boolean)
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ');
};

const getStatusStyles = (status: string | VolunteerRole): string => {
   const eventStatus = parseEventStatus(status);

   if (eventStatus) {
      switch (eventStatus) {
         case EventStatus.CANCELED:
            return 'bg-warning_light text-danger border border-warning_light';
         case EventStatus.SCHEDULED:
            return 'bg-tertiary text-primary border border-tertiary';
         case EventStatus.COMPLETED:
            return 'bg-success_light text-success border border-success_light';
         default:
            return 'bg-gray-100 text-gray-800 hover:text-gray-800';
      }
   }

   if (isVolunteerRole(status)) {
      switch (status) {
         case VolunteerRole.ADMIN:
            return 'bg-danger text-white border border-danger';
         case VolunteerRole.MANAGER:
            return 'bg-primary text-white border border-primary';
         case VolunteerRole.VOLUNTEER:
            return 'bg-orange-200 text-orange-800 border border-orange-300';
         default:
            return 'bg-gray-100 text-gray-800 hover:text-gray-800';
      }
   }

   const normalized = normalizeLabel(status);

   if (normalized.includes('alimento')) {
      return 'bg-success_light text-success border border-success_light';
   }

   if (
      normalized.includes('roupa') ||
      normalized.includes('vestimenta') ||
      normalized.includes('calcado') ||
      normalized.includes('calca')
   ) {
      return 'bg-tertiary text-primary border border-tertiary';
   }

   if (normalized.includes('brinquedo')) {
      return 'bg-danger_hover text-danger border border-danger_hover';
   }

   return 'bg-tertiary text-primary border border-tertiary';
};

const getStatusIcon = (
   status: string | VolunteerRole
) => {
   const eventStatus = parseEventStatus(status);

   if (eventStatus) {
      switch (eventStatus) {
         case EventStatus.CANCELED:
            return <XIcon size={20} className="text-danger mr-1" />;
         case EventStatus.SCHEDULED:
            return (
               <ExclamationMarkIcon size={20} className="text-primary mr-1" />
            );
         case EventStatus.COMPLETED:
            return <CheckIcon size={20} className="text-green-600 mr-1" />;
         default:
            return null;
      }
   }

   if (isVolunteerRole(status)) {
      return <IdentificationBadgeIcon size={20} className="mr-1" />;
   }

   const normalized = normalizeLabel(status);

   if (normalized.includes('alimento')) {
      return (
         <ShoppingCartIcon
            size={20}
            className="text-success mr-1"
            weight="fill"
         />
      );
   }

   if (normalized.includes('brinquedo')) {
      return <RobotIcon size={20} className="text-danger mr-1" />;
   }

   if (
      normalized.includes('roupa') ||
      normalized.includes('vestimenta') ||
      normalized.includes('calcado') ||
      normalized.includes('calca')
   ) {
      return <TShirtIcon size={20} className="text-primary mr-1" />;
   }

   return null;
};

const getStatusText = (
   status: string | VolunteerRole
): string => {
   const eventStatus = parseEventStatus(status);

   if (eventStatus) {
      return getEventStatusLabel(eventStatus);
   }

   if (isVolunteerRole(status)) {
      switch (status) {
         case VolunteerRole.ADMIN:
            return 'Admin';
         case VolunteerRole.MANAGER:
            return 'Gerente';
         case VolunteerRole.VOLUNTEER:
            return 'Voluntário';
         default:
            return 'Desconhecido';
      }
   }

   return formatGenericLabel(status);
};

export function Status({ status, selected }: StatusProps) {
   return (
      <div
         className={`inline-flex items-center justify-center text-center gap-1 py-1 px-2 rounded-md font-medium text-sm min-w-[8rem] max-w-[14rem] ${getStatusStyles(
            status
         )} ${selected ? 'ring-2 ring-primary' : ''}`}
      >
         <span className="shrink-0">{getStatusIcon(status)}</span>
         <span className="whitespace-normal break-words leading-tight text-inherit">
            {getStatusText(status)}
         </span>
      </div>
   );
}

export default Status;
