'use client';

import Loading from '@/common/components/loading';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import configs from '@/core/configs';

import useGetMapById from '../hooks/useGetMapById';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, DollarSign, Edit, FileText, Map as MapIcon, Package, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MapDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMapById(id || '');
  const map = data;

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
    const statusMap: Record<string, { label: string; className: string }> = {
      Active: { label: 'Hoạt động', className: 'bg-green-100 text-green-800' },
      Inactive: { label: 'Không hoạt động', className: 'bg-gray-100 text-gray-800' },
      Pending: { label: 'Chờ duyệt', className: 'bg-yellow-100 text-yellow-800' },
    };

    const statusInfo = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };

    return <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${statusInfo.className}`}>{statusInfo.label}</span>;
  };

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (isError || !map) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='pt-6'>
            <p className='text-center text-red-500'>Không tìm thấy thông tin map hoặc có lỗi xảy ra</p>
            <div className='flex justify-center mt-4'>
              <Button onClick={() => navigate(configs.routes.adminMaps)}>Quay lại danh sách</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className='mb-6'>
            <Button variant='ghost' onClick={() => navigate(configs.routes.adminMaps)} className='mb-4 gap-2'>
              <ArrowLeft className='w-4 h-4' />
              Quay lại danh sách
            </Button>

            <div className='flex items-start justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-foreground mb-2'>{map.name}</h1>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='font-mono'>
                    {map.mapCode}
                  </Badge>
                  {getStatusBadge(map.status)}
                </div>
              </div>
              <Button
                onClick={() => navigate(configs.routes.adminMapUpdate.replace(':id', map.id))}
                className='gap-2'
              >
                <Edit className='w-4 h-4' />
                Chỉnh sửa
              </Button>
            </div>
          </div>

          <div className='grid lg:grid-cols-3 gap-6'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Image */}
              {map.imageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <MapIcon className='w-5 h-5' />
                      Hình ảnh Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={map.imageUrl}
                      alt={map.name}
                      className='w-full h-auto rounded-lg object-cover'
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/800x400?text=No+Image';
                      }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <FileText className='w-5 h-5' />
                    Mô tả
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-muted-foreground whitespace-pre-wrap'>{map.description || 'Chưa có mô tả'}</p>
                </CardContent>
              </Card>

              {/* Map Objects */}
              {map.mapObjects && map.mapObjects.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Package className='w-5 h-5' />
                      Vật thể trong Map ({map.mapObjects.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      {map.mapObjects.map((obj, index) => (
                        <div key={obj.id || index} className='border rounded-lg p-4 hover:shadow-md transition-shadow'>
                          <div className='flex items-start gap-3'>
                            {obj.imageUrl && (
                              <img
                                src={obj.imageUrl}
                                alt={obj.name}
                                className='w-16 h-16 object-cover rounded'
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/64?text=No+Image';
                                }}
                              />
                            )}
                            <div className='flex-1'>
                              <h4 className='font-semibold text-sm mb-1'>{obj.name}</h4>
                              <p className='text-xs text-muted-foreground mb-2'>{obj.objectCode}</p>
                              {obj.description && (
                                <p className='text-xs text-muted-foreground line-clamp-2'>{obj.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Task Locations */}
              {map.taskLocations && map.taskLocations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <MapIcon className='w-5 h-5' />
                      Địa điểm nhiệm vụ ({map.taskLocations.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      {map.taskLocations.map((location, index) => (
                        <div key={location.id || index} className='border rounded-lg p-4'>
                          <div className='flex items-start gap-3'>
                            {location.imageUrl && (
                              <img
                                src={location.imageUrl}
                                alt={location.name}
                                className='w-20 h-20 object-cover rounded'
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image';
                                }}
                              />
                            )}
                            <div className='flex-1'>
                              <h4 className='font-semibold mb-1'>{location.name}</h4>
                              <p className='text-xs text-muted-foreground mb-1'>Mã: {location.locationCode}</p>
                              {location.description && (
                                <p className='text-sm text-muted-foreground'>{location.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <DollarSign className='w-5 h-5 text-muted-foreground mt-0.5' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Giá</p>
                      <p className='font-semibold'>{formatCurrency(map.price)}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Tag className='w-5 h-5 text-muted-foreground mt-0.5' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Môn học</p>
                      <p className='font-semibold'>{map.subject.name}</p>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <FileText className='w-5 h-5 text-muted-foreground mt-0.5' />
                    <div>
                      <p className='text-sm text-muted-foreground'>Chủ đề chính</p>
                      <p className='font-semibold'>{map.subject.masterSubject.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg flex items-center gap-2'>
                    <Calendar className='w-5 h-5' />
                    Thời gian
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Ngày tạo</p>
                    <p className='font-medium'>{formatDate(map.createdAt)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Cập nhật lần cuối</p>
                    <p className='font-medium'>{formatDate(map.updatedAt)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Thống kê</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-muted-foreground'>Số vật thể</span>
                    <span className='font-semibold'>{map.mapObjects?.length || 0}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-muted-foreground'>Số địa điểm</span>
                    <span className='font-semibold'>{map.taskLocations?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

