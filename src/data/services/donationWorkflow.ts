import { requestJson } from './baseService';
import { IDonationToFamily } from '@/core/donation/model/IDonationToFamily';

export type Mode = 'PICKUP' | 'DELIVERY';
export type Specifications = { shoe_size_br?: number; seat_width_cm?: number };
export type ItemDetails = {
   item_type_id?: string | null;
   condition?: 'NEW' | 'USED_GOOD' | 'REQUIRES_REVIEW' | null;
   specifications?: Specifications | null;
};
export interface ItemType { id: string; code: string; name: string; }
export interface Need {
   id: string;
   id_family: string;
   id_beneficiary: string | null;
   item_type_id: string | null;
   description: string | null;
   requested_quantity: number | null;
   specifications: Specifications | null;
   item_type?: { name: string } | null;
   status: 'OPEN' | 'FULFILLED' | 'CLOSED';
   received_quantity?: number;
   separated_quantity?: number;
   remaining_quantity?: number | null;
}
export interface Page<T> { list: T[]; page: number; total_pages: number; }
export async function workflow<T>(path: string, method = 'GET', body?: unknown) {
   const { data } = await requestJson<{ data: T }>(process.env.NEXT_PUBLIC_API_URL, path, {
      method, body: body === undefined ? undefined : JSON.stringify(body),
   });
   return data;
}
export function allocationLabel(row: IDonationToFamily) {
   if (row.status === 'COMPLETED') return 'Concluída';
   if (row.status === 'CANCELED') return 'Cancelada';
   if (row.status !== 'WAITING_RECEIPT') return 'Recebimento a conferir';
   return row.delivery_mode === 'PICKUP' ? 'Aguardando retirada'
      : row.delivery_mode === 'DELIVERY' ? 'Aguardando entrega' : 'Aguardando retirada ou entrega';
}
