'use client';
import TableContainer from '@/components/Panel/TableContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';
import Modal from '@/components/Modal/Modal';
import { toast } from 'react-toastify';
import { IVolunteer } from '@/core/volunteer';
import { VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import { Status } from '@/components/shared/Status';

// Mock data for volunteers
const mockVolunteers: IVolunteer[] = [
   {
      id: '1',
      name: 'João',
      surname: 'Silva',
      birth_date: new Date('1990-05-15'),
      cpf: '12345678901',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      password: 'hashedPassword123',
      role: VolunteerRole.VOLUNTEER,
      cep: '01234-567',
      street: 'Rua das Flores',
      neighborhood: 'Centro',
      number: '123',
      city: 'São Paulo',
      uf: 'SP',
      state: 'São Paulo',
      complement: 'Apto 45',
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-01-15'),
   },
   {
      id: '2',
      name: 'Maria',
      surname: 'Santos',
      birth_date: new Date('1985-08-22'),
      cpf: '98765432100',
      email: 'maria.santos@email.com',
      phone: '(11) 88888-8888',
      password: 'hashedPassword456',
      role: VolunteerRole.MANAGER,
      cep: '04567-890',
      street: 'Avenida Paulista',
      neighborhood: 'Bela Vista',
      number: '456',
      city: 'São Paulo',
      uf: 'SP',
      state: 'São Paulo',
      created_at: new Date('2024-02-10'),
      updated_at: new Date('2024-02-10'),
   },
   {
      id: '3',
      name: 'Pedro',
      surname: 'Oliveira',
      birth_date: new Date('1992-03-10'),
      cpf: '11122233344',
      email: 'pedro.oliveira@email.com',
      phone: '(11) 77777-7777',
      password: 'hashedPassword789',
      role: VolunteerRole.ADMIN,
      cep: '07890-123',
      street: 'Rua Augusta',
      neighborhood: 'Consolação',
      number: '789',
      city: 'São Paulo',
      uf: 'SP',
      state: 'São Paulo',
      complement: 'Sala 101',
      created_at: new Date('2024-03-05'),
      updated_at: new Date('2024-03-05'),
   },
];

function Volunteers() {
   const router = useRouter();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [volunteers, setVolunteers] = useState<IVolunteer[]>(mockVolunteers);
   const [selectedVolunteer, setSelectedVolunteer] =
      useState<IVolunteer | null>(null);

   const register = () => {
      router.push('/dashboard/volunteers/register');
   };

   const breadcrumbItems = [
      { label: 'Início', href: '/dashboard' },
      { label: 'Voluntários' },
   ];

   const columns = [
      {
         key: 'created_at',
         label: 'Data de cadastro',
         render: (value: Date) =>
            value
               ? new Date(value).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                 })
               : '',
      },
      {
         key: 'name',
         label: 'Nome',
         render: (value: string, volunteer: IVolunteer) =>
            `${volunteer.name} ${volunteer.surname}`,
      },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telefone' },
      {
         key: 'role',
         label: 'Função',
         render: (value: VolunteerRole) => <Status status={value} />,
      },
      { key: 'city', label: 'Cidade' },
   ];

   const handleEdit = (volunteer: IVolunteer) => {
      router.push(`/dashboard/volunteers/${volunteer.id}`);
   };

   const handleDelete = (volunteer: IVolunteer) => {
      setSelectedVolunteer(volunteer);
      setIsDeleteModalOpen(true);
   };

   const handleDeleteConfirm = async () => {
      try {
         // Mock delete - remove from local state
         setVolunteers((prev) =>
            prev.filter((v) => v.id !== selectedVolunteer?.id)
         );
         toast.success('Voluntário excluído com sucesso!');
         setIsDeleteModalOpen(false);
         setSelectedVolunteer(null);
      } catch (error) {
         toast.error('Erro ao excluir voluntário');
         console.error('Erro ao excluir voluntário:', error);
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
      // Mock search functionality
      if (!value.trim()) {
         setVolunteers(mockVolunteers);
         return;
      }

      const filtered = mockVolunteers.filter(
         (volunteer) =>
            volunteer.name.toLowerCase().includes(value.toLowerCase()) ||
            volunteer.surname.toLowerCase().includes(value.toLowerCase()) ||
            volunteer.email.toLowerCase().includes(value.toLowerCase()) ||
            volunteer.city.toLowerCase().includes(value.toLowerCase())
      );
      setVolunteers(filtered);
   };

   return (
      <div className="min-h-screen p-4 bg-gray-100">
         <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <button
               className="btn-primary justify-center flex text-nowrap w-32 text-center"
               onClick={register}
            >
               Novo Voluntário
            </button>
         </div>
         <TableContainer
            title="Todos os Voluntários"
            columns={columns}
            data={volunteers}
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
                  Tem certeza que deseja excluir o voluntário &quot;
                  {selectedVolunteer?.name} {selectedVolunteer?.surname}
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
      </div>
   );
}

export default Volunteers;
