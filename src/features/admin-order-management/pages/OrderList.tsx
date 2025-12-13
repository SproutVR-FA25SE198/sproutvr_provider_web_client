'use client';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { ORDER_STATUS_LABELS, ORDER_STATUS_STYLES, OrderStatus } from '@/common/constants/order-status';
import configs from '@/core/configs';

import useGetAdminOrders from '../hooks/useGetAdminOrders';

import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Loader2,
  Package,
  RefreshCw,
  ScrollText,
  Search,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderListPage() {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all orders without search term (we'll filter client-side)
  const { data, isLoading, isError, refetch } = useGetAdminOrders({
    pageIndex: 1,
    pageSize: 1000, // Fetch all orders for client-side filtering
    status: status || undefined,
  });

  // Filter and paginate on client side
  const { orders, totalCount, totalPages } = useMemo(() => {
    if (!data?.data) return { orders: [], totalCount: 0, totalPages: 0 };

    let filtered = [...data.data];

    // Client-side search filtering
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.orderCode?.toString().includes(query) ||
          order.representativeName?.toLowerCase().includes(query) ||
          order.organizationName?.toLowerCase().includes(query) ||
          order.representativePhone?.includes(query),
      );
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    // Paginate
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedOrders = filtered.slice(startIndex, endIndex);

    return { orders: paginatedOrders, totalCount, totalPages };
  }, [data?.data, searchTerm, pageIndex, pageSize]);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPageIndex(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPageIndex(1);
  };

  const handleClearFilters = () => {
    setStatus('');
    setSearchTerm('');
    setPageIndex(1);
  };

  const hasActiveFilters = status || searchTerm;

  const handleViewDetails = (orderId: string) => {
    navigate(configs.routes.adminOrderDetails.replace(':id', orderId));
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
    });
  };

  const getStatusBadge = (status: string) => {
    const label = ORDER_STATUS_LABELS[status] || status;
    const className = ORDER_STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>{label}</span>;
  };

  if (isError) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-red-500'>Có lỗi xảy ra khi tải danh sách đơn hàng</p>
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
              <Package className='w-8 h-8 text-primary' />
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Quản lý đơn hàng</h1>
                <p className='text-sm text-muted-foreground mt-1'>Tổng số: {totalCount} đơn hàng</p>
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
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='search'>Tìm kiếm</Label>
                      <div className='relative mt-1.5'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                        <Input
                          id='search'
                          placeholder='Tìm theo mã đơn, tên người đại diện, tên tổ chức, SĐT...'
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className='pl-10'
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor='status'>Trạng thái</Label>
                      <select
                        id='status'
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className='mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      >
                        <option value=''>Tất cả</option>
                        <option value={OrderStatus.PaymentPending}>Chờ thanh toán</option>
                        <option value={OrderStatus.BundlePending}>Chờ gói cài đặt</option>
                        <option value={OrderStatus.Finished}>Hoàn thành</option>
                        <option value={OrderStatus.Cancelled}>Đã hủy</option>
                        <option value={OrderStatus.PaymentFailed}>Thất bại</option>
                      </select>
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
                <span>Danh sách đơn hàng</span>
                {/* <Button variant={'secondary'}>
                  <ScrollText className='w-4 h-4' />
                  Xuất báo cáo doanh thu
                </Button> */}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className='flex justify-center items-center py-12'>
                  <Loader2 className='w-8 h-8 animate-spin text-primary' />
                  <span className='ml-2 text-muted-foreground'>Đang tải...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className='text-center py-12'>
                  <Package className='w-16 h-16 mx-auto text-muted-foreground mb-4' />
                  <p className='text-muted-foreground'>Chưa có đơn hàng nào</p>
                  {hasActiveFilters && (
                    <p className='text-sm text-muted-foreground mt-2'>Thử xóa bộ lọc để xem tất cả đơn hàng</p>
                  )}
                </div>
              ) : (
                <>
                  <div className='overflow-x-auto'>
                    <table className='w-full'>
                      <thead>
                        <tr className='border-b bg-muted/50'>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Mã đơn hàng</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Tổng tiền</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Số sản phẩm</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Trạng thái</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Đại diện</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>SĐT</th>
                          <th className='px-4 py-3 text-left text-sm font-semibold'>Ngày tạo</th>
                          <th className='px-4 py-3 text-center text-sm font-semibold'>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className='border-b hover:bg-muted/30 transition-colors'
                          >
                            <td className='px-4 py-3 font-medium text-sm'>{order.orderCode || order.id.slice(0, 8)}</td>
                            <td className='px-4 py-3 text-sm font-semibold text-secondary'>
                              {formatCurrency(order.totalMoneyAmount)}
                            </td>
                            <td className='px-4 py-3 text-sm text-center'>{order.totalItems}</td>
                            <td className='px-4 py-3'>{getStatusBadge(order.status)}</td>
                            <td className='px-4 py-3 text-sm'>{order.organizationName || order.representativeName}</td>
                            <td className='px-4 py-3 text-sm'>{order.representativePhone}</td>
                            <td className='px-4 py-3 text-sm text-muted-foreground'>
                              {formatDate(order.createdAtUtc)}
                            </td>
                            <td className='px-4 py-3 text-center'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleViewDetails(order.id)}
                                className='gap-2'
                              >
                                <Eye className='w-4 h-4' />
                                Xem chi tiết
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
                      <p className='text-sm text-muted-foreground'>
                        Hiển thị {(pageIndex - 1) * pageSize + 1} - {Math.min(pageIndex * pageSize, totalCount)} trong
                        tổng số {totalCount} đơn hàng
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
