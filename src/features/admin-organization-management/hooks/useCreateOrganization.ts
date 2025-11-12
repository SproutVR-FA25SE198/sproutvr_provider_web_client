import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createOrganization } from '../services/organization.service';
import type { CreateOrganizationPayload } from '../types/organization.type';
import { GET_ORGANIZATIONS_QUERY_KEY } from './useGetOrganizations';

const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrganizationPayload) => createOrganization(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ORGANIZATIONS_QUERY_KEY] });
    },
  });
};

export default useCreateOrganization;


