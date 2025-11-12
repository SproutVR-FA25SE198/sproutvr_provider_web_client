import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deactivateOrganization } from '../services/organization.service';
import { GET_ORGANIZATIONS_QUERY_KEY } from './useGetOrganizations';

const useDeactivateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ORGANIZATIONS_QUERY_KEY] });
    },
  });
};

export default useDeactivateOrganization;


