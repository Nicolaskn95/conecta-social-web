'use client';

import { IDistributionChart } from '@/core/dashboard/model/IDashboard';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const CHART_COLORS = ['#cfe0e9', '#57b6e6', '#3e88a4', '#0d0a2d', '#92c5de'];

interface MonthlyActivityChartProps {
   chart: IDistributionChart;
}

const MonthlyActivityChart = ({ chart }: MonthlyActivityChartProps) => {
   const total = chart.data.reduce((acc, value) => acc + value, 0);
   const data = {
      labels: chart.labels,
      datasets: [
         {
            data: chart.data,
            backgroundColor: chart.labels.map(
               (_, index) => CHART_COLORS[index % CHART_COLORS.length]
            ),
            borderWidth: 0,
            cutout: '62%',
            borderRadius: 10,
         },
      ],
   };

   const options = {
      plugins: {
         legend: { display: false },
         datalabels: {
            color: '#fff',
            font: {
               weight: 'bold',
               size: 12,
            } as const,
            formatter: (value: number) => {
               if (!total) return '0%';
               return `${Math.round((value / total) * 100)}%`;
            },
         },
         tooltip: {
            callbacks: {
               label: (context: any) =>
                  `${context.label}: ${context.raw.toLocaleString('pt-BR')} registros`,
            },
         },
      },
   };

   return (
      <div className="w-full rounded-2xl border border-[#dbe7ef] bg-white p-5 shadow-sm">
         <h3 className="text-sm font-medium text-slate-500">Estatística</h3>
         <h2 className="mb-4 text-xl font-bold text-[#090934]">
            Doações ativas por categoria
         </h2>
         {total > 0 ? (
            <>
               <div className="mx-auto max-w-[360px]">
                  <Doughnut data={data} options={options} />
               </div>
               <div className="mt-6 space-y-3">
                  {chart.labels.map((label, index) => (
                     <div
                        key={label}
                        className="flex items-center justify-between gap-4 text-sm"
                     >
                        <div className="flex items-center gap-2">
                           <span
                              className="h-3 w-3 rounded-full"
                              style={{
                                 backgroundColor:
                                    CHART_COLORS[index % CHART_COLORS.length],
                              }}
                           ></span>
                           <span className="font-medium text-slate-700">
                              {label}
                           </span>
                        </div>
                        <span className="font-semibold text-[#090934]">
                           {chart.data[index].toLocaleString('pt-BR')}
                        </span>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <div className="rounded-xl bg-[#f5f8fb] px-4 py-10 text-sm text-slate-500">
               Nenhuma doação ativa cadastrada para compor a distribuição.
            </div>
         )}
      </div>
   );
};

export { MonthlyActivityChart };
