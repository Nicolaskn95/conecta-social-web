'use client';

import { IDistributionChart } from '@/core/dashboard/model/IDashboard';
import { useMemo, useState } from 'react';
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

interface FamiliyIncomeDistributionChartProps {
   cityChart: IDistributionChart;
   neighborhoodChart: IDistributionChart;
}

const FamiliyIncomeDistributionChart = ({
   cityChart,
   neighborhoodChart,
}: FamiliyIncomeDistributionChartProps) => {
   const [groupBy, setGroupBy] = useState<'city' | 'neighborhood'>('city');

   const selectedChart = useMemo(() => {
      if (groupBy === 'neighborhood') {
         return {
            labels: neighborhoodChart.labels.slice(0, 10),
            data: neighborhoodChart.data.slice(0, 10),
         };
      }

      return cityChart;
   }, [groupBy, cityChart, neighborhoodChart]);

   const total = selectedChart.data.reduce((acc, value) => acc + value, 0);
   const data = {
      labels: selectedChart.labels,
      datasets: [
         {
            label: `Famílias por ${groupBy === 'city' ? 'cidade' : 'bairro'}`,
            data: selectedChart.data,
            backgroundColor: [
               '#0d0a2d',
               '#3eaee1',
               '#a3cde3',
               '#d8e6ed',
               '#57b6e6',
            ],
            borderRadius: 8,
         },
      ],
   };

   const options = {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: { display: false },
         tooltip: {
            callbacks: {
               label: (context: any) =>
                  `${context.raw.toLocaleString('pt-BR')} famílias`,
            },
         },
      },
      scales: {
         x: {
            beginAtZero: true,
            ticks: {
               precision: 0,
               color: '#64748b',
            },
            grid: {
               color: '#e2e8f0',
            },
         },
         y: {
            ticks: {
               color: '#334155',
            },
            grid: {
               display: false,
            },
         },
      },
   };

   return (
      <div className="w-full rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm">
         <h3 className="text-sm font-medium text-slate-500">Estatística</h3>
         <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[#090934]">
               Famílias por {groupBy === 'city' ? 'cidade' : 'bairro'}
            </h2>
            <div className="rounded-full bg-[#eef4f8] px-3 py-1 text-sm text-slate-600">
               Total {total.toLocaleString('pt-BR')}
            </div>
         </div>
         <div className="mb-4 flex rounded-full bg-[#eef4f8] p-1">
            <button
               type="button"
               onClick={() => setGroupBy('city')}
               className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  groupBy === 'city'
                     ? 'bg-[#090934] text-white'
                     : 'text-slate-600 hover:text-[#090934]'
               }`}
            >
               Cidade
            </button>
            <button
               type="button"
               onClick={() => setGroupBy('neighborhood')}
               className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  groupBy === 'neighborhood'
                     ? 'bg-[#090934] text-white'
                     : 'text-slate-600 hover:text-[#090934]'
               }`}
            >
               Bairro
            </button>
         </div>
         {total > 0 ? (
            <div className="h-[280px]">
               <Bar data={data} options={options} />
            </div>
         ) : (
            <div className="rounded-xl bg-[#f5f8fb] px-4 py-10 text-sm text-slate-500">
               Nenhuma família ativa disponível para compor essa distribuição.
            </div>
         )}
      </div>
   );
};

export { FamiliyIncomeDistributionChart };
