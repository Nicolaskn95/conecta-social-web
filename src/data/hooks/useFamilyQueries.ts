import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
    familyService,
    FamilyFilters,
    FamilyResponse,
    FamilyDetailResponse,
} from '../services/familyService';
import { queryKeys } from '../query/queryKeys';


// Hook para buscar famílias
export function useFamilies(
    filters?: FamilyFilters,
    options?: Omit<UseQueryOptions<FamilyResponse>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey: queryKeys.families.list(filters || {}),
        queryFn: () => familyService.getAll(filters),
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutos
        ...options,
    });
}

// Hook para buscar família por ID
export function useFamilyById(
    id: string,
    options?: Omit<UseQueryOptions<FamilyDetailResponse>, 'queryKey' | 'queryFn'>
) {
    return useQuery({
        queryKey: queryKeys.families.detail(id),
        queryFn: () => familyService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutos
        ...options,
    });
}

// Hook para buscar famílias com filtro de busca
export function useFamiliesWithSearch(
    search: string,
    options?: Omit<UseQueryOptions<FamilyResponse>, 'queryKey' | 'queryFn'>
) {
    return useFamilies(
        { search },
        {
            enabled: !!search,
            ...options,
        }
    );
}
