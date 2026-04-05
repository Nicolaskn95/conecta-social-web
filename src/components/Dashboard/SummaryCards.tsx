'use client';

import { IDashboardSummary } from '@/core/dashboard/model/IDashboard';
import {
   CalendarIcon,
   HandHeartIcon,
   IdentificationBadgeIcon,
   UsersIcon,
   WarningCircleIcon,
} from '@phosphor-icons/react';

interface SummaryCardsProps {
   summary: IDashboardSummary;
}

interface SummaryCardItem {
   title: string;
   value: number;
   icon: JSX.Element;
   helper: string;
}

const formatNumber = (value: number) =>
   new Intl.NumberFormat('pt-BR').format(value);

export function SummaryCards({ summary }: SummaryCardsProps) {
   const items: SummaryCardItem[] = [
      {
         title: 'Famílias ativas',
         value: summary.active_families,
         helper: 'Famílias atualmente acompanhadas',
         icon: (
            <UsersIcon size={28} weight="duotone" className="text-primary" />
         ),
      },
      {
         title: 'Doações disponíveis',
         value: summary.available_donations,
         helper: `${formatNumber(summary.active_donations)} doações ativas no estoque`,
         icon: (
            <HandHeartIcon
               size={28}
               weight="duotone"
               className="text-primary"
            />
         ),
      },
      {
         title: 'Eventos ativos',
         value: summary.active_events,
         helper: `${formatNumber(summary.upcoming_events)} próximos eventos`,
         icon: (
            <CalendarIcon size={28} weight="duotone" className="text-primary" />
         ),
      },
      {
         title: 'Funcionários ativos',
         value: summary.active_employees,
         helper: `A ${summary.employees_by_role.ADMIN} | G ${summary.employees_by_role.MANAGER} | V ${summary.employees_by_role.VOLUNTEER}`,
         icon: (
            <IdentificationBadgeIcon
               size={28}
               weight="duotone"
               className="text-primary"
            />
         ),
      },
      {
         title: 'Estoque crítico',
         value: summary.critical_stock_items,
         helper: 'Itens com baixa quantidade ou indisponíveis',
         icon: (
            <WarningCircleIcon
               size={28}
               weight="duotone"
               className="text-primary"
            />
         ),
      },
      {
         title: 'Eventos encerrados',
         value: summary.completed_events + summary.canceled_events,
         helper: `${formatNumber(summary.completed_events)} concluídos e ${formatNumber(summary.canceled_events)} cancelados`,
         icon: (
            <CalendarIcon size={28} weight="duotone" className="text-primary" />
         ),
      },
   ];

   return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
         {items.map((item) => (
            <div
               key={item.title}
               className="rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm"
            >
               <div className="mb-4 flex items-start justify-between">
                  <div>
                     <p className="text-sm font-medium text-slate-500">
                        {item.title}
                     </p>
                     <h2 className="mt-2 text-3xl font-bold text-[#090934]">
                        {formatNumber(item.value)}
                     </h2>
                  </div>
                  <div className="rounded-xl bg-[#e9f3f9] p-3">{item.icon}</div>
               </div>
               <p className="text-sm text-slate-500">{item.helper}</p>
            </div>
         ))}
      </div>
   );
}
