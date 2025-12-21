import { useQuery } from '@tanstack/react-query';

import { getOrganizations, GetOrganizationsParams } from '../services/organization.service';
import type { Organization } from '../types/organization.type';

export const GET_ORGANIZATIONS_QUERY_KEY = 'GET_ORGANIZATIONS_QUERY_KEY';

const useGetOrganizations = (params: GetOrganizationsParams = {}) => {
  const query = useQuery({
    queryKey: [GET_ORGANIZATIONS_QUERY_KEY, params],
    queryFn: () => getOrganizations(params),
    refetchOnWindowFocus: false,
  });

  return {
    data: (query.data?.data as Organization[]) ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export default useGetOrganizations;


