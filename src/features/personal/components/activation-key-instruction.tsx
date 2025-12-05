// src/features/personal/components/activation-key-instruction.tsx
import { Card, CardContent, CardHeader } from '@/common/components/ui/card';

import { AlertCircle } from 'lucide-react';

const ActivationKeyInstruction = () => {
  return (
    <Card className='border-muted bg-muted/30'>
      <CardHeader />
      <CardContent className='space-y-4'>
        <div className='flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-800'>
          <AlertCircle className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0' />
          <div className='text-sm text-blue-900 dark:text-blue-100 space-y-2'>
            <p>
              <strong>Activation Key</strong> là mã kích hoạt để sử dụng ứng dụng SproutVR trên máy tính.
            </p>
            <p>
              Sử dụng key này để kích hoạt bộ cài đặt (Bundle) và truy cập tất cả các bản đồ (maps) mà tổ chức đã mua
              trong ứng dụng desktop.
            </p>
          </div>
        </div>

        <div className='p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-800'>
          <p className='text-sm text-amber-900 dark:text-amber-100'>
            <strong>Lưu ý:</strong> Bạn cần có địa chỉ MAC đã được đăng ký để kích hoạt thành công.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivationKeyInstruction;
