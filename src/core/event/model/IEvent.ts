import { IPrivateUser } from '@/core/privateUser';

export interface IEvent {
   id?: number;
   title: string;
   eventDate: Date;
   cep: string;
   address: string;
   state: string;
   number: number;
   embedPostInstagram: string;
   userId: IPrivateUser['id'];
}
