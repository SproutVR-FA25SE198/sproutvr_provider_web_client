import http from '@/common/utils/http';

export const UPLOAD_BUNDLE_MUTATION_KEY = 'UPLOAD_BUNDLE_MUTATION_KEY';

export interface UploadBundleRequest {
  orderId: string;
  orderCode: number;
  organizationId: string;
  bundleGoogleDriveId: string;
  assignedSystemAdminId: string;
  file: File;
}

/**
 * Upload installation bundle for an order
 */
export const uploadBundle = async (data: UploadBundleRequest) => {
  const formData = new FormData();
  formData.append('bundleFile', data.file);
  formData.append('orderDto.OrderId', data.orderId);
  formData.append('orderDto.OrderCode', data.orderCode.toString());
  formData.append('orderDto.OrganizationId', data.organizationId);
  formData.append('orderDto.BundleGoogleDriveId', data.bundleGoogleDriveId);
  formData.append('orderDto.AssignedSystemAdminId', data.assignedSystemAdminId);

  // Debug - log FormData entries
  console.log('FormData entries:');
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  // Remove default 'application/json' header and increase timeout for large files
  const result = await http.post(`/bundles/upload`, formData, {
    headers: {
      'Content-Type': undefined, // Remove default Content-Type to let browser set it
    },
    timeout: 300000, // 5 minutes timeout for file upload (instead of default 10 seconds)
  });

  return result;
};

