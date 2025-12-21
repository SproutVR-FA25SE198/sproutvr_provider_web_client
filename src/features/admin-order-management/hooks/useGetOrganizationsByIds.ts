import { OrganizationDetailsDto } from '@/common/types/user.type';

import { GET_ORGANIZATION_BY_ID_QUERY_KEY, getOrganizationById } from '../services/organization.service';

import { useQueries } from '@tanstack/react-query';

/**
 * Optimized hook to fetch multiple organizations by IDs in parallel
 * Uses React Query's useQueries for parallel fetching with automatic caching
 * Only fetches unique organization IDs to minimize API calls
 */
const useGetOrganizationsByIds = (organizationIds: string[]) => {
  // Get unique organization IDs
  const uniqueIds = Array.from(new Set(organizationIds.filter(Boolean)));

  const queries = useQueries({
    queries: uniqueIds.map((id) => ({
      queryKey: [GET_ORGANIZATION_BY_ID_QUERY_KEY, id],
      queryFn: () => getOrganizationById(id),
      enabled: !!id,
      refetchOnWindowFocus: false,
      select: (res: any) => res.data as OrganizationDetailsDto,
      staleTime: 5 * 60 * 1000, // 5 minutes cache
    })),
  });

  // Create a map for quick lookup: organizationId -> organization data
  const organizationsMap = new Map<string, OrganizationDetailsDto | undefined>();
  const isLoadingMap = new Map<string, boolean>();
  const isErrorMap = new Map<string, boolean>();

  queries.forEach((query, index) => {
    const orgId = uniqueIds[index];
    organizationsMap.set(orgId, query.data);
    isLoadingMap.set(orgId, query.isLoading);
    isErrorMap.set(orgId, query.isError);
  });

  // Helper function to get organization by ID
  const getOrganization = (id: string) => {
    return organizationsMap.get(id);
  };

  const isLoading = (id: string) => {
    return isLoadingMap.get(id) ?? false;
  };

  const isError = (id: string) => {
    return isErrorMap.get(id) ?? false;
  };

  // Check if any query is still loading
  const isAnyLoading = queries.some((query) => query.isLoading);

  return {
    getOrganization,
    isLoading,
    isError,
    isAnyLoading,
  };
};

export default useGetOrganizationsByIds;

