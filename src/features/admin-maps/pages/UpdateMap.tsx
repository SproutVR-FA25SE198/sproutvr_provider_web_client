'use client';

import Loading from '@/common/components/loading';
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
import { Textarea } from '@/common/components/ui/textarea';
import configs from '@/core/configs';

import useGetMapById from '../hooks/useGetMapById';
import useUpdateMap from '../hooks/useUpdateMap';

import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGetSubjects from '@/features/catalog/hooks/useGetSubjects';

export default function UpdateMapPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMapById(id || '');
  const map = data;

  const { data: subjectsData, isLoading: isLoadingSubjects } = useGetSubjects();
  const subjects = subjectsData?.data || [];

  const { mutate: updateMap, isPending } = useUpdateMap();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    mapCode: '',
    status: '',
    subjectId: ''
  });

  // Populate form when map data loads
  useEffect(() => {
    if (map) {
      setFormData({
        name: map.name || '',
        description: map.description || '',
        price: map.price?.toString() || '',
        imageUrl: map.imageUrl || '',
        mapCode: map.mapCode || '',
        status: map.status || 'Active',
        subjectId: map.subject.id || ''
      });
    }
  }, [map]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error('Map ID không hợp lệ');
      return;
    }

    const updateData: any = {};

    if (formData.name) updateData.name = formData.name;
    if (formData.description) updateData.description = formData.description;
    if (formData.price) updateData.price = Number(formData.price);
    if (formData.imageUrl) updateData.imageUrl = formData.imageUrl;
    if (formData.mapCode) updateData.mapCode = formData.mapCode;
    if (formData.status) updateData.status = formData.status;
    if (formData.subjectId) updateData.subjectId = formData.subjectId;
    updateMap(
      {
        mapId: id,
        data: updateData,
      },
      {
        onSuccess: () => {
          toast.success('Cập nhật map thành công!');
          navigate(configs.routes.adminMapDetails.replace(':id', id));
        },
        onError: (error: any) => {
          console.error('Update map error:', error);
          const status = error?.response?.status;
          const message = error?.response?.data?.message || error?.message;

          if (status === 403) {
            toast.error('Không có quyền cập nhật map.');
          } else if (status === 401) {
            toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          } else if (status === 400) {
            toast.error(message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
          } else {
            toast.error(message || 'Có lỗi xảy ra khi cập nhật map. Vui lòng thử lại.');
          }
        },
      }
    );
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
        <div className='mb-6'>
          <Button variant='ghost' onClick={() => navigate(configs.routes.adminMapDetails.replace(':id', id || ''))} className='mb-4 gap-2'>
            <ArrowLeft className='w-4 h-4' />
            Quay lại chi tiết
          </Button>

          <h1 className='text-3xl font-bold text-foreground mb-2'>Cập nhật Map</h1>
          <p className='text-muted-foreground'>Chỉnh sửa thông tin map: {map.name}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid lg:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>
                      Tên Map <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder='Nhập tên map'
                      required
                      disabled={isPending}
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='mapCode'>Mã Map</Label>
                    <Input
                      id='mapCode'
                      value={formData.mapCode}
                      onChange={(e) => handleChange('mapCode', e.target.value)}
                      placeholder='Nhập mã map'
                      disabled={isPending}
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='description'>Mô tả</Label>
                    <Textarea
                      id='description'
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder='Nhập mô tả map'
                      rows={5}
                      disabled={isPending}
                    />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='price'>
                      Giá (VNĐ) <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      id='price'
                      type='number'
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      placeholder='Nhập giá map'
                      min='0'
                      step='1000'
                      required
                      disabled={isPending}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Cấu hình</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='imageUrl'>URL Hình ảnh</Label>
                    <Input
                      id='imageUrl'
                      type='url'
                      value={formData.imageUrl}
                      onChange={(e) => handleChange('imageUrl', e.target.value)}
                      placeholder='https://example.com/image.jpg'
                      disabled={isPending}
                    />
                    {formData.imageUrl && (
                      <div className='mt-2'>
                        <img
                          src={formData.imageUrl}
                          alt='Preview'
                          className='w-full h-48 object-cover rounded-lg border'
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='status'>
                      Trạng thái <span className='text-red-500'>*</span>
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange('status', value)} disabled={isPending}>
                      <SelectTrigger id='status'>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Active'>Hoạt động</SelectItem>
                        <SelectItem value='Inactive'>Không hoạt động</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Select */}
              <div className='grid gap-2'>
                <Label htmlFor='subjectId'>
                  Môn học <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={formData.subjectId}
                  onValueChange={(value) => handleChange('subjectId', value)}
                  disabled={isPending || isLoadingSubjects}
                  required
                >
                  <SelectTrigger id='subjectId'>
                    <SelectValue placeholder='Chọn môn học' />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* End Subject Select */}
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-6 flex justify-end gap-4'>
            <Button type='button' variant='outline' onClick={() => navigate(configs.routes.adminMapDetails.replace(':id', id || ''))} disabled={isPending}>
              Hủy
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Save className='mr-2 h-4 w-4' />
                  Lưu thay đổi
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

