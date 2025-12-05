// src/features/personal/components/mac-address-instruction.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';

import { AlertCircle, Monitor } from 'lucide-react';

const MacAddressInstruction = () => {
  return (
    <Card className='border-muted bg-muted/30'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Monitor className='w-5 h-5' />
          Hướng dẫn lấy địa chỉ MAC
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-md border border-blue-200 dark:border-blue-800'>
          <AlertCircle className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0' />
          <p className='text-sm text-blue-900 dark:text-blue-100'>
            <strong>Lưu ý:</strong> Địa chỉ MAC là một mã định danh duy nhất của máy tính. Vui lòng lấy địa chỉ MAC của
            máy tính mà bạn sẽ sử dụng để chạy ứng dụng SproutVR.
          </p>
        </div>

        {/* Windows Instructions */}
        <div className='space-y-2'>
          <h4 className='font-semibold text-primary flex items-center gap-2'>
            <span className='bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs'>
              1
            </span>
            Trên Windows:
          </h4>
          <ol className='space-y-2 ml-8 text-sm text-muted-foreground list-decimal'>
            <li>
              Nhấn tổ hợp phím{' '}
              <kbd className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>Windows + R</kbd>
            </li>
            <li>
              Gõ <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>cmd</code> và nhấn
              Enter
            </li>
            <li>
              Trong cửa sổ Command Prompt, gõ lệnh:{' '}
              <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>ipconfig /all</code>
            </li>
            <li>
              Tìm dòng <strong>"Physical Address"</strong> hoặc <strong>"Địa chỉ Vật lý"</strong>
            </li>
            <li>
              Sao chép chuỗi ký tự dạng:{' '}
              <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>
                00-1A-2B-3C-4D-5E
              </code>
            </li>
          </ol>
        </div>

        {/* macOS Instructions */}
        <div className='space-y-2'>
          <h4 className='font-semibold text-primary flex items-center gap-2'>
            <span className='bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs'>
              2
            </span>
            Trên macOS:
          </h4>
          <ol className='space-y-2 ml-8 text-sm text-muted-foreground list-decimal'>
            <li>Nhấn vào biểu tượng Apple ở góc trên bên trái màn hình</li>
            <li>
              Chọn <strong>System Settings</strong> (Cài đặt Hệ thống)
            </li>
            <li>
              Chọn <strong>Network</strong> (Mạng)
            </li>
            <li>Chọn kết nối mạng đang sử dụng (Wi-Fi hoặc Ethernet)</li>
            <li>
              Nhấn vào <strong>Details</strong> (Chi tiết)
            </li>
            <li>
              Tìm <strong>"MAC Address"</strong> hoặc <strong>"Hardware Address"</strong>
            </li>
            <li>
              Sao chép chuỗi ký tự dạng:{' '}
              <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>
                00:1A:2B:3C:4D:5E
              </code>
            </li>
          </ol>
        </div>

        {/* Linux Instructions */}
        <div className='space-y-2'>
          <h4 className='font-semibold text-primary flex items-center gap-2'>
            <span className='bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs'>
              3
            </span>
            Trên Linux:
          </h4>
          <ol className='space-y-2 ml-8 text-sm text-muted-foreground list-decimal'>
            <li>Mở Terminal</li>
            <li>
              Gõ lệnh:{' '}
              <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>ip link show</code>{' '}
              hoặc <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>ifconfig</code>
            </li>
            <li>
              Tìm dòng <strong>"link/ether"</strong> hoặc <strong>"HWaddr"</strong>
            </li>
            <li>
              Sao chép chuỗi ký tự dạng:{' '}
              <code className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono'>
                00:1a:2b:3c:4d:5e
              </code>
            </li>
          </ol>
        </div>

        <div className='mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-800'>
          <p className='text-sm text-amber-900 dark:text-amber-100'>
            <strong>Lưu ý:</strong> Hệ thống chấp nhận địa chỉ MAC với dấu gạch ngang (-), dấu hai chấm (:) hoặc không
            có dấu phân cách. Ví dụ: 00-1A-2B-3C-4D-5E, 00:1A:2B:3C:4D:5E hoặc 001A2B3C4D5E
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MacAddressInstruction;
