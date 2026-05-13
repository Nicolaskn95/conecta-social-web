import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IVolunteer, VolunteerRole } from '@/core/volunteer/model/IVolunteer';
import {
   employeeService,
   EmployeePasswordPayload,
} from '@/data/services/employeeService';
import { queryKeys } from '@/data/query/queryKeys';

function useEmployeeInvalidation() {
   const queryClient = useQueryClient();

   return {
      invalidateEmployees: () => {
         queryClient.invalidateQueries({ queryKey: queryKeys.volunteers.all });
         queryClient.invalidateQueries({ queryKey: queryKeys.resources.roles() });
      },
      setEmployee: (id: string, data: unknown) => {
         queryClient.setQueryData(queryKeys.volunteers.detail(id), data);
      },
      removeEmployee: (id: string) => {
         queryClient.removeQueries({ queryKey: queryKeys.volunteers.detail(id) });
      },
   };
}

export function useEmployeeMutations() {
   const { invalidateEmployees, setEmployee, removeEmployee } =
      useEmployeeInvalidation();

   const createEmployee = useMutation({
      mutationFn: (employee: IVolunteer) => employeeService.createEmployee(employee),
      onSuccess: (data) => {
         if (data.data.id) {
            setEmployee(data.data.id, data);
         }
         invalidateEmployees();
         toast.success('Voluntário cadastrado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao cadastrar voluntário: ${error.message}`);
      },
   });

   const updateBasic = useMutation({
      mutationFn: ({ id, employee }: { id: string; employee: Partial<IVolunteer> }) =>
         employeeService.updateBasic(id, employee),
      onSuccess: (data, variables) => {
         setEmployee(variables.id, data);
         invalidateEmployees();
         toast.success('Voluntário atualizado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar voluntário: ${error.message}`);
      },
   });

   const updateRole = useMutation({
      mutationFn: ({ id, role }: { id: string; role: VolunteerRole }) =>
         employeeService.updateRole(id, role),
      onSuccess: (data, variables) => {
         setEmployee(variables.id, data);
         invalidateEmployees();
         toast.success('Função atualizada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar função: ${error.message}`);
      },
   });

   const updatePassword = useMutation({
      mutationFn: ({
         id,
         data,
      }: {
         id: string;
         data: EmployeePasswordPayload;
      }) => employeeService.updatePassword(id, data),
      onSuccess: (data, variables) => {
         setEmployee(variables.id, data);
         toast.success('Senha atualizada com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao atualizar senha: ${error.message}`);
      },
   });

   const deleteEmployee = useMutation({
      mutationFn: (id: string) => employeeService.deleteEmployee(id),
      onSuccess: (_, id) => {
         removeEmployee(id);
         invalidateEmployees();
         toast.success('Voluntário desativado com sucesso!');
      },
      onError: (error) => {
         toast.error(`Erro ao desativar voluntário: ${error.message}`);
      },
   });

   return {
      createEmployee,
      updateBasic,
      updateRole,
      updatePassword,
      deleteEmployee,
   };
}
