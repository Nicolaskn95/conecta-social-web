'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IDonationToFamily } from '@/core/donation/model/IDonationToFamily';
import { allocationLabel, Need, Page, workflow } from '@/data/services/donationWorkflow';
import { ApiRequestError } from '@/data/services/baseService';

export default function AllocationsPage() {
   const client = useQueryClient();
   const [pending, setPending] = useState(true);
   const [page, setPage] = useState(1);
   const [action, setAction] = useState<{ row: IDonationToFamily; kind: 'confirm-receipt' | 'cancel' } | null>(null);
   const actionForm = useRef<HTMLFormElement>(null);
   useEffect(() => { if (action) actionForm.current?.focus(); }, [action]);
   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const rows = useQuery({ queryKey: ['donations-to-family', 'page', page, pending],
      queryFn: () => workflow<Page<IDonationToFamily>>('/donations-to-family/paginated?page=' + page + (pending ? '&status=WAITING_RECEIPT' : '')) });
   const needId = action?.row.id_need;
   const need = useQuery({ queryKey: ['needs', 'detail', needId], enabled: !!needId && action?.kind === 'confirm-receipt', queryFn: () => workflow<Need>('/needs/' + needId) });
   async function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!action || saving) return;
      const { row, kind } = action;
      const form = new FormData(event.currentTarget);
      const day = String(form.get('received_at') ?? '');
      const payload = kind === 'confirm-receipt' ? { ...(day ? { received_at: day + 'T00:00:00.000Z' } : {}), keep_need_open: form.has('keep_need_open') }
         : { restock: form.get('restock') === 'yes', note: String(form.get('note') ?? '').trim() || undefined };
      setSaving(true); setError(''); setMessage('');
      try {
         const updated = await workflow<IDonationToFamily>('/donations-to-family/' + row.id + '/' + kind, 'POST', payload);
         setMessage(allocationLabel(updated)); setAction(null);
      } catch (cause) {
         const conflict = cause instanceof ApiRequestError && cause.status === 409;
         if (conflict) {
            const current = await workflow<IDonationToFamily>('/donations-to-family/' + row.id).catch(() => null);
            if (current) { setMessage('Situação atual: ' + allocationLabel(current)); setAction(null); }
         }
         setError((cause as Error).message);
      } finally {
         setSaving(false);
         await Promise.all(['donations-to-family', 'donations', 'needs', 'donation-recommendations'].map(key => client.invalidateQueries({ queryKey: [key] })));
      }
   }
   return <section aria-label="Destinações" className="min-h-full bg-gray-100 p-4 sm:p-7"><div className="mx-auto max-w-5xl space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-semibold">Destinações</h1>
         <Link href="/dashboard/donations-to-family/register" className="rounded-lg bg-blue-800 px-4 py-2 text-white">Separar para uma família</Link></header>
      <div className="flex flex-wrap gap-2" aria-label="Filtro de destinações">
         {[true, false].map(value => <button type="button" key={String(value)} aria-pressed={pending === value} className={'rounded-lg border px-3 py-2 ' + (pending === value ? 'bg-blue-100 text-blue-900' : 'bg-white')}
            onClick={() => { setPending(value); setPage(1); }}>{value ? 'Aguardando retirada ou entrega' : 'Histórico'}</button>)}
      </div>
      {message && <p role="status">{message}</p>}{error && <p role="alert" className="text-red-700">{error}</p>}
      {rows.isPending && <p role="status">Carregando destinações…</p>}
      {rows.isError && <button type="button" onClick={() => rows.refetch()}>Tentar novamente</button>}
      {rows.isSuccess && !rows.data.list.length && <p className="rounded-xl bg-white p-4">{pending ? 'Nenhuma destinação aguardando recebimento.' : 'Nenhuma destinação no histórico.'}</p>}
      {action && <form ref={actionForm} tabIndex={-1} onSubmit={submit} aria-label={action.kind === 'cancel' ? 'Cancelar separação' : 'Confirmar recebimento'} className="space-y-3 rounded-xl border bg-white p-4" key={action.row.id + action.kind}>
         <h2 className="font-semibold">{action.kind === 'cancel' ? 'Cancelar separação' : 'Confirmar recebimento'}</h2>
         <p>{action.row.donation?.name} · {action.row.family?.name}</p>
         {action.kind === 'cancel' ? <>
            <label>Destino do item<select className="input" name="restock"><option value="yes">Devolver ao estoque</option><option value="no">Item indisponível para retornar ao estoque</option></select></label>
            <label>Observação opcional<textarea name="note" maxLength={250} className="input" /></label>
         </> : <>
            <label>Data em que recebeu (opcional)<input className="input" type="date" name="received_at" /></label>
            {need.data?.requested_quantity === null && <label className="flex gap-2"><input type="checkbox" name="keep_need_open" />Manter necessidade aberta</label>}
         </>}
         <div className="flex gap-3"><button disabled={saving || (!!needId && action.kind === 'confirm-receipt' && !need.isSuccess)} type="submit" className="rounded-lg bg-blue-800 px-4 py-2 text-white">Confirmar</button><button disabled={saving} type="button" onClick={() => setAction(null)}>Voltar</button></div>
         {need.isError && action.kind === 'confirm-receipt' && <button type="button" onClick={() => need.refetch()}>Recarregar necessidade</button>}
      </form>}
      <ul className="space-y-3">{rows.data?.list.map(row => <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white p-4">
         <div><h2 className="font-semibold">{row.donation?.name ?? 'Doação'} · {row.quantity} {row.donation?.category?.measure_unity}</h2>
            <p>{row.family?.name ?? 'Família'}{row.beneficiary ? ' · ' + row.beneficiary.name + ' ' + row.beneficiary.surname : ''}</p>
            <p className="text-sm text-gray-700">{allocationLabel(row)}{row.separated_at && ' · ' + new Date(row.separated_at).toLocaleDateString('pt-BR')}</p>
            {(row.family?.active === false || row.beneficiary?.active === false || row.donation?.active === false) && <p className="text-sm">Vínculo desativado</p>}
            {row.received_at && <p className="text-sm">Recebido em {row.received_at.slice(0, 10).split('-').reverse().join('/')}</p>}
            {row.confirmed_at && <p className="text-sm">Registrado em {new Date(row.confirmed_at).toLocaleString('pt-BR')}</p>}
         </div>
         {row.status !== 'COMPLETED' && row.status !== 'CANCELED' && <div className="flex flex-wrap gap-3 text-blue-800">
            <button disabled={saving} onClick={() => setAction({ row, kind: 'confirm-receipt' })}>Confirmar recebimento</button>
            {row.status === 'WAITING_RECEIPT' && <button disabled={saving} onClick={() => setAction({ row, kind: 'cancel' })}>Cancelar separação</button>}
         </div>}
      </li>)}</ul>
      {(page > 1 || (rows.data?.total_pages ?? 0) > 1) && <div className="flex gap-4"><button disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button><span>Página {page}</span><button disabled={page >= (rows.data?.total_pages ?? 1)} onClick={() => setPage(page + 1)}>Próxima</button></div>}
   </div></section>;
}
