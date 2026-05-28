'use client';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TableContainer from '@/components/Panel/TableContainer';
import { useDonationsToFamily } from '@/data/hooks/donation-to-family/useDonationToFamilyQueries';
import { IDonationToFamily } from '@/core/donation/model/IDonationToFamily';
import { useRouter } from 'next/navigation';

export default function DonationsToFamilyPage() {
   const router = useRouter();
   const { data } = useDonationsToFamily();
   const donationsToFamily = data?.data ?? [];

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações para Família' },
   ];

   const columns = [
      {
         key: 'created_at',
         label: 'Data de registro',
         render: (value: Date | string | null) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
      {
         key: 'donation',
         label: 'Item doado',
         render: (value: IDonationToFamily['donation']) => value?.name ?? '-',
      },
      {
         key: 'family',
         label: 'Família',
         render: (value: IDonationToFamily['family']) => value?.name ?? '-',
      },
      {
         key: 'quantity',
         label: 'Quantidade',
         render: (value: number, item: IDonationToFamily) => {
            const unit = item.donation?.category?.measure_unity ?? '';
            return `${value ?? 0} ${unit}`.trim();
         },
      },
      {
         key: 'update_message',
         label: 'Observação',
         render: (value: string | null) => value ?? '-',
      },
   ];

   return (
      <div className="min-h-full p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary justify-center flex text-nowrap w-60 text-center"
               onClick={() => router.push('/dashboard/donations-to-family/register')}
            >
               Nova Doação para Família
            </button>
         </div>

         <TableContainer
            title="Registros de Doações para Famílias"
            columns={columns}
            data={donationsToFamily}
            onSearch={() => {}}
         />
      </div>
   );
}
