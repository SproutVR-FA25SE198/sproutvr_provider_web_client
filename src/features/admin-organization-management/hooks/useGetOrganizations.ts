import { useQuery } from '@tanstack/react-query';

import { getOrganizations } from '../services/organization.service';
import type { Organization } from '../types/organization.type';

export const GET_ORGANIZATIONS_QUERY_KEY = 'GET_ORGANIZATIONS_QUERY_KEY';

const useGetOrganizations = () => {
  const query = useQuery({
    queryKey: [GET_ORGANIZATIONS_QUERY_KEY],
    queryFn: getOrganizations,
    refetchOnWindowFocus: false,
  });

  return {
    data: (query.data as Organization[]) ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export default useGetOrganizations;


