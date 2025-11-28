import { useQuery } from '@tanstack/react-query';

import type { OrganizationRequest } from '../types/organization-request.type';

import {
  GET_ORGANIZATION_REQUEST_BY_ID_QUERY_KEY,
  getOrganizationRequestById,
} from '../services/organization-request.service';

const useGetOrganizationRequestById = (id?: string) => {
  const query = useQuery({
    queryKey: [GET_ORGANIZATION_REQUEST_BY_ID_QUERY_KEY, id],
    queryFn: () => getOrganizationRequestById(id as string),
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  return {
    data: (query.data as OrganizationRequest) ?? undefined,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export default useGetOrganizationRequestById;


