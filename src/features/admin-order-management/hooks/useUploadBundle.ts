import { UPLOAD_BUNDLE_MUTATION_KEY, UploadBundleRequest, uploadBundle } from '../services/bundle.service';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useUploadBundle = () => {
  const mutation = useMutation({
    mutationKey: [UPLOAD_BUNDLE_MUTATION_KEY],
    mutationFn: (data: UploadBundleRequest) => uploadBundle(data),
    onSuccess: () => {
      toast.success('Tải gói cài đặt lên thành công!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Tải gói cài đặt lên thất bại!');
    },
  });

  return mutation;
};

export default useUploadBundle;

