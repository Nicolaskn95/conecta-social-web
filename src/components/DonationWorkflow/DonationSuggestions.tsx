'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { emptyRecommendations, getRecommendations, Suggestion, suggestionDetails } from '@/data/services/recommendations';

export function DonationSuggestions({ donationId, initialOpen, disabled, onSelect }: {
   donationId: string;
   initialOpen: boolean;
   disabled: boolean;
   onSelect: (suggestion: Suggestion) => void;
}) {
   const [open, setOpen] = useState(initialOpen);
   const query = useQuery({
      queryKey: ['donation-recommendations', donationId],
      queryFn: () => getRecommendations(donationId),
      enabled: open,
      retry: false,
   });
   return <section className="space-y-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <button type="button" className="font-semibold text-blue-900" aria-expanded={open} onClick={() => setOpen(value => !value)}>
         {open ? 'Recolher sugestões' : 'Ver sugestões de destinatários'}
      </button>
      {open && <>
         {query.isFetching && <p role="status">Buscando pedidos em aberto…</p>}
         {query.isError && <p role="alert">Não foi possível consultar as sugestões. <button type="button" className="underline" onClick={() => query.refetch()}>Tentar novamente</button></p>}
         {query.data && query.data.status !== 'OK' && <p>{emptyRecommendations[query.data.status]}</p>}
         <ul className="space-y-3">{query.data?.suggestions.map(item => <li key={item.id_need} className="space-y-2 rounded-lg border bg-white p-3">
            <p className="font-semibold">{item.family_name}{item.beneficiary_name ? ' · ' + item.beneficiary_name : ''}</p>
            <p>{item.need_label}</p>
            <p className={item.classification === 'REVIEW' ? 'font-semibold text-amber-800' : 'font-semibold text-green-800'}>
               {item.classification === 'REVIEW' ? 'A conferir' : 'Compatível pelos dados registrados'}
            </p>
            <p className="text-sm">{suggestionDetails(item).join(' ')}</p>
            {item.max_separable_quantity != null && <p className="text-sm">Saldo do pedido: {item.remaining_quantity} · Pode separar até {item.max_separable_quantity} {query.data?.unit}</p>}
            <button type="button" className="rounded-lg bg-blue-800 px-3 py-2 text-white disabled:opacity-50" disabled={disabled || query.isFetching || query.isError}
               onClick={() => { onSelect(item); setOpen(false); }}>Usar esta sugestão</button>
         </li>)}</ul>
      </>}
   </section>;
}
