'use client';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import configs from '@/core/configs';

import useGetPayments from '../hooks/useGetPayments';
import { PaymentStatus } from '../../../common/types/payment.type';

import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Filter,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertUtcDate } from '@/common/utils/convertUtcDate';

export default function PaymentListPage() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Fetch payments with backend search and pagination
  const { data, isLoading, isError, refetch } = useGetPayments({
    pageIndex,
    pageSize,
    isPaginated: true,
    minAmount: minAmount ? parseFloat(minAmount) : undefined,
    maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
    orderId: orderId.trim() || undefined,
    status: status || undefined,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  // Extract payments and pagination info from backend response
  const { payments, totalCount, totalPages } = useMemo(() => {
    if (!data?.data) return { payments: [], totalCount: 0, totalPages: 0 };

    const payments = data.data;
    const totalCount = data.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    return { payments, totalCount, totalPages };
  }, [data, pageSize]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setPageIndex(1);
  };

  const handleClearFilters = () => {
    setMinAmount('');
    setMaxAmount('');
    setOrderId('');
    setStatus('');
    setFromDate('');
    setToDate('');
    setPageIndex(1);
  };

  const hasActiveFilters = minAmount || maxAmount || orderId || status || fromDate || toDate;

  const formatCurrency = (amount: number, currency: string = 'VND') => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const isSuccess = status === PaymentStatus.Succeeded;
    const label = isSuccess ? 'Thành công' : status === PaymentStatus.Failed ? 'Thất bại' : status;
    const className = isSuccess
      ? 'bg-green-100 text-green-800'
      : status === PaymentStatus.Failed
        ? 'bg-red-100 text-red-800'
        : 'bg-gray-100 text-gray-800';

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>{label}</span>;
  };

  const getPaymentMethodBadge = (method?: string) => {
    if (!method) return '—';
    const label = method === 'PAYOS' ? 'PayOS' : method === 'MANUAL' ? 'Thủ công' : method;
    return <span className='px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'>{label}</span>;
  };

  if (isError) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-red-500'>Có lỗi xảy ra khi tải danh sách giao dịch</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <CreditCard className='w-8 h-8 text-primary' />
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Quản lý giao dịch</h1>
                <p className='text-sm text-muted-foreground mt-1'>Tổng số: {totalCount} giao dịch</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' size='sm' onClick={() => setShowFilters(!showFilters)} className='gap-2'>
                <Filter className='w-4 h-4' />
                Bộ lọc
                {hasActiveFilters && <span className='w-2 h-2 bg-primary rounded-full' />}
              </Button>
              <Button variant='outline' size='sm' onClick={() => refetch()} className='gap-2'>
                <RefreshCw className='w-4 h-4' />
                Làm mới
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className='mb-6'>
                <CardContent className='pt-6'>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='orderId'>ID Đơn hàng</Label>
                      <Input
                        id='orderId'
                        placeholder='Nhập ID đơn hàng...'
                        value={orderId}
                        onChange={(e) => {
                          setOrderId(e.target.value);
                          handleFilterChange();
                        }}
                        className='mt-1.5'
                      />
                    </div>
                    <div>
                      <Label htmlFor='minAmount'>Số tiền tối thiểu (VND)</Label>
                      <Input
                        id='minAmount'
                        type='number'
                        placeholder='0'
                        value={minAmount}
                        onChange={(e) => {
                          setMinAmount(e.target.value);
                          handleFilterChange();
                        }}
                        className='mt-1.5'
                      />
                    </div>
                    <div>
                      <Label htmlFor='maxAmount'>Số tiền tối đa (VND)</Label>
                      <Input
                        id='maxAmount'
                        type='number'
                        placeholder='0'
                        value={maxAmount}
                        onChange={(e) => {
                          setMaxAmount(e.target.value);
                          handleFilterChange();
                        }}
                        className='mt-1.5'
                      />
                    </div>
                    <div>
                      <Label htmlFor='status'>Trạng thái</Label>
                      <select
                        id='status'
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                          handleFilterChange();
                        }}
                        className='mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      >
                        <option value=''>Tất cả</option>
                        <option value={PaymentStatus.Succeeded}>Thành công</option>
                        <option value={PaymentStatus.Failed}>Thất bại</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor='fromDate'>Từ ngày</Label>
                      <Input
                        id='fromDate'
                        type='date'
                        value={fromDate}
                        onChange={(e) => {
                          setFromDate(e.target.value);
                          handleFilterChange();
                        }}
                        className='mt-1.5'
                      />
                    </div>
                    <div>
                      <Label htmlFor='toDate'>Đến ngày</Label>
                      <Input
                        id='toDate'
                        type='date'
                        value={toDate}
                        onChange={(e) => {
                          setToDate(e.target.value);
                          handleFilterChange();
                        }}
                        className='mt-1.5'
                      />
                    </div>
                  </div>
                  {hasActiveFilters && (
                    <div className='mt-4 flex justify-end'>
                      <Button variant='ghost' size='sm' onClick={handleClearFilters} className='gap-2'>
                        <X className='w-4 h-4' />
                        Xóa bộ lọc
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className='text-xl flex items-center justify-between'>
                <span>Danh sách giao dịch</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='flex justify-center items-center py-12'>
                  <Loader2 className='w-8 h-8 animate-spin text-primary' />
                  <span className='ml-2 text-muted-foreground'>Đang tải...</span>
                </div>
              ) : payments.length === 0 ? (
                <div className='text-center py-12'>
                  <CreditCard className='w-16 h-16 mx-auto text-muted-foreground mb-4' />
                  <p className='text-muted-foreground'>Chưa có giao dịch nào</p>
                  {hasActiveFilters && (
                    <p className='text-sm text-muted-foreground mt-2'>Thử xóa bộ lọc để xem tất cả giao dịch</p>
                  )}
                </div>
              ) : (
                <>
                  <div className='overflow-x-auto'>
                    <table className='w-full'>
                      <thead>
                        <tr className='border-b bg-muted/50'>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>ID Đơn hàng</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Số tiền</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Phương thức</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Mã giao dịch</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Ngân hàng</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Loại thanh toán</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Trạng thái</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Thời gian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment, index) => {
                          // Create unique key from orderId, transactionCode, and index
                          const uniqueKey = `${payment.orderId}-${payment.transactionCode || 'no-code'}-${payment.createdAtUtc}-${index}`;
                          return (
                            <motion.tr
                              key={uniqueKey}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className='border-b hover:bg-muted/30 transition-colors'
                            >
                              <td className='px-4 py-3 font-medium text-sm'>
                                <Link
                                  to={configs.routes.adminOrderDetails.replace(':id', payment.orderId)}
                                  className='text-primary hover:underline'
                                >
                                  {payment.orderId.slice(0, 8)}...
                                </Link>
                              </td>
                              <td className='px-4 py-3 text-sm font-semibold text-secondary'>
                                {formatCurrency(payment.amount, payment.currency)}
                              </td>
                              <td className='px-4 py-3'>{getPaymentMethodBadge(payment.paymentMethod)}</td>
                              <td className='px-4 py-3 text-sm font-mono'>{payment.transactionCode || '—'}</td>
                              <td className='px-4 py-3 text-sm'>
                                {payment.bankName || payment.bankCode || '—'}
                              </td>
                              <td className='px-4 py-3 text-sm'>{payment.paymentType || '—'}</td>
                              <td className='px-4 py-3'>{getStatusBadge(payment.status)}</td>
                              <td className='px-4 py-3 text-sm text-muted-foreground'>
                                {formatDate(payment.createdAtUtc)}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
                      <p className='text-sm text-muted-foreground'>
                        Hiển thị {(pageIndex - 1) * pageSize + 1} - {Math.min(pageIndex * pageSize, totalCount)} trong
                        tổng số {totalCount} giao dịch
                      </p>
                      <div className='flex items-center gap-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => setPageIndex((prev) => Math.max(1, prev - 1))}
                          disabled={pageIndex === 1}
                        >
                          <ChevronLeft className='w-4 h-4' />
                          Trước
                        </Button>

                        {/* Page Numbers */}
                        <div className='flex gap-1'>
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (pageIndex <= 3) {
                              pageNum = i + 1;
                            } else if (pageIndex >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = pageIndex - 2 + i;
                            }

                            return (
                              <Button
                                key={pageNum}
                                size='sm'
                                variant={pageIndex === pageNum ? 'default' : 'outline'}
                                onClick={() => setPageIndex(pageNum)}
                                className='w-9'
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => setPageIndex((prev) => Math.min(totalPages, prev + 1))}
                          disabled={pageIndex === totalPages}
                        >
                          Sau
                          <ChevronRight className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

