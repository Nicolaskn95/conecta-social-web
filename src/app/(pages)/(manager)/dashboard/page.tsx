'use client';
import React, { useMemo, useState } from 'react';
import { DonationsChart } from '@/components/Dashboard/DonationsChart';
import { MonthlyActivityChart } from '@/components/Dashboard/MonthlyActivityChart';
import { FamiliyIncomeDistributionChart } from '@/components/Dashboard/FamiliyIncomeDistributionChart';
import { TotalDonationsChart } from '@/components/Dashboard/TotalDonationsChart';
import { SummaryCards } from '@/components/Dashboard/SummaryCards';
import { ListCard } from '@/components/Dashboard/ListCard';
import { useDashboardOverview } from '@/data/hooks/dashboard/useDashboardOverview';
import {
   DashboardPeriod,
   ICriticalStockItem,
   IRecentDonation,
   IRecentFamily,
   IUpcomingEvent,
} from '@/core/dashboard/model/IDashboard';
import { getEventStatusLabel } from '@/core/event';
import {
   ArrowClockwiseIcon,
   CalendarBlankIcon,
   HandHeartIcon,
   HouseLineIcon,
   WarningCircleIcon,
} from '@phosphor-icons/react';

const PERIOD_DEFAULT: DashboardPeriod = 'year';

const formatDate = (value: string) =>
   new Date(value).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
   });

const formatStatus = (status: string) => getEventStatusLabel(status);

function LoadingState() {
   return (
      <div className="space-y-6 p-6">
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
               <div
                  key={index}
                  className="h-32 animate-pulse rounded-2xl bg-slate-200"
               ></div>
            ))}
         </div>
         <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200"></div>
         <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200"></div>
            <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200"></div>
            <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200"></div>
         </div>
      </div>
   );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
   return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
         <div className="max-w-lg rounded-2xl border border-[#dbe7ef] bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#090934]">
               Não foi possível carregar o dashboard
            </h2>
            <p className="mt-3 text-slate-500">
               Verifique a disponibilidade da API e tente novamente. O dashboard
               depende do novo endpoint agregado de overview.
            </p>
            <button
               className="btn-primary mx-auto mt-6 flex w-auto items-center gap-2"
               onClick={onRetry}
               type="button"
            >
               <ArrowClockwiseIcon size={20} />
               Tentar novamente
            </button>
         </div>
      </div>
   );
}

function UpcomingEventItem({ event }: { event: IUpcomingEvent }) {
   return (
      <div className="rounded-xl border border-[#e8eef3] px-4 py-3">
         <div className="flex items-start justify-between gap-4">
            <div>
               <p className="font-semibold text-[#090934]">{event.name}</p>
               <p className="text-sm text-slate-500">
                  {event.city} • {formatDate(event.date)}
               </p>
            </div>
            <span className="rounded-full bg-[#eef4f8] px-3 py-1 text-xs font-medium text-slate-600">
               {formatStatus(event.status)}
            </span>
         </div>
         <p className="mt-2 text-sm text-slate-500">
            Participação prevista:{' '}
            <strong className="text-[#090934]">
               {(event.attendance ?? 0).toLocaleString('pt-BR')}
            </strong>
         </p>
      </div>
   );
}

function CriticalStockItem({ item }: { item: ICriticalStockItem }) {
   return (
      <div className="rounded-xl border border-[#e8eef3] px-4 py-3">
         <div className="flex items-start justify-between gap-4">
            <div>
               <p className="font-semibold text-[#090934]">{item.name}</p>
               <p className="text-sm text-slate-500">{item.category_name}</p>
            </div>
            <span
               className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.available
                     ? 'bg-[#fff7e6] text-[#8a5b00]'
                     : 'bg-[#ffe8e8] text-[#b3261e]'
               }`}
            >
               {item.available ? 'Baixo estoque' : 'Indisponível'}
            </span>
         </div>
         <p className="mt-2 text-sm text-slate-500">
            Quantidade atual:{' '}
            <strong className="text-[#090934]">
               {item.quantity.toLocaleString('pt-BR')} {item.measure_unity}
            </strong>
         </p>
      </div>
   );
}

function RecentDonationItem({ donation }: { donation: IRecentDonation }) {
   return (
      <div className="rounded-xl border border-[#e8eef3] px-4 py-3">
         <p className="font-semibold text-[#090934]">{donation.name}</p>
         <p className="text-sm text-slate-500">
            {donation.category_name} • {formatDate(donation.created_at)}
         </p>
         <p className="mt-1 text-sm text-slate-500">
            Doador:{' '}
            <strong className="text-[#090934]">
               {donation.donator_name || 'Não informado'}
            </strong>
         </p>
      </div>
   );
}

function RecentFamilyItem({ family }: { family: IRecentFamily }) {
   return (
      <div className="rounded-xl border border-[#e8eef3] px-4 py-3">
         <p className="font-semibold text-[#090934]">{family.name}</p>
         <p className="text-sm text-slate-500">
            {family.city} • {formatDate(family.created_at)}
         </p>
      </div>
   );
}

function Dashboard() {
   const [period, setPeriod] = useState<DashboardPeriod>(PERIOD_DEFAULT);
   const { data, isLoading, isError, refetch } = useDashboardOverview(period);

   const overview = data?.data;

   const recentActivityItems = useMemo(
      () =>
         overview
            ? [
                 ...overview.lists.recent_donations.map((donation) => ({
                    type: 'donation' as const,
                    key: donation.id,
                    createdAt: donation.created_at,
                    payload: donation,
                 })),
                 ...overview.lists.recent_families.map((family) => ({
                    type: 'family' as const,
                    key: family.id,
                    createdAt: family.created_at,
                    payload: family,
                 })),
              ]
                 .sort(
                    (a, b) =>
                       new Date(b.createdAt).getTime() -
                       new Date(a.createdAt).getTime()
                 )
                 .slice(0, 5)
            : [],
      [overview]
   );

   if (isLoading) {
      return <LoadingState />;
   }

   if (isError || !overview) {
      return <ErrorState onRetry={() => refetch()} />;
   }

   return (
      <div className="min-h-screen overflow-y-auto bg-[#F7F9FB] p-6 pb-28">
         <div className="mb-6">
            <SummaryCards summary={overview.summary} />
         </div>

         <div className="mb-6">
            <TotalDonationsChart
               chart={overview.charts.activity_overview}
               period={period}
               onPeriodChange={setPeriod}
            />
         </div>

         <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr_1fr]">
            <MonthlyActivityChart
               chart={overview.charts.donations_by_category}
            />
            <DonationsChart chart={overview.charts.events_by_status} />
            <FamiliyIncomeDistributionChart
               cityChart={overview.charts.families_by_city}
               neighborhoodChart={overview.charts.families_by_neighborhood}
            />
         </div>

         <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <ListCard
               title="Próximos eventos"
               subtitle="Operação"
               emptyMessage="Nenhum próximo evento encontrado."
               hasItems={overview.lists.upcoming_events.length > 0}
            >
               {overview.lists.upcoming_events.map((event) => (
                  <UpcomingEventItem key={event.id} event={event} />
               ))}
            </ListCard>

            <ListCard
               title="Estoque crítico"
               subtitle="Atenção"
               emptyMessage="Nenhum item crítico no estoque."
               hasItems={overview.lists.critical_stock.length > 0}
            >
               {overview.lists.critical_stock.map((item) => (
                  <CriticalStockItem key={item.id} item={item} />
               ))}
            </ListCard>

            <ListCard
               title="Cadastros recentes"
               subtitle="Atividade"
               emptyMessage="Nenhum cadastro recente disponível."
               hasItems={recentActivityItems.length > 0}
            >
               {recentActivityItems.map((item) =>
                  item.type === 'donation' ? (
                     <div
                        key={`${item.type}-${item.key}`}
                        className="flex items-start gap-3"
                     >
                        <div className="rounded-xl bg-[#e9f3f9] p-2">
                           <HandHeartIcon size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                           <RecentDonationItem donation={item.payload} />
                        </div>
                     </div>
                  ) : (
                     <div
                        key={`${item.type}-${item.key}`}
                        className="flex items-start gap-3"
                     >
                        <div className="rounded-xl bg-[#e9f3f9] p-2">
                           <HouseLineIcon size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                           <RecentFamilyItem family={item.payload} />
                        </div>
                     </div>
                  )
               )}
            </ListCard>
         </div>

         <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#e9f3f9] p-3">
                     <CalendarBlankIcon size={24} className="text-primary" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-slate-500">
                        Atualizado em
                     </p>
                     <p className="font-semibold text-[#090934]">
                        {formatDate(overview.generated_at)}
                     </p>
                  </div>
               </div>
            </div>

            <div className="rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#e9f3f9] p-3">
                     <WarningCircleIcon size={24} className="text-primary" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-slate-500">
                        Leitura atual do schema
                     </p>
                     <p className="font-semibold text-[#090934]">
                        Dashboard operacional com dados reais
                     </p>
                  </div>
               </div>
            </div>

            <div className="rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#e9f3f9] p-3">
                     <HandHeartIcon size={24} className="text-primary" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-slate-500">
                        Próxima evolução recomendada
                     </p>
                     <p className="font-semibold text-[#090934]">
                        Beneficiários e movimentação de doações
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
