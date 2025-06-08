'use client';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonationsChart = () => {
   const data = {
      labels: ['Eventos', 'Direta', 'Anônimo', 'Vazio'],
      datasets: [
         {
            data: [513, 741, 121, 0], // A soma dá 1375
            backgroundColor: ['#246896', '#bdd6e6', '#3eaee1', 'transparent'],
            borderWidth: 0,
            circumference: 180,
            rotation: -90,
            cutout: '70%',
         },
      ],
   };

   const total = 1375;

   const options = {
      plugins: {
         legend: {
            display: false,
         },
         tooltip: {
            enabled: true,
         },
         datalabels: { display: false },
      },
   };

   return (
      <div className="w-full text-center p-4 shadow-md rounded-lg border">
         <h3 className="text-gray-500 text-sm font-medium">Estatística</h3>
         <h2 className="text-xl font-bold mb-2">Total de doações - Origem</h2>
         <div
            className="relative flex justify-center items-center w-full"
            style={{ minHeight: 20 }}
         >
            <Doughnut data={data} options={options} />
            <div className="absolute inset-30 flex flex-col items-center justify-center pointer-events-none">
               <p className="text-2xl text-gray-500 mt-10 pt-20">
                  Contagem Total
               </p>
               <p className="text-6xl font-bold">
                  {total.toLocaleString('pt-BR')}
               </p>
            </div>
         </div>
         <div className="mt-6 flex justify-around text-2xl text-gray-700">
            <div>
               <span className="inline-block w-3 h-3 bg-[#246896] rounded-full mr-2"></span>
               Eventos <strong>513</strong>
            </div>
            <div>
               <span className="inline-block w-3 h-3 bg-[#bdd6e6] rounded-full mr-2"></span>
               Direta <strong>741</strong>
            </div>
            <div>
               <span className="inline-block w-3 h-3 bg-[#3eaee1] rounded-full mr-2"></span>
               Anônimo <strong>121</strong>
            </div>
         </div>
      </div>
   );
};

export { DonationsChart };
