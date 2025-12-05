'use client';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { ORDER_STATUS_LABELS, ORDER_STATUS_STYLES, OrderStatus } from '@/common/constants/order-status';
import configs from '@/core/configs';

import { useAppSelector } from '@/core/store/hooks';

import useGetAdminOrderById from '../hooks/useGetAdminOrderById';
import useGetOrganizationById from '../hooks/useGetOrganizationById';
import useUploadBundle from '../hooks/useUploadBundle';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Calendar,
  CreditCard,
  FileUp,
  Loader2,
  Package,
  Phone,
  Upload,
  User,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: order, isLoading, isError, refetch } = useGetAdminOrderById(id || '');
  const {
    data: organization,
    isLoading: isLoadingOrg,
    isError: isErrorOrg,
  } = useGetOrganizationById(order?.organizationId || '');
  const uploadMutation = useUploadBundle();

  // Get current admin user ID
  const currentUser = useAppSelector((state) => state.root.auth.user);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile || !id || !order || !organization || !currentUser) {
      return;
    }

    // Validate required fields
    if (!organization.bundleGoogleDriveId) {
      alert('Organization không có Bundle Google Drive ID. Vui lòng liên hệ quản trị viên.');
      return;
    }

    uploadMutation.mutate(
      {
        orderCode: order.orderCode,
        orderId: id,
        organizationId: order.organizationId,
        bundleGoogleDriveId: organization.bundleGoogleDriveId,
        assignedSystemAdminId: currentUser.sub, // user ID from JWT token
        file: selectedFile,
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          refetch();
        },
      },
    );
  };

  const canUploadBundle = () => {
    return order && organization && currentUser && !isLoadingOrg;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const label = ORDER_STATUS_LABELS[status] || status;
    const className = ORDER_STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';

    return <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${className}`}>{label}</span>;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex items-center gap-2'>
          <Loader2 className='w-8 h-8 animate-spin text-primary' />
          <span className='text-muted-foreground'>Đang tải thông tin đơn hàng...</span>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className='min-h-screen'>
        <div className='container mx-auto px-4 py-8'>
          <Card>
            <CardContent className='pt-6'>
              <p className='text-center text-red-500'>Không tìm thấy đơn hàng</p>
              <div className='flex justify-center mt-4'>
                <Button onClick={() => navigate(configs.routes.adminOrders)} variant='outline'>
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  Quay lại danh sách
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className='mb-6'>
            <Button onClick={() => navigate(configs.routes.adminOrders)} variant='ghost' className='mb-4'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại danh sách
            </Button>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Package className='w-8 h-8 text-primary' />
                <div>
                  <h1 className='text-3xl font-bold text-primary'>Chi tiết đơn hàng</h1>
                  <p className='text-muted-foreground mt-1'>Mã đơn hàng: {order.orderCode || order.id}</p>
                </div>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6 mb-6'>
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex text-green-500 items-center gap-2'>
                  <Package className='w-5 h-5' />
                  Thông tin đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <Calendar className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div className='flex-1'>
                    <p className='text-sm text-muted-foreground'>Ngày tạo</p>
                    <p className='font-medium'>{formatDate(order.createdAtUtc)}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Calendar className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div className='flex-1'>
                    <p className='text-sm text-muted-foreground'>Cập nhật lần cuối</p>
                    <p className='font-medium'>{formatDate(order.updatedAtUtc)}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <CreditCard className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div className='flex-1'>
                    <p className='text-sm text-muted-foreground'>Phương thức thanh toán</p>
                    <p className='font-medium'>{order.paymentMethod || 'Chuyển khoản ngân hàng'}</p>
                  </div>
                </div>
                {order.bank && (
                  <div className='flex items-start gap-3'>
                    <Building2 className='w-5 h-5 text-muted-foreground mt-0.5' />
                    <div className='flex-1'>
                      <p className='text-sm text-muted-foreground'>Ngân hàng</p>
                      <p className='font-medium'>{order.bank}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center text-blue-500 gap-2'>
                  <User className='w-5 h-5' />
                  Thông tin người đại diện
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <User className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div className='flex-1'>
                    <p className='text-sm text-muted-foreground'>Họ tên</p>
                    <p className='font-medium'>{order.representativeName}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Phone className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div className='flex-1'>
                    <p className='text-sm text-muted-foreground'>Số điện thoại</p>
                    <p className='font-medium'>{order.representativePhone}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Building2 className='w-5 h-5 text-muted-foreground mt-0.5' />
                  <div className='flex-1'>
                    <p className='text-sm text-muted-foreground'>Tổ chức</p>
                    <p className='font-medium break-all'>{organization.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle>Sản phẩm trong đơn hàng ({order.totalItems})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {order.orderItems.map((item, index) => (
                  <motion.div
                    key={item.mapId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className='flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow'
                  >
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.mapName} className='w-20 h-20 object-cover rounded-md' />
                    )}
                    <div className='flex-1'>
                      <h3 className='font-semibold text-lg'>{item.mapName}</h3>
                      <p className='text-sm text-muted-foreground'>Mã: {item.mapCode}</p>
                      <p className='text-sm text-muted-foreground'>Môn học: {item.subjectName}</p>
                    </div>
                    <div className='text-right'>
                      <p className='text-lg font-bold text-secondary'>{formatCurrency(item.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total */}
              <div className='mt-6 pt-6 border-t'>
                <div className='flex justify-between items-center text-xl font-bold'>
                  <span>Tổng tiền:</span>
                  <span className='text-secondary'>
                    {formatCurrency(order.orderItems.reduce((sum, item) => sum + item.price, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Bundle Section - Only show for Bundle_Pending status */}
          {(order.status === OrderStatus.BundlePending || order.status === 'Pending_Bundle') && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <FileUp className='w-5 h-5' />
                  Tải gói cài đặt lên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <p className='text-sm text-muted-foreground'>
                    Tải lên file gói cài đặt cho đơn hàng này. File sẽ được gửi đến khách hàng.
                  </p>

                  {/* Loading organization data */}
                  {isLoadingOrg && (
                    <div className='flex items-center gap-2 p-3 border rounded-lg bg-blue-50'>
                      <Loader2 className='w-4 h-4 animate-spin text-primary' />
                      <span className='text-sm'>Đang tải thông tin tổ chức...</span>
                    </div>
                  )}

                  {/* Error loading organization */}
                  {isErrorOrg && (
                    <div className='flex items-center gap-2 p-3 border rounded-lg bg-red-50 text-red-700'>
                      <AlertCircle className='w-4 h-4' />
                      <span className='text-sm'>Không thể tải thông tin tổ chức. Vui lòng thử lại.</span>
                    </div>
                  )}

                  {/* Organization info */}
                  {organization && (
                    <div className='p-3 border rounded-lg bg-muted/30'>
                      <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div>
                          <span className='text-muted-foreground'>Organization Name:</span>
                          <p className='font-medium text-xs'>{organization.name}</p>
                        </div>
                        <div>
                          <span className='text-muted-foreground'>MAC Address:</span>
                          <p className='font-medium text-xs'>{organization.macAddress || 'Chưa có'}</p>
                        </div>
                        <div className='col-span-2'>
                          <span className='text-muted-foreground'>Bundle Drive ID:</span>
                          <p className='font-medium text-xs break-all'>
                            {organization.bundleGoogleDriveId || 'Chưa có'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className='hidden'
                    accept='.zip,.rar,.7z'
                  />

                  <div className='flex items-center gap-4'>
                    <Button
                      onClick={handleUploadClick}
                      variant='outline'
                      className='gap-2'
                      disabled={!canUploadBundle()}
                    >
                      <Upload className='w-4 h-4' />
                      Chọn file
                    </Button>

                    {selectedFile && (
                      <div className='flex-1 flex items-center justify-between p-3 border rounded-lg bg-muted/30'>
                        <div className='flex items-center gap-2'>
                          <FileUp className='w-5 h-5 text-primary' />
                          <div>
                            <p className='font-medium text-sm'>{selectedFile.name}</p>
                            <p className='text-xs text-muted-foreground'>
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleUpload}
                          disabled={uploadMutation.isPending || !canUploadBundle()}
                          className='gap-2'
                        >
                          {uploadMutation.isPending ? (
                            <>
                              <Loader2 className='w-4 h-4 animate-spin' />
                              Đang tải lên...
                            </>
                          ) : (
                            <>
                              <Upload className='w-4 h-4' />
                              Tải lên
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className='text-xs text-muted-foreground'>Định dạng file được hỗ trợ: .zip, .rar, .7z</p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
