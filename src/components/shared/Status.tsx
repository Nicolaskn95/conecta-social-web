import {
   XIcon,
   CheckIcon,
   ExclamationMarkIcon,
   ShoppingCartIcon,
   RobotIcon,
   TShirtIcon,
   UserIcon,
   IdentificationBadgeIcon,
} from '@phosphor-icons/react';
import { EventStatus } from '@/core/event/model/IEvent';
import { Category } from '@/core/donation/model/IDonation';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';

interface StatusProps {
   status: EventStatus | Category | VolunteerRole;
   selected?: boolean;
}

// Type guards
const isEventStatus = (
   status: EventStatus | Category | VolunteerRole
): status is EventStatus => {
   return Object.values(EventStatus).includes(status as EventStatus);
};

const isCategory = (
   status: EventStatus | Category | VolunteerRole
): status is Category => {
   return Object.values(Category).includes(status as Category);
};

const isVolunteerRole = (
   status: EventStatus | Category | VolunteerRole
): status is VolunteerRole => {
   return Object.values(VolunteerRole).includes(status as VolunteerRole);
};

const getStatusStyles = (
   status: EventStatus | Category | VolunteerRole
): string => {
   if (isEventStatus(status)) {
      switch (status) {
         case EventStatus.CANCELADO:
            return 'bg-warning_light text-danger border border-warning_light ';
         case EventStatus.ABERTO:
            return 'bg-tertiary text-primary border border-tertiary';
         case EventStatus.CONCLUIDO:
            return 'bg-success_light text-success border border-success_light';
         default:
            return 'bg-gray-100 text-gray-800 hover:text-gray-800';
      }
   } else if (isCategory(status)) {
      switch (status) {
         case Category.ALIMENTO:
            return 'bg-success_light text-success border border-success_light ';
         case Category.BRINQUEDO:
            return 'bg-danger_hover text-danger border border-danger_hover ';
         case Category.VESTIMENTA:
            return 'bg-tertiary text-primary border border-tertiary ';
         default:
            return 'bg-gray-100 text-gray-800 hover:text-gray-800';
      }
   } else if (isVolunteerRole(status)) {
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
   return 'bg-gray-100 text-gray-800 hover:text-gray-800';
};

const getStatusIcon = (
   status: EventStatus | Category | VolunteerRole
) => {
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
   } else if (isCategory(status)) {
      switch (status) {
         case Category.ALIMENTO:
            return (
               <ShoppingCartIcon
                  size={20}
                  className="text-success mr-1"
                  weight="fill"
               />
            );
         case Category.BRINQUEDO:
            return <RobotIcon size={20} className="text-danger mr-1" />;
         case Category.VESTIMENTA:
            return <TShirtIcon size={20} className="text-primary mr-1" />;
         default:
            return null;
      }
   } else if (isVolunteerRole(status)) {
      return <IdentificationBadgeIcon size={20} className="mr-1" />;
   }
   return null;
};

const getStatusText = (
   status: EventStatus | Category | VolunteerRole
): string => {
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
   } else if (isCategory(status)) {
      switch (status) {
         case Category.ALIMENTO:
            return 'Alimento';
         case Category.BRINQUEDO:
            return 'Brinquedo';
         case Category.VESTIMENTA:
            return 'Vestimenta';
         default:
            return 'Desconhecido';
      }
   } else if (isVolunteerRole(status)) {
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
   return 'Desconhecido';
};

export function Status({ status, selected }: StatusProps) {
   return (
      <div
         className={`flex items-center justify-center text-center gap-1 py-1 rounded-md font-medium text-sm w-32 ${getStatusStyles(
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
