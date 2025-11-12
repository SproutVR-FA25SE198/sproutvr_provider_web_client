import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateOrganization } from '../services/organization.service';
import type { UpdateOrganizationPayload } from '../types/organization.type';
import { GET_ORGANIZATIONS_QUERY_KEY } from './useGetOrganizations';

interface UseUpdateOrganizationParams {
  onSuccess?: () => void;
}

const useUpdateOrganization = ({ onSuccess }: UseUpdateOrganizationParams = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOrganizationPayload }) =>
      updateOrganization(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ORGANIZATIONS_QUERY_KEY] });
      onSuccess?.();
    },
  });
};

export default useUpdateOrganization;


