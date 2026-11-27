'use client';
import { useQuery } from '@tanstack/react-query';
import { useItemTypes } from './OptionalFields';
import { Need, Page, Mode, workflow } from '@/data/services/donationWorkflow';

export type Recipient = { id_beneficiary?: string; id_need?: string; delivery_mode?: Mode };

export function RecipientExtras({ family, value, onChange }: { family?: string; value: Recipient; onChange: (value: Recipient) => void }) {
   const people = useQuery({ queryKey: ['allocation-people', family], enabled: !!family,
      queryFn: () => workflow<{ id: string; name: string; surname: string }[]>('/beneficiaries?family_id=' + family) });
   const needs = useQuery({ queryKey: ['needs', 'allocation', family], enabled: !!family,
      queryFn: async () => {
         const path = '/needs?status=OPEN&size=100&family_id=' + family;
         const first = await workflow<Page<Need>>(path);
         const rest = await Promise.all(Array.from({length: Math.max(0, first.total_pages - 1)}, (_, i) => workflow<Page<Need>>(path + '&page=' + (i + 2))));
         return [...first.list, ...rest.flatMap(page => page.list)];
      } });
   const catalog = useItemTypes(undefined, !!family);
   const detail = useQuery({ queryKey: ['needs', 'detail', value.id_need], enabled: !!value.id_need,
      queryFn: () => workflow<Need>('/needs/' + value.id_need) });
   return <details className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">Detalhes da destinação</summary>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
         <label>Pessoa<select aria-label="Pessoa" className="input" disabled={!family} value={value.id_beneficiary ?? ''} onChange={event => onChange({ ...value, id_beneficiary: event.target.value || undefined, id_need: undefined })}>
            <option value="">Somente a família</option>
            {people.data?.map(person => <option key={person.id} value={person.id}>{person.name} {person.surname}</option>)}
         </select></label>
         <label>Necessidade<select aria-label="Necessidade" className="input" disabled={!family} value={value.id_need ?? ''} onChange={event => {
            const id = event.target.value || undefined;
            const need = needs.data?.find(row => row.id === id);
            onChange({ ...value, id_need: id, id_beneficiary: need ? need.id_beneficiary ?? undefined : value.id_beneficiary });
         }}>
            <option value="">Não vincular</option>
            {needs.data?.map(need => <option key={need.id} value={need.id}>{need.description ?? catalog.data?.find(type => type.id === need.item_type_id)?.name ?? 'Necessidade aberta'}{need.requested_quantity == null ? '' : ' · Solicitado: ' + need.requested_quantity}</option>)}
         </select></label>
         <label>Modalidade<select aria-label="Modalidade" className="input" value={value.delivery_mode ?? ''} onChange={event => onChange({ ...value, delivery_mode: (event.target.value || undefined) as Mode | undefined })}>
            <option value="">A definir</option><option value="PICKUP">Retirada</option><option value="DELIVERY">Entrega</option>
         </select></label>
      </div>
      {detail.data && <p className="mt-3 text-sm">Solicitado: {detail.data.requested_quantity ?? 'Não informado'} · Separado: {detail.data.separated_quantity ?? 0}</p>}
      {(people.isError || needs.isError) && <button type="button" onClick={() => { people.refetch(); needs.refetch(); }}>Recarregar pessoas e necessidades</button>}
   </details>;
}
