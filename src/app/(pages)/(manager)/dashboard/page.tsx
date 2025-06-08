'use client';
import React from 'react';
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   PointElement,
   LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   PointElement,
   LineElement
);

const barData = {
   labels: [
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
   ],
   datasets: [
      {
         label: 'Doações',
         data: [
            1200, 1800, 1500, 2000, 2100, 1900, 1700, 2200, 2100, 2300, 2500,
            2400,
         ],
         backgroundColor: 'rgba(58, 141, 186, 0.7)',
         borderRadius: 8,
         barPercentage: 0.5,
      },
      {
         label: 'Meta',
         data: [
            6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000,
            6000,
         ],
         backgroundColor: 'rgba(58, 141, 186, 0.2)',
         borderRadius: 8,
         barPercentage: 0.5,
      },
   ],
};

const barOptions = {
   responsive: true,
   plugins: {
      legend: { display: false },
      title: { display: false },
   },
   scales: {
      y: {
         beginAtZero: true,
         grid: { color: '#E5E7EB' },
         ticks: { color: '#6B7280' },
      },
      x: {
         grid: { display: false },
         ticks: { color: '#6B7280' },
      },
   },
};

const categoryData = {
   labels: ['Alimentos sólidos', 'Alimentos Líquidos', 'Roupas', 'Brinquedos'],
   datasets: [
      {
         data: [39, 26, 24, 11],
         backgroundColor: ['#BFE0F7', '#7DC3F0', '#3A8DBA', '#0B1B3B'],
         borderWidth: 0,
      },
   ],
};

const originData = {
   labels: ['Eventos', 'Direta', 'anônimo'],
   datasets: [
      {
         data: [513, 741, 121],
         backgroundColor: ['#3A8DBA', '#BFE0F7', '#7DC3F0'],
         borderWidth: 0,
      },
   ],
};

const familyIncomeData = {
   labels: ['> 2 salário', '1,5 salário', '< 1 salário', '< 1 salário'],
   datasets: [
      {
         data: [39.11, 28.02, 23.13, 5.03],
         backgroundColor: ['#BFE0F7', '#7DC3F0', '#3A8DBA', '#0B1B3B'],
         borderWidth: 0,
      },
   ],
};

function Dashboard() {
   return (
      <div className="p-6 bg-[#F7F9FB] min-h-screen overflow-y-auto">
         <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
               <div>
                  <h2 className="font-bold text-lg">Atividade</h2>
                  <h1 className="font-extrabold text-2xl">Total de doações</h1>
               </div>
               <div className="flex gap-2">
                  <button className="px-4 py-1 rounded-full bg-[#E5E7EB] text-[#0B1B3B]">
                     Quarto
                  </button>
                  <button className="px-4 py-1 rounded-full bg-[#E5E7EB] text-[#0B1B3B]">
                     Semestre
                  </button>
                  <button className="px-4 py-1 rounded-full bg-[#0B1B3B] text-white">
                     Anual
                  </button>
               </div>
            </div>
            <Bar data={barData} options={barOptions} height={90} />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
               <h3 className="font-semibold text-sm mb-2">Estatística</h3>
               <h2 className="font-bold text-lg mb-2">
                  Atividade mensal - Categoria
               </h2>
               <Doughnut
                  data={categoryData}
                  options={{ cutout: '70%' }}
                  width={180}
                  height={180}
               />
               <ul className="mt-4 w-full">
                  <li className="flex justify-between text-sm mb-1">
                     <span className="text-[#BFE0F7] font-bold">■</span>{' '}
                     Alimentos sólidos <span>39%</span>
                  </li>
                  <li className="flex justify-between text-sm mb-1">
                     <span className="text-[#7DC3F0] font-bold">■</span>{' '}
                     Alimentos Líquidos <span>26%</span>
                  </li>
                  <li className="flex justify-between text-sm mb-1">
                     <span className="text-[#3A8DBA] font-bold">■</span> Roupas{' '}
                     <span>24%</span>
                  </li>
                  <li className="flex justify-between text-sm">
                     <span className="text-[#0B1B3B] font-bold">■</span>{' '}
                     Brinquedos <span>11%</span>
                  </li>
               </ul>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
               <h3 className="font-semibold text-sm mb-2">Estatística</h3>
               <h2 className="font-bold text-lg mb-2">
                  Total de doações - Origem
               </h2>
               <Doughnut
                  data={originData}
                  options={{ cutout: '80%' }}
                  width={180}
                  height={180}
               />
               <div className="mt-4 text-center">
                  <div className="text-xs text-gray-500">Contagem Total</div>
                  <div className="text-3xl font-extrabold">1,375</div>
                  <div className="flex justify-center gap-4 mt-2 text-xs">
                     <span className="text-[#3A8DBA]">Eventos 513</span>
                     <span className="text-[#7DC3F0]">Direta 741</span>
                     <span className="text-[#BFE0F7]">anônimo 121</span>
                  </div>
               </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
               <div className="flex justify-between w-full items-center mb-2">
                  <div>
                     <h3 className="font-semibold text-sm">Estatística</h3>
                     <h2 className="font-bold text-lg">
                        Divisão por renda da família
                     </h2>
                  </div>
                  <select className="ml-2 px-2 py-1 rounded bg-[#F7F9FB] border text-xs">
                     <option>2025</option>
                  </select>
               </div>
               <Doughnut
                  data={familyIncomeData}
                  options={{ cutout: '80%' }}
                  width={180}
                  height={180}
               />
               <ul className="mt-4 w-full text-xs">
                  <li className="flex justify-between mb-1">
                     <span className="text-[#BFE0F7] font-bold">■</span> &gt; 2
                     salário{' '}
                     <span>
                        39.11% <span className="text-green-600">(+2.98%)</span>
                     </span>
                  </li>
                  <li className="flex justify-between mb-1">
                     <span className="text-[#7DC3F0] font-bold">■</span> 1,5
                     salário{' '}
                     <span>
                        28.02% <span className="text-red-600">(-3.25%)</span>
                     </span>
                  </li>
                  <li className="flex justify-between mb-1">
                     <span className="text-[#3A8DBA] font-bold">■</span> &lt; 1
                     salário{' '}
                     <span>
                        23.13% <span className="text-red-600">(-0.14%)</span>
                     </span>
                  </li>
                  <li className="flex justify-between">
                     <span className="text-[#0B1B3B] font-bold">■</span> &lt; 1
                     salário{' '}
                     <span>
                        5.03% <span className="text-red-600">(-1.11%)</span>
                     </span>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
