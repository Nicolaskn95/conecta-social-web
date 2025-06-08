import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Tooltip,
   Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TotalDonationsChart = () => {
   const labels = [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ',
   ];

   const data = {
      labels,
      datasets: [
         {
            label: 'Meta',
            data: [
               6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000,
               6000,
            ],
            backgroundColor: '#cde1ec',
            borderRadius: 4,
            barThickness: 20,
         },
         {
            label: 'Doações',
            data: [
               500, 1800, 2700, 600, 1600, 2500, 1300, 400, 1700, 300, 1600,
               2300,
            ],
            backgroundColor: '#2c6ca3',
            borderRadius: 4,
            barThickness: 20,
         },
      ],
   };

   const options = {
      responsive: true,
      scales: {
         y: {
            beginAtZero: true,
            ticks: {
               callback: (value: any) => `${value / 1000}k`,
            },
            grid: {
               drawBorder: false,
               color: '#ececec',
            },
         },
         x: {
            grid: { display: false },
         },
      },
      plugins: {
         legend: { display: false },
         tooltip: {
            callbacks: {
               label: (ctx: any) =>
                  `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
            },
         },
         datalabels: { display: false },
      },
   };

   return (
      <div className="bg-white rounded-xl shadow p-4 w-3/4 mx-auto">
         <h3 className="text-gray-500 text-sm font-medium">Atividade</h3>
         <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Total de doações</h2>
            <div className="bg-gray-100 rounded-full flex">
               <button className="px-4 py-1 text-sm text-gray-600">
                  Quarto
               </button>
               <button className="px-4 py-1 text-sm text-gray-600">
                  Semestre
               </button>
               <button className="px-4 py-1 text-sm text-white bg-gray-900 rounded-full">
                  Anual
               </button>
            </div>
         </div>
         <hr className="my-2" />
         <Bar data={data} options={options} />
      </div>
   );
};

export { TotalDonationsChart };
