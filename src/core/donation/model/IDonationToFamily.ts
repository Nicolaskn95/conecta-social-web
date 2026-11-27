import { IDonation } from './IDonation';
import { IFamily } from '@/core/family/model/IFamily';

export interface IDonationToFamily {
   status?: 'UNKNOWN' | 'WAITING_RECEIPT' | 'COMPLETED' | 'CANCELED';
   id_beneficiary?: string | null;
   beneficiary?: { id: string; name: string; surname: string; active: boolean } | null;
   id_need?: string | null;
   delivery_mode?: 'PICKUP' | 'DELIVERY' | null;
   request_id?: string;
   separated_at?: string | null;
   received_at?: string | null;
   confirmed_at?: string | null;
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
