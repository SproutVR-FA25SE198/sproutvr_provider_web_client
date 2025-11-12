import { useQuery } from '@tanstack/react-query';

import type { OrganizationRequestPaginationResponse } from '../types/organization-request.type';

import {
  GET_ORGANIZATION_REQUESTS_QUERY_KEY,
  GetOrganizationRequestsParams,
  getOrganizationRequests,
} from '../services/organization-request.service';

const useGetOrganizationRequests = (params: GetOrganizationRequestsParams = {}) => {
  const query = useQuery({
    queryKey: [GET_ORGANIZATION_REQUESTS_QUERY_KEY, params],
    queryFn: () => getOrganizationRequests(params),
    refetchOnWindowFocus: false,
  });

  return {
    data: (query.data as OrganizationRequestPaginationResponse) ?? undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export default useGetOrganizationRequests;


