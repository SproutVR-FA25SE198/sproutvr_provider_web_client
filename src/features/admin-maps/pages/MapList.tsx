'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import configs from '@/core/configs';
import useGetSubjects from '@/features/catalog/hooks/useGetSubjects';

import UploadMapDialog from '../components/UploadMapDialog';
import useGetMaps from '../hooks/useGetMaps';

import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Loader2,
  Map as MapIcon,
  Plus,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MapListPage() {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const { data: subjectsData } = useGetSubjects();
  const subjects = subjectsData?.data || [];

  const subjectIds = filterSubject && filterSubject !== 'all' ? [filterSubject] : undefined;

  const { data, isLoading, isError, refetch, isRefetching } = useGetMaps({
    pageIndex,
    pageSize,
    Name: searchName || undefined,
    Description: searchDescription || undefined,
    SubjectIds: subjectIds,
    Status: filterStatus || undefined,
    MinPrice: minPrice ? Number(minPrice) : undefined,
    MaxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  const maps = data?.data || [];
  const totalPages = data?.pageSize ? Math.ceil(data.count / data.pageSize) : 0;

  const hasActiveFilters = searchName || searchDescription || filterSubject || filterStatus || minPrice || maxPrice;

  const handleClearFilters = () => {
    setSearchName('');
    setSearchDescription('');
    setFilterSubject('');
    setFilterStatus('');
    setMinPrice('');
    setMaxPrice('');
    setPageIndex(1);
  };

  const handleViewDetails = (mapId: string) => {
    navigate(configs.routes.adminMapDetails.replace(':id', mapId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      Active: { label: 'Hoạt động', className: 'bg-green-100 text-green-800' },
      Inactive: { label: 'Không hoạt động', className: 'bg-gray-100 text-gray-800' },
      Pending: { label: 'Chờ duyệt', className: 'bg-yellow-100 text-yellow-800' },
    };

    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.className}`}>{statusInfo.label}</span>;
  };

  if (isError) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-red-500'>Có lỗi xảy ra khi tải danh sách map</p>
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
              <MapIcon className='w-8 h-8 text-primary' />
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Quản lý Map</h1>
                <p className='text-sm text-muted-foreground mt-1'>Tổng số: {data?.count || 0} map</p>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button onClick={() => setShowUploadDialog(true)} className='gap-2'>
                <Plus className='w-4 h-4' />
                Tải lên Map mới
              </Button>
              <Button variant='outline' size='sm' onClick={() => setShowFilters(!showFilters)} className='gap-2'>
                <Filter className='w-4 h-4' />
                Bộ lọc
                {hasActiveFilters && <span className='w-2 h-2 bg-primary rounded-full' />}
              </Button>
              <Button variant='outline' size='sm' onClick={() => refetch()} className='gap-2' disabled={isRefetching}>
                <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <Card className='mb-6'>
                <CardContent className='pt-6'>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='searchName'>Tên Map</Label>
                      <div className='relative mt-1.5'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                        <Input
                          id='searchName'
                          placeholder='Tìm theo tên...'
                          value={searchName}
                          onChange={(e) => {
                            setSearchName(e.target.value);
                            setPageIndex(1);
                          }}
                          className='pl-10'
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor='searchDescription'>Mô tả</Label>
                      <div className='relative mt-1.5'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                        <Input
                          id='searchDescription'
                          placeholder='Tìm theo mô tả...'
                          value={searchDescription}
                          onChange={(e) => {
                            setSearchDescription(e.target.value);
                            setPageIndex(1);
                          }}
                          className='pl-10'
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor='filterSubject'>Môn học</Label>
                      <Select
                        value={filterSubject}
                        onValueChange={(value) => {
                          setFilterSubject(value);
                          setPageIndex(1);
                        }}
                      >
                        <SelectTrigger id='filterSubject' className='mt-1.5'>
                          <SelectValue placeholder='Tất cả môn học' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>Tất cả môn học</SelectItem>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor='filterStatus'>Trạng thái</Label>
                      <Select
                        value={filterStatus}
                        onValueChange={(value) => {
                          setFilterStatus(value);
                          setPageIndex(1);
                        }}
                      >
                        <SelectTrigger id='filterStatus' className='mt-1.5'>
                          <SelectValue placeholder='Tất cả trạng thái' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                          <SelectItem value='Active'>Hoạt động</SelectItem>
                          <SelectItem value='Inactive'>Không hoạt động</SelectItem>
                          <SelectItem value='Pending'>Chờ duyệt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor='minPrice'>Giá từ (VNĐ)</Label>
                      <Input
                        id='minPrice'
                        type='number'
                        placeholder='Từ...'
                        value={minPrice}
                        onChange={(e) => {
                          setMinPrice(e.target.value);
                          setPageIndex(1);
                        }}
                        className='mt-1.5'
                        min='0'
                      />
                    </div>

                    <div>
                      <Label htmlFor='maxPrice'>Giá đến (VNĐ)</Label>
                      <Input
                        id='maxPrice'
                        type='number'
                        placeholder='Đến...'
                        value={maxPrice}
                        onChange={(e) => {
                          setMaxPrice(e.target.value);
                          setPageIndex(1);
                        }}
                        className='mt-1.5'
                        min='0'
                      />
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <Button variant='outline' size='sm' onClick={handleClearFilters} className='mt-4 gap-2'>
                      <X className='w-4 h-4' />
                      Xóa bộ lọc
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Maps List */}
          {isLoading ? (
            <div className='flex justify-center items-center h-64'>
              <Loader2 className='w-8 h-8 animate-spin text-primary' />
            </div>
          ) : maps.length === 0 ? (
            <Card>
              <CardContent className='pt-6'>
                <p className='text-center text-muted-foreground'>Không tìm thấy map nào</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className='grid gap-4 mb-6'>
                {maps.map((map) => (
                  <motion.div
                    key={map.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className='hover:shadow-lg transition-shadow'>
                      <CardHeader>
                        <div className='flex items-start justify-between'>
                          <div className='flex-1'>
                            <CardTitle className='text-xl mb-2'>{map.name}</CardTitle>
                            <div className='flex flex-wrap gap-2 text-sm text-muted-foreground'>
                              <span className='flex items-center gap-1'>
                                <strong>Mã:</strong> {map.mapCode}
                              </span>
                              <span>•</span>
                              <span className='flex items-center gap-1'>
                                <strong>Môn học:</strong> {map.subject.name}
                              </span>
                              <span>•</span>
                              <span className='flex items-center gap-1'>
                                <strong>Giá:</strong> {formatCurrency(map.price)}
                              </span>
                            </div>
                          </div>
                          <div className='flex items-center gap-2'>
                            {getStatusBadge(map.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className='flex items-center justify-between'>
                          <p className='text-sm text-muted-foreground line-clamp-2 flex-1'>{map.description}</p>
                          <Button variant='outline' size='sm' onClick={() => handleViewDetails(map.id)} className='ml-4 gap-2'>
                            <Eye className='w-4 h-4' />
                            Xem chi tiết
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-muted-foreground'>
                    Trang {pageIndex} / {totalPages}
                  </p>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setPageIndex((prev) => Math.max(1, prev - 1))}
                      disabled={pageIndex === 1}
                    >
                      <ChevronLeft className='w-4 h-4' />
                      Trước
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
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
        </motion.div>
      </div>

      {/* Upload Dialog */}
      <UploadMapDialog open={showUploadDialog} onOpenChange={setShowUploadDialog} />
    </div>
  );
}

