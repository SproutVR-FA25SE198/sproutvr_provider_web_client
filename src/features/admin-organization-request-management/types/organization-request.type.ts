export type ApprovalStatus = 'Unverified' | 'Approval_Pending' | 'Approved' | 'Rejected';

export interface OrganizationRequest {
  id: string;
  organizationName: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  approvalStatus: ApprovalStatus;
}

export interface OrganizationRequestPaginationResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: OrganizationRequest[];
}


