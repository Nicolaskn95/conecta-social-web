import {
   useBaseList,
   useBaseDetail,
   useBaseSearch,
   useBasePagination,
} from './useBaseQueries';
import {
   familyService,
   FamilyFilters,
   FamilyResponse,
   FamilyDetailResponse,
} from '../services/familyService';
import { queryKeys } from '../query/queryKeys';

// Tipo temporário para famílias - substitua pela interface real quando disponível
interface IFamily {
   id: string;
   name: string;
   // Adicione outros campos conforme necessário
}

// Hook para buscar famílias
export function useFamilies(
   filters?: FamilyFilters,
   options?: Parameters<typeof useBaseList<IFamily>>[3]
) {
   return useBaseList(
      queryKeys.families.lists(),
      () => familyService.getAll(filters),
      filters,
      options
   );
}

// Hook para buscar família por ID
export function useFamilyById(
   id: string,
   options?: Parameters<typeof useBaseDetail<IFamily>>[3]
) {
   return useBaseDetail(
      queryKeys.families.details(),
      id,
      (id) => familyService.getById(id),
      options
   );
}

// Hook para buscar famílias com filtro de busca
export function useFamiliesWithSearch(
   search: string,
   options?: Parameters<typeof useBaseSearch<IFamily>>[3]
) {
   return useBaseSearch(
      queryKeys.families.lists(),
      search,
      (filters) => familyService.getAll(filters),
      options
   );
}

// Hook para buscar famílias com paginação
export function useFamiliesWithPagination(
   page = 1,
   limit = 10,
   filters?: Omit<FamilyFilters, 'offset' | 'limit'>,
   options?: Parameters<typeof useBasePagination<IFamily>>[5]
) {
   return useBasePagination(
      queryKeys.families.lists(),
      page,
      limit,
      (filters) => familyService.getAll(filters),
      filters,
      options
   );
}

// Hook para buscar famílias por status
export function useFamiliesByStatus(
   status: string,
   options?: Parameters<typeof useBaseList<IFamily>>[3]
) {
   return useBaseList(
      [...queryKeys.families.lists(), 'status', status],
      () => familyService.getByStatus(status),
      { status },
      options
   );
}

// Hook para buscar famílias por cidade
export function useFamiliesByCity(
   city: string,
   options?: Parameters<typeof useBaseList<IFamily>>[3]
) {
   return useBaseList(
      [...queryKeys.families.lists(), 'city', city],
      () => familyService.getByCity(city),
      {},
      options
   );
}
