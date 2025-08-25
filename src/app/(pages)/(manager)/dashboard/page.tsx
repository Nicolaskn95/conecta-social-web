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
import { DonationsChart } from '@/components/Dashboard/DonationsChart';
import { MonthlyActivityChart } from '@/components/Dashboard/MonthlyActivityChart';
import { FamiliyIncomeDistributionChart } from '@/components/Dashboard/FamiliyIncomeDistributionChart';
import { TotalDonationsChart } from '@/components/Dashboard/TotalDonationsChart';

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
      <div className="p-6 bg-[#F7F9FB] h-screen overflow-y-auto pb-28">
         <div className="bg-white rounded-xl shadow p-6 mb-6 w-full">
            <TotalDonationsChart />
         </div>
         <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
               <div className="flex-1 flex min-w-0">
                  <MonthlyActivityChart />
               </div>
               <div className="flex-1 flex-col flex gap-6">
                  <DonationsChart />
                  <FamiliyIncomeDistributionChart />
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
