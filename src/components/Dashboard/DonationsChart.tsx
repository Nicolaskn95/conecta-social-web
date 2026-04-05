'use client';

import { IDistributionChart } from '@/core/dashboard/model/IDashboard';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = ['#246896', '#bdd6e6', '#3eaee1', '#9fb4c5'];

interface DonationsChartProps {
   chart: IDistributionChart;
}

const DonationsChart = ({ chart }: DonationsChartProps) => {
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
            circumference: 180,
            rotation: -90,
            cutout: '70%',
         },
      ],
   };

   const options = {
      plugins: {
         legend: {
            display: false,
         },
         tooltip: {
            callbacks: {
               label: (context: any) =>
                  `${context.label}: ${context.raw.toLocaleString('pt-BR')} eventos`,
            },
         },
      },
   };

   return (
      <div className="w-full rounded-2xl border border-[#dbe7ef] bg-white p-5 text-center shadow-sm">
         <h3 className="text-sm font-medium text-slate-500">Estatística</h3>
         <h2 className="mb-2 text-xl font-bold text-[#090934]">
            Eventos por status
         </h2>
         {total > 0 ? (
            <>
               <div
                  className="relative flex items-center justify-center"
                  style={{ minHeight: 20 }}
               >
                  <Doughnut data={data} options={options} />
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-12">
                     <p className="text-base text-slate-500">Eventos ativos</p>
                     <p className="text-5xl font-bold text-[#090934]">
                        {total.toLocaleString('pt-BR')}
                     </p>
                  </div>
               </div>
               <div className="mt-6 flex flex-wrap justify-center gap-5 text-sm text-slate-700">
                  {chart.labels.map((label, index) => (
                     <div key={label} className="flex items-center">
                        <span
                           className="mr-2 inline-block h-3 w-3 rounded-full"
                           style={{
                              backgroundColor:
                                 CHART_COLORS[index % CHART_COLORS.length],
                           }}
                        ></span>
                        {label}{' '}
                        <strong className="ml-1 text-[#090934]">
                           {chart.data[index].toLocaleString('pt-BR')}
                        </strong>
                     </div>
                  ))}
               </div>
            </>
         ) : (
            <div className="rounded-xl bg-[#f5f8fb] px-4 py-10 text-sm text-slate-500">
               Nenhum evento ativo disponível para compor o gráfico.
            </div>
         )}
      </div>
   );
};

export { DonationsChart };
