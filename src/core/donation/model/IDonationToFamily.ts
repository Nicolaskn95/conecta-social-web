import { IDonation } from './IDonation';
import { IFamily } from '@/core/family/model/IFamily';

export interface IDonationToFamily {
   id?: string;
   id_donation: string;
   id_family: string;
   quantity: number;
   update_message?: string | null;
   active?: boolean;
   created_at?: Date | string | null;
   updated_at?: Date | string | null;
   donation?: IDonation;
   family?: IFamily;
}
