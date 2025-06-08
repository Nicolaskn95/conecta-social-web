import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FamiliyIncomeDistributionChart = () => {
   const data = {
      labels: ['> 2 salário', '> 1,5 salário', '> 1 salário', '< 1 salário'],
      datasets: [
         {
            data: [39.11, 28.02, 23.13, 5.03],
            backgroundColor: ['#0d0a2d', '#3eaee1', '#a3cde3', '#d8e6ed'],
            borderWidth: 0,
         },
      ],
   };

   const variacoes = [
      {
         label: '> 2 salário',
         valor: '39.11%',
         variacao: '+2.98%',
         cor: '#0d0a2d',
         tipo: 'up',
      },
      {
         label: '> 1,5 salário',
         valor: '28.02%',
         variacao: '-3.25%',
         cor: '#3eaee1',
         tipo: 'down',
      },
      {
         label: '> 1 salário',
         valor: '23.13%',
         variacao: '+0.14%',
         cor: '#a3cde3',
         tipo: 'up',
      },
      {
         label: '< 1 salário',
         valor: '5.03%',
         variacao: '-1.11%',
         cor: '#d8e6ed',
         tipo: 'down',
      },
   ];

   const options = {
      plugins: {
         legend: { display: false },
         tooltip: { enabled: true },
         datalabels: { display: false },
      },
   };

   return (
      <div className="w-full mx-auto p-4 rounded-xl shadow bg-white">
         <h3 className="text-gray-500 text-2xl font-medium">Estatística</h3>
         <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Divisão por renda da família</h2>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
               2025
            </div>
         </div>
         <hr className="my-2" />
         <div className="flex items-start gap-4">
            <div className="w-1/2">
               <Pie data={data} options={options} />
            </div>
            <div className="w-1/2 space-y-2 text-sm mt-1">
               {variacoes.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                     <div className="flex items-center">
                        <span
                           className="w-3 h-3 rounded-full mr-2"
                           style={{ backgroundColor: item.cor }}
                        ></span>
                        <span className="text-gray-700 text-2xl font-medium">
                           {item.label}
                        </span>
                     </div>
                     <div className="flex items-center gap-1">
                        <span className="text-gray-700 text-xl">
                           {item.valor}
                        </span>
                        <span
                           className={`text-xl font-medium ${
                              item.tipo === 'up'
                                 ? 'text-green-600'
                                 : 'text-red-600'
                           }`}
                        >
                           ({item.variacao})
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export { FamiliyIncomeDistributionChart };
