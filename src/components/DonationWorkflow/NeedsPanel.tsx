'use client';
import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Need, Page, workflow } from '@/data/services/donationWorkflow';
import { SpecificationField, useItemTypes } from './OptionalFields';

const states = { OPEN: 'Aberta', FULFILLED: 'Atendida', CLOSED: 'Encerrada' };

export function NeedsPanel({ owner, id }: { owner: 'families' | 'beneficiaries'; id: string }) {
   const key = owner === 'families' ? 'family_id' : 'beneficiary_id';
   const [page, setPage] = useState(1);
   const query = useQuery({ queryKey: ['needs', owner, id, page], queryFn: () => workflow<Page<Need>>('/needs?' + key + '=' + id + '&page=' + page) });
   const types = useItemTypes();
   const people = useQuery({
      queryKey: ['needs', 'family-members', id],
      enabled: owner === 'families',
      queryFn: () => workflow<{ id: string; name: string; surname: string }[]>('/beneficiaries?include_inactive=true&family_id=' + id),
   });
   const [edit, setEdit] = useState<Need | 'new' | null>(null);
   const [selected, setSelected] = useState<Need | null>(null);
   const [error, setError] = useState('');
   const [saving, setSaving] = useState(false);
   async function save(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!edit || saving) return;
      const form = new FormData(event.currentTarget);
      const description = String(form.get('description') ?? '').trim();
      const typeId = String(form.get('item_type_id') ?? '');
      const quantity = String(form.get('quantity') ?? '');
      const width = form.get('width');
      const size = form.get('size');
      const specifications = width || size ? { ...(width ? { seat_width_cm: Number(width) } : {}), ...(size ? { shoe_size_br: Number(size) } : {}) } : null;
      const payload = { description: description || null, item_type_id: typeId || null, requested_quantity: quantity ? Number(quantity) : null, specifications };
      setSaving(true); setError('');
      try {
         const changes = edit === 'new' ? payload : Object.fromEntries(Object.entries(payload).filter(([key, value]) => JSON.stringify(value) !== JSON.stringify(edit[key as keyof typeof payload])));
         await workflow(edit === 'new' ? '/' + owner + '/' + id + '/needs' : '/needs/' + edit.id, edit === 'new' ? 'POST' : 'PUT', changes);
         setEdit(null); setSelected(null); await query.refetch();
      } catch (cause) { setError((cause as Error).message); }
      finally { setSaving(false); }
   }
   async function show(row: Need) {
      setError('');
      try { setSelected(await workflow<Need>('/needs/' + row.id)); }
      catch (cause) { setError((cause as Error).message); }
   }
   async function close(row: Need) {
      if (saving || !window.confirm('Encerrar esta necessidade?')) return;
      setSaving(true); setError('');
      try { await workflow('/needs/' + row.id, 'PUT', { status: 'CLOSED' }); setSelected(null); await query.refetch(); }
      catch (cause) { setError((cause as Error).message); }
      finally { setSaving(false); }
   }
   return <section aria-label="Necessidades" className="space-y-4 rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">Necessidades</h2>
         <button type="button" className="rounded-lg border px-3 py-2" disabled={saving} onClick={() => { setError(''); setEdit('new'); }}>Adicionar necessidade</button></div>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {query.isPending && <p role="status">Carregando necessidades…</p>}
      {query.isError && <button type="button" onClick={() => query.refetch()}>Tentar carregar novamente</button>}
      {query.isSuccess && !query.data.list.length && <p>Nenhuma necessidade registrada.</p>}
      {query.data?.list.map(row => <article className="rounded-lg border p-3" key={row.id}>
         <p className="font-medium">{row.description || types.data?.find(type => type.id === row.item_type_id)?.name || 'Necessidade registrada'}</p>
         <p>{states[row.status]} · {row.id_beneficiary
            ? people.data?.filter(person => person.id === row.id_beneficiary).map(person => person.name + ' ' + person.surname)[0] ?? 'Beneficiário'
            : 'Família'}</p>
         <div className="mt-2 flex flex-wrap gap-4 text-blue-800">
            <button type="button" onClick={() => show(row)}>Ver detalhes</button>
            {row.status === 'OPEN' && <><button type="button" disabled={saving} onClick={() => { setError(''); setEdit(row); }}>Editar</button><button type="button" disabled={saving} onClick={() => close(row)}>Encerrar</button></>}
         </div>
         {selected?.id === row.id && <p className="mt-2">Pedido: {selected.requested_quantity ?? 'Não informada'} · Recebido: {selected.received_quantity ?? 0} · Separado: {selected.separated_quantity ?? 0} · Restante: {selected.remaining_quantity ?? 'Não informada'}</p>}
      </article>)}
      {(query.data?.total_pages ?? 0) > 1 && <div className="flex gap-4"><button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button><span>Página {page}</span><button type="button" disabled={page >= (query.data?.total_pages ?? 1)} onClick={() => setPage(page + 1)}>Próxima</button></div>}
      {edit && <NeedForm key={edit === 'new' ? 'new' : edit.id} edit={edit} types={types} saving={saving} save={save} dismiss={() => setEdit(null)} />}
   </section>;
}

function NeedForm({ edit, types, saving, save, dismiss }: {
   edit: Need | 'new'; types: ReturnType<typeof useItemTypes>; saving: boolean;
   save: (event: FormEvent<HTMLFormElement>) => void; dismiss: () => void;
}) {
   const current = edit === 'new' ? null : edit;
   const [typeId, setTypeId] = useState(current?.item_type_id ?? '');
   const [specifications, setSpecifications] = useState(current?.specifications ?? null);
   const code = types.data?.find(type => type.id === typeId)?.code;
   return <form onSubmit={save} className="grid gap-3 rounded-lg border p-4">
      <label>Descrição<textarea className="input" name="description" maxLength={500} defaultValue={current?.description ?? ''} /></label>
      <label>Tipo de item<select className="input" name="item_type_id" value={typeId} onChange={e => { setTypeId(e.target.value); setSpecifications(null); }}>
         <option value="">Não informado</option>
         {typeId && !code && <option value={typeId}>Tipo cadastrado</option>}
         {types.data?.map(type => <option value={type.id} key={type.id}>{type.name}</option>)}
      </select></label>
      {types.isError && <button type="button" onClick={() => types.refetch()}>Tentar carregar tipos novamente</button>}
      <label>Quantidade solicitada<input className="input" name="quantity" type="number" min={1} max={2147483647} defaultValue={current?.requested_quantity ?? ''} /></label>
      <SpecificationField code={code} value={specifications} onChange={value => setSpecifications(value ?? null)} />
      <input type="hidden" name="width" value={specifications?.seat_width_cm ?? ''} />
      <input type="hidden" name="size" value={specifications?.shoe_size_br ?? ''} />
      <div className="flex gap-3"><button type="submit" disabled={saving} className="rounded-lg bg-blue-800 px-4 py-2 text-white">Salvar necessidade</button><button type="button" disabled={saving} onClick={dismiss}>Cancelar edição</button></div>
   </form>;
}
