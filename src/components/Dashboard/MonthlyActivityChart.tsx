import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MonthlyActivityChart = () => {
   const data = {
      labels: [
         'Alimentos sólidos',
         'Alimentos líquidos',
         'Roupas',
         'Brinquedos',
      ],
      datasets: [
         {
            data: [39, 26, 24, 11],
            backgroundColor: [
               '#cfe0e9', // Alimentos sólidos
               '#57b6e6', // Alimentos líquidos
               '#3e88a4', // Roupas
               '#0d0a2d', // Brinquedos
            ],
            borderWidth: 0,
            cutout: '60%',
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
               size: 14,
            } as const,
            formatter: (value: any) => `${value}%`,
         },
      },
   };

   const legendItems = [
      { label: 'Alimentos sólidos', value: '39%', color: '#cfe0e9' },
      { label: 'Alimentos Liquidos', value: '26%', color: '#57b6e6' },
      { label: 'Roupas', value: '24%', color: '#3e88a4' },
      { label: 'Brinquedos', value: '11%', color: '#0d0a2d' },
   ];

   return (
      <div className="w-full p-4 text-center border rounded-lg shadow">
         <h3 className="text-gray-500 text-sm font-medium">Estatística</h3>
         <h2 className="text-lg font-bold mb-2">
            Atividade mensal - Categoria
         </h2>
         <Doughnut data={data} options={options} />
         <div className="mt-6 space-y-2 text-left">
            {legendItems.map((item, idx) => (
               <div
                  key={idx}
                  className="px-10 flex items-center justify-between text-sm"
               >
                  <div className="flex items-center">
                     <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                     ></span>
                     <span className="text-gray-700 text-2xl font-semibold">
                        {item.label}
                     </span>
                  </div>
                  <span className="text-gray-700 text-2xl font-medium">
                     {item.value}
                  </span>
               </div>
            ))}
         </div>
      </div>
   );
};

export { MonthlyActivityChart };
