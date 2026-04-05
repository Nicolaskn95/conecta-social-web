'use client';

import {
   DashboardPeriod,
   IActivityOverviewChart,
} from '@/core/dashboard/model/IDashboard';
import {
   BarElement,
   CategoryScale,
   Chart as ChartJS,
   Legend,
   LinearScale,
   Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PERIOD_LABELS: Record<DashboardPeriod, string> = {
   month: 'Mês',
   quarter: 'Trimestre',
   semester: 'Semestre',
   year: 'Ano',
};

interface TotalDonationsChartProps {
   chart: IActivityOverviewChart;
   period: DashboardPeriod;
   onPeriodChange: (period: DashboardPeriod) => void;
}

const DATASET_COLORS = ['#2c6ca3', '#a9d2e8'];

const TotalDonationsChart = ({
   chart,
   period,
   onPeriodChange,
}: TotalDonationsChartProps) => {
   const data = {
      labels: chart.labels,
      datasets: chart.datasets.map((dataset, index) => ({
         label: dataset.label,
         data: dataset.data,
         backgroundColor: DATASET_COLORS[index] ?? '#5f9cc5',
         borderRadius: 8,
         barThickness: chart.labels.length > 12 ? 10 : 18,
      })),
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         y: {
            beginAtZero: true,
            ticks: {
               color: '#6b7280',
               precision: 0,
            },
            grid: {
               drawBorder: false,
               color: '#ececec',
            },
         },
         x: {
            grid: { display: false },
            ticks: {
               color: '#6b7280',
               maxRotation: chart.labels.length > 12 ? 45 : 0,
               minRotation: chart.labels.length > 12 ? 45 : 0,
            },
         },
      },
      plugins: {
         legend: {
            position: 'top' as const,
            labels: {
               usePointStyle: true,
               boxWidth: 8,
               color: '#475569',
            },
         },
         tooltip: {
            callbacks: {
               label: (ctx: any) =>
                  `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pt-BR')}`,
            },
         },
      },
   };

   const periods: DashboardPeriod[] = ['month', 'quarter', 'semester', 'year'];

   return (
      <div className="rounded-2xl border border-[#dbe7ef] bg-white p-6 shadow-sm">
         <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
               <h3 className="text-sm font-medium text-slate-500">Atividade</h3>
               <h2 className="text-xl font-bold text-[#090934]">
                  Cadastros no período
               </h2>
            </div>
            <div className="flex flex-wrap rounded-full bg-[#eef4f8] p-1">
               {periods.map((periodOption) => (
                  <button
                     key={periodOption}
                     className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        periodOption === period
                           ? 'bg-[#090934] text-white'
                           : 'text-slate-600 hover:text-[#090934]'
                     }`}
                     onClick={() => onPeriodChange(periodOption)}
                     type="button"
                  >
                     {PERIOD_LABELS[periodOption]}
                  </button>
               ))}
            </div>
         </div>
         <div className="h-[340px]">
            <Bar data={data} options={options} />
         </div>
      </div>
   );
};

export { TotalDonationsChart };
