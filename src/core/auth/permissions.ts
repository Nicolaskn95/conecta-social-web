import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';

export function isAdmin(role?: VolunteerRole | string | null) {
   return role === VolunteerRole.ADMIN;
}

export function isManager(role?: VolunteerRole | string | null) {
   return role === VolunteerRole.MANAGER;
}

export function isVolunteer(role?: VolunteerRole | string | null) {
   return role === VolunteerRole.VOLUNTEER;
}

export function canManageVolunteers(role?: VolunteerRole | string | null) {
   return isAdmin(role) || isManager(role);
}

export function canDeleteRecords(role?: VolunteerRole | string | null) {
   return isAdmin(role) || isManager(role);
}

export function canDeleteEmployees(role?: VolunteerRole | string | null) {
   return isAdmin(role);
}

export function canChangeEmployeeRole(role?: VolunteerRole | string | null) {
   return isAdmin(role);
}

export function canChangeEmployeePassword(role?: VolunteerRole | string | null) {
   return isAdmin(role);
}

export function canPublishEventInstagram(role?: VolunteerRole | string | null) {
   return isAdmin(role) || isManager(role);
}

export function canCreateEvents(role?: VolunteerRole | string | null) {
   return isAdmin(role) || isManager(role);
}

export function canCancelEvent(role?: VolunteerRole | string | null) {
   return isAdmin(role) || isManager(role);
}
