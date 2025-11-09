import { OrganizationDetailsDto } from '@/common/types/user.type';

import { GET_ORGANIZATION_BY_ID_QUERY_KEY, getOrganizationById } from '../services/organization.service';

import { useQuery } from '@tanstack/react-query';

const useGetOrganizationById = (organizationId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_ORGANIZATION_BY_ID_QUERY_KEY, organizationId],
    queryFn: () => getOrganizationById(organizationId),
    enabled: !!organizationId,
    refetchOnWindowFocus: false,
    select: (res) => res.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { data: data as OrganizationDetailsDto, isLoading, isError };
};

export default useGetOrganizationById;

