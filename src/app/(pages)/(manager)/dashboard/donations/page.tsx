'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { toast } from 'react-toastify';
import { Category, IDonation } from '@/core/donation/model/IDonation';
import Status from '@/components/shared/Status';
import {
   exportToPDF,
   exportToExcel,
   generateFilename,
} from '@/utils/exportUtils';
import { FilePdfIcon, FileXlsIcon, Heart } from '@phosphor-icons/react';
import DonationPayment from '@/components/Payment/DonationPayment';

const mockDonations: IDonation[] = [
   {
      id: '1',
      category: Category.VESTIMENTA,
      name: 'Camisetas',
      description: 'Camisetas em bom estado',
      initial_quantity: 10,
      current_quantity: 8,
      donator_name: 'João Silva',
      available: true,
      gender: 'Unissex',
      size: 'M',
      active: true,
      created_at: new Date('2024-07-20'),
   },
   {
      id: '2',
      category: Category.ALIMENTO,
      name: 'Arroz',
      description: 'Pacotes de arroz 5kg',
      initial_quantity: 20,
      current_quantity: 15,
      donator_name: 'Maria Santos',
      available: true,
      gender: null,
      size: null,
      active: true,
      created_at: new Date('2024-07-18'),
   },
   {
      id: '3',
      category: Category.BRINQUEDO,
      name: 'Hot Wheels',
      description: 'Hot Wheels em bom estado',
      initial_quantity: 5,
      current_quantity: 3,
      donator_name: 'Pedro Oliveira',
      available: true,
      gender: null,
      size: null,
      active: true,
      created_at: new Date('2024-07-15'),
   },
   {
      id: '4',
      category: Category.ALIMENTO,
      name: 'Feijão',
      description: 'Feijão em bom estado',
      initial_quantity: 5,
      current_quantity: 3,
      donator_name: 'Pedro Oliveira',
      available: true,
      gender: null,
      size: null,
      active: true,
      created_at: new Date('2025-09-22'),
   },
   {
      id: '3',
      category: Category.BRINQUEDO,
      name: 'Bolas de futebol',
      description: 'Bolas de futebol em bom estado',
      initial_quantity: 5,
      current_quantity: 3,
      donator_name: 'Pedro Oliveira',
      available: true,
      gender: null,
      size: null,
      active: true,
      created_at: new Date('2025-09-22'),
   },
];

function Donations() {
   const router = useRouter();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [donations, setDonations] = useState<IDonation[]>(mockDonations);
   const [selectedDonation, setSelectedDonation] = useState<IDonation | null>(
      null
   );
   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

   const register = () => {
      router.push('/dashboard/donations/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Doações' },
   ];

   const columns = [
      { key: 'name', label: 'Nome' },
      {
         key: 'category',
         label: 'Categoria',
         render: (value: Category) => <Status status={value} />,
      },
      { key: 'donator_name', label: 'Doador' },
      {
         key: 'current_quantity',
         label: 'Quantidade Atual',
         render: (value: number | null) => value?.toString() || '0',
      },
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: Date | null) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
   ];

   const handleEdit = (donation: IDonation) => {
      router.push(`/dashboard/donations/${donation.id}`);
   };

   const handleDelete = (donation: IDonation) => {
      setSelectedDonation(donation);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      try {
         setDonations(donations.filter((d) => d.id !== selectedDonation?.id));
         toast.success('Doação excluída com sucesso!');
         setIsDeleteModalOpen(false);
         setSelectedDonation(null);
      } catch (error) {
         toast.error('Erro ao excluir doação');
         console.error('Erro ao excluir doação:', error);
      }
   };

   const actions = [
      {
         key: 'edit',
         label: 'Editar',
         icon: (
            <div className="rounded-md p-2 text-primary bg-tertiary hover:bg-primary hover:text-white">
               <PencilIcon size={24} />
            </div>
         ),
         onClick: handleEdit,
         className: '',
      },
      {
         key: 'delete',
         label: 'Deletar',
         icon: (
            <div className="text-danger hover:text-white bg-danger_hover rounded-md p-2 hover:bg-danger">
               <TrashIcon size={24} />
            </div>
         ),
         onClick: handleDelete,
         className: '',
      },
   ];

   const onSearch = (value: string) => {
      if (!value.trim()) {
         setDonations(mockDonations);
         return;
      }

      const filtered = mockDonations.filter(
         (donation) =>
            donation.name.toLowerCase().includes(value.toLowerCase()) ||
            (donation.donator_name &&
               donation.donator_name
                  .toLowerCase()
                  .includes(value.toLowerCase())) ||
            donation.category.toLowerCase().includes(value.toLowerCase())
      );
      setDonations(filtered);
   };

   const handleExportPDF = () => {
      try {
         const filename = generateFilename('pdf', 'doacoes');
         exportToPDF(donations, filename);
         toast.success('Relatório PDF exportado com sucesso!');
      } catch (error) {
         toast.error('Erro ao exportar PDF');
         console.error('Erro ao exportar PDF:', error);
      }
   };

   const handleExportExcel = () => {
      try {
         const filename = generateFilename('xlsx', 'doacoes');
         exportToExcel(donations, filename);
         toast.success('Planilha Excel exportada com sucesso!');
      } catch (error) {
         toast.error('Erro ao exportar Excel');
         console.error('Erro ao exportar Excel:', error);
      }
   };

   const handleMakeDonation = () => {
      setIsPaymentModalOpen(true);
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex gap-3">
               <button
                  className="btn-secondary justify-center flex items-center gap-2 text-nowrap w-32 text-center"
                  onClick={handleExportPDF}
                  title="Exportar para PDF"
               >
                  <FilePdfIcon size={20} />
                  PDF
               </button>
               <button
                  className="btn-secondary justify-center flex items-center gap-2 text-nowrap w-32 text-center"
                  onClick={handleExportExcel}
                  title="Exportar para Excel"
               >
                  <FileXlsIcon size={20} />
                  Excel
               </button>
               <button
                  className="btn-primary justify-center flex items-center gap-2 text-nowrap w-32 text-center"
                  onClick={handleMakeDonation}
                  title="Fazer Doação"
               >
                  <Heart size={20} />
                  Doar
               </button>
               <button
                  className="btn-primary justify-center flex text-nowrap w-32 text-center"
                  onClick={register}
               >
                  Nova Doação
               </button>
            </div>
         </div>
         <TableContainer
            title="Todas as Doações"
            columns={columns}
            data={donations}
            actions={actions}
            onSearch={onSearch}
         />
         <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirmar Exclusão"
         >
            <div className="space-y-4">
               <p>
                  Tem certeza que deseja excluir a doação &quot;
                  {selectedDonation?.name}
                  &quot;?
               </p>
               <div className="flex justify-end space-x-3">
                  <button
                     onClick={() => setIsDeleteModalOpen(false)}
                     className="btn-secondary"
                  >
                     Cancelar
                  </button>
                  <button onClick={handleDeleteConfirm} className="btn-danger">
                     Excluir
                  </button>
               </div>
            </div>
         </Modal>

         <DonationPayment
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
         />
      </div>
   );
}

export default Donations;
