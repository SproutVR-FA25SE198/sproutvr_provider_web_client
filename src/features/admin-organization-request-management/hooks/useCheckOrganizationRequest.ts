import { useMutation } from '@tanstack/react-query';

import type { CheckOrganizationRequestPayload } from '../services/organization-request.service';

import { checkOrganizationRequest } from '../services/organization-request.service';

const useCheckOrganizationRequest = () => {
  return useMutation({
    mutationFn: (payload: CheckOrganizationRequestPayload) => checkOrganizationRequest(payload),
  });
};

export default useCheckOrganizationRequest;


