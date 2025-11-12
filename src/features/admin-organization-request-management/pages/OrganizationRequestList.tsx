'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/common/components/ui/select';
import configs from '@/core/configs';
import { motion } from 'framer-motion';
import { Loader2, ShieldPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ApprovalStatusBadge from '../components/approval-status-badge';
import useGetOrganizationRequests from '../hooks/useGetOrganizationRequests';

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function OrganizationRequestListPage() {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetOrganizationRequests({
    pageIndex,
    pageSize,
  });

  const totalPages = useMemo(() => {
    if (!data?.count || !data?.pageSize) return 1;
    return Math.max(1, Math.ceil(data.count / data.pageSize));
  }, [data?.count, data?.pageSize]);

  const handleReviewRequest = (id: string) => {
    navigate(configs.routes.adminOrganizationRequestCheck.replace(':id', id));
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setPageIndex((prev) => {
      if (direction === 'prev') return Math.max(1, prev - 1);
      return Math.min(totalPages, prev + 1);
    });
  };

  const handlePageSizeChange = (value: string) => {
    const size = Number(value);
    setPageSize(size);
    setPageIndex(1);
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <ShieldPlus className='w-8 h-8 text-primary' />
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Yêu cầu đăng ký tổ chức</h1>
                <p className='text-sm text-muted-foreground mt-1'>
                  Tổng số: {data?.count ?? 0} yêu cầu
                </p>
              </div>
            </div>

          </div>

          <Card>
            <CardHeader className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <CardTitle className='text-xl'>Danh sách yêu cầu</CardTitle>
              <div className='flex items-center gap-3'>
                <span className='text-sm text-muted-foreground'>Số bản ghi mỗi trang</span>
                <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className='w-28'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isError ? (
                <div className='text-center py-12 text-destructive'>Không thể tải danh sách yêu cầu.</div>
              ) : isLoading ? (
                <div className='flex justify-center items-center py-12 gap-2 text-muted-foreground'>
                  <Loader2 className='w-6 h-6 animate-spin text-primary' />
                  Đang tải...
                </div>
              ) : !data || data.data.length === 0 ? (
                <div className='text-center py-12 text-muted-foreground'>Chưa có yêu cầu nào.</div>
              ) : (
                <div className='space-y-4'>
                  <div className='hidden md:grid md:grid-cols-12 text-sm font-medium text-muted-foreground border-b pb-2'>
                    <span className='col-span-3'>Tên tổ chức</span>
                    <span className='col-span-3'>Email</span>
                    <span className='col-span-2'>Số điện thoại</span>
                    <span className='col-span-2'>Trạng thái</span>
                    <span className='col-span-2'>Thao tác</span>
                  </div>
                  <div className='space-y-3'>
                    {data.data.map((request) => (
                      <div
                        key={request.id}
                        className='rounded-lg border border-border p-4 hover:border-primary transition-colors'
                      >
                        <div className='grid md:grid-cols-12 gap-3 items-center'>
                          <div className='md:col-span-3'>
                            <p className='font-semibold'>{request.organizationName}</p>
                            <p className='text-xs text-muted-foreground mt-1'>{request.address}</p>
                          </div>
                          <div className='md:col-span-3'>
                            <p className='text-sm'>{request.contactEmail}</p>
                          </div>
                          <div className='md:col-span-2'>
                            <p className='text-sm'>{request.contactPhone}</p>
                          </div>
                          <div className='md:col-span-2'>
                            <ApprovalStatusBadge status={request.approvalStatus} />
                          </div>
                          <div className='md:col-span-2 flex'>
                            {request.approvalStatus === 'Approval_Pending' ? (
                              <Button size='sm' variant='outline' onClick={() => handleReviewRequest(request.id)}>
                                Kiểm duyệt
                              </Button>
                            ) : (
                              request.approvalStatus === 'Unverified' ? (
                                <span className='text-xs text-muted-foreground italic'>Chờ xác minh</span>
                              ) : (
                                <span className='text-xs text-muted-foreground italic'>Đã xử lý</span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t'>
                    <span className='text-sm text-muted-foreground'>
                      Trang {pageIndex} / {totalPages}
                    </span>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange('prev')}
                        disabled={pageIndex === 1}
                      >
                        Trước
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange('next')}
                        disabled={pageIndex === totalPages}
                      >
                        Sau
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


