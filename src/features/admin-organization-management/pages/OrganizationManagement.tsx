'use client';

import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui/dialog';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Textarea } from '@/common/components/ui/textarea';
import { cn } from '@/common/utils';
import configs from '@/core/configs';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  Building2,
  Edit3,
  Loader2,
  PlusCircle,
  Power,
  RefreshCw,
  Search,
  ShieldAlert,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import OrganizationStatusBadge from '../components/organization-status-badge';
import {
  CreateOrganizationFormData,
  UpdateOrganizationFormData,
  createOrganizationSchema,
  updateOrganizationSchema,
} from '../data/organization-schema';
import useCreateOrganization from '../hooks/useCreateOrganization';
import useDeactivateOrganization from '../hooks/useDeactivateOrganization';
import useGetOrganizations from '../hooks/useGetOrganizations';
import useUpdateOrganization from '../hooks/useUpdateOrganization';
import type { Organization } from '../types/organization.type';

const INITIAL_UPDATE_VALUES: UpdateOrganizationFormData = {
  name: '',
  address: '',
  email: '',
  phoneNumber: '',
  macAddress: '',
  bundleGoogleDriveId: '',
};

export default function OrganizationManagementPage() {
  const { data: organizations, isLoading, isError, refetch } = useGetOrganizations();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState<Organization | null>(null);
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    mutateAsync: createOrganization,
    isPending: isCreating,
  } = useCreateOrganization();
  const {
    mutateAsync: updateOrganization,
    isPending: isUpdating,
  } = useUpdateOrganization({
    onSuccess: () => {
      setIsEditOpen(false);
    },
  });
  const {
    mutateAsync: deactivateOrganization,
    isPending: isDeactivating,
  } = useDeactivateOrganization();

  const createForm = useForm<CreateOrganizationFormData>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    },
  });

  const updateForm = useForm<UpdateOrganizationFormData>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: INITIAL_UPDATE_VALUES,
  });

  useEffect(() => {
    if (editingOrganization) {
      updateForm.reset({
        name: editingOrganization.name,
        address: editingOrganization.address,
        phoneNumber: editingOrganization.phoneNumber ?? '',
        email: editingOrganization.email ?? '',
        macAddress: editingOrganization.macAddress ?? '',
        bundleGoogleDriveId: editingOrganization.bundleGoogleDriveId ?? '',
      });
    } else {
      updateForm.reset(INITIAL_UPDATE_VALUES);
    }
  }, [editingOrganization, updateForm]);

  const filteredOrganizations = useMemo(() => {
    if (!searchTerm.trim()) {
      return organizations;
    }

    const term = searchTerm.toLowerCase();

    return organizations.filter((org) => {
      return (
        org.name.toLowerCase().includes(term) ||
        (org.email ?? '').toLowerCase().includes(term) ||
        (org.phoneNumber ?? '').toLowerCase().includes(term)
      );
    });
  }, [organizations, searchTerm]);

  const handleOpenCreate = () => {
    createForm.reset();
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (organization: Organization) => {
    setEditingOrganization(organization);
    setIsEditOpen(true);
  };

  const handleOpenDeactivate = (organization: Organization) => {
    setDeactivateTarget(organization);
  };

  const handleCreateSubmit = createForm.handleSubmit(async (formData) => {
    try {
      await createOrganization({
        name: formData.name.trim(),
        address: formData.address.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
      });
      toast.success('Thêm tổ chức thành công.');
      setIsCreateOpen(false);
      createForm.reset();
    } catch (error) {
      toast.error('Không thể thêm tổ chức. Vui lòng thử lại.');
    }
  });

  const handleUpdateSubmit = updateForm.handleSubmit(async (formData) => {
    if (!editingOrganization) return;

    const payload = {
      name: formData.name?.trim() || undefined,
      address: formData.address?.trim() || undefined,
      phoneNumber: formData.phoneNumber?.trim() || undefined,
      email: formData.email?.trim() || undefined,
      macAddress: formData.macAddress?.trim() || undefined,
      bundleGoogleDriveId: formData.bundleGoogleDriveId?.trim() || undefined,
    };

    try {
      await updateOrganization({ id: editingOrganization.id, payload });
      toast.success('Cập nhật tổ chức thành công.');
      setEditingOrganization(null);
    } catch (error) {
      toast.error('Không thể cập nhật tổ chức. Vui lòng thử lại.');
    }
  });

  const handleDeactivate = async () => {
    if (!deactivateTarget) return;
    try {
      await deactivateOrganization(deactivateTarget.id);
      toast.success('Đã vô hiệu hóa tổ chức.');
      setDeactivateTarget(null);
    } catch (error) {
      toast.error('Không thể vô hiệu hóa tổ chức. Vui lòng thử lại.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/40'>
      <div className='container mx-auto px-4 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-primary/10 p-3 text-primary shadow-md'>
                <Building2 className='h-7 w-7' />
              </div>
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Quản lý tổ chức</h1>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Theo dõi, cập nhật và vô hiệu hóa các tổ chức trong hệ thống SproutVR.
                </p>
              </div>
            </div>
            <div className='flex flex-wrap items-center gap-2'>

              <Button onClick={handleOpenCreate} className='gap-2'>
                <PlusCircle className='h-4 w-4' />
                Thêm tổ chức
              </Button>
            </div>
          </div>

          <Card className='border-border/60 shadow-lg'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-xl font-semibold text-foreground'>Danh sách tổ chức</CardTitle>
              <CardDescription>Quản lý các tổ chức đã được phê duyệt trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div className='relative w-full sm:w-72'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    placeholder='Tìm theo tên, email hoặc SĐT...'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className='pl-9'
                  />
                </div>
                <p className='text-sm text-muted-foreground'>
                  Tổng số tổ chức: <span className='font-semibold text-foreground'>{organizations.length}</span>
                </p>
              </div>

              <div className='overflow-x-auto rounded-xl border border-border/60 shadow-sm'>
                <table className='min-w-full divide-y divide-border/60 text-sm'>
                  <thead className='bg-muted/50'>
                    <tr>
                      <th className='px-4 py-3 text-left font-semibold text-muted-foreground'>Tên tổ chức</th>
                      <th className='px-4 py-3 text-left font-semibold text-muted-foreground'>Email</th>
                      <th className='px-4 py-3 text-left font-semibold text-muted-foreground'>SĐT</th>
                      <th className='px-4 py-3 text-left font-semibold text-muted-foreground'>Trạng thái</th>
                      <th className='px-4 py-3 text-left font-semibold text-muted-foreground'>Ngày tạo</th>
                      <th className='px-4 py-3 text-left font-semibold text-muted-foreground'>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-border/60 bg-background/30'>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className='px-4 py-8 text-center text-muted-foreground'>
                          <div className='flex items-center justify-center gap-2'>
                            <Loader2 className='h-5 w-5 animate-spin text-primary' />
                            Đang tải dữ liệu tổ chức...
                          </div>
                        </td>
                      </tr>
                    ) : isError ? (
                      <tr>
                        <td colSpan={6} className='px-4 py-8 text-center text-destructive'>
                          Không thể tải danh sách tổ chức. Vui lòng thử lại.
                        </td>
                      </tr>
                    ) : filteredOrganizations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className='px-4 py-8 text-center text-muted-foreground'>
                          Không tìm thấy tổ chức phù hợp với từ khóa.
                        </td>
                      </tr>
                    ) : (
                      filteredOrganizations.map((organization) => (
                        <tr key={organization.id} className='hover:bg-muted/30'>
                          <td className='px-4 py-3'>
                            <div className='flex flex-col'>
                              <span className='font-semibold text-foreground'>{organization.name}</span>
                              <span className='text-xs text-muted-foreground'>{organization.address}</span>
                            </div>
                          </td>
                          <td className='px-4 py-3 text-sm'>{organization.email ?? '—'}</td>
                          <td className='px-4 py-3 text-sm'>{organization.phoneNumber ?? '—'}</td>
                          <td className='px-4 py-3'>
                            <OrganizationStatusBadge status={organization.status} />
                          </td>
                          <td className='px-4 py-3 text-sm'>
                            {new Date(organization.createdAtUtc).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })}
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex flex-wrap items-center gap-2'>
                              <Button
                                size='sm'
                                variant='outline'
                                className='gap-2'
                                onClick={() => handleOpenEdit(organization)}
                              >
                                <Edit3 className='h-4 w-4' />
                                Chỉnh sửa
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                className='gap-2 text-destructive border-destructive/40 hover:bg-destructive/10'
                                onClick={() => handleOpenDeactivate(organization)}
                              >
                                <Power className='h-4 w-4' />
                                Vô hiệu
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className='flex flex-wrap items-center justify-between gap-4'>
              <p className='text-xs text-muted-foreground'>
                Cần thêm tổ chức mới? Bạn cũng có thể chuyển hướng đến{' '}
                <Link to={configs.routes.adminOrganizationRequests} className='text-primary underline underline-offset-4'>
                  danh sách yêu cầu đăng ký
                </Link>{' '}
                để xét duyệt.
              </p>
              <Button variant='outline' size='sm' onClick={() => refetch()} className='gap-2'>
                <RefreshCw className='h-4 w-4' />
                Tải lại dữ liệu
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm tổ chức mới</DialogTitle>
            <DialogDescription>
              Cung cấp thông tin cơ bản của tổ chức. Tổ chức mới sẽ cần kích hoạt sau khi được thêm.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='create-name'>Tên tổ chức *</Label>
              <Input id='create-name' placeholder='VD: Trường THPT Chu Văn An' {...createForm.register('name')} />
              {createForm.formState.errors.name && (
                <p className='text-xs text-destructive'>{createForm.formState.errors.name.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='create-address'>Địa chỉ *</Label>
              <Textarea
                id='create-address'
                placeholder='VD: Số 10, đường ABC, quận XYZ, Hà Nội'
                className='min-h-[100px]'
                {...createForm.register('address')}
              />
              {createForm.formState.errors.address && (
                <p className='text-xs text-destructive'>{createForm.formState.errors.address.message}</p>
              )}
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='create-phone'>Số điện thoại *</Label>
                <Input id='create-phone' placeholder='VD: 0912345678' {...createForm.register('phoneNumber')} />
                {createForm.formState.errors.phoneNumber && (
                  <p className='text-xs text-destructive'>{createForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='create-email'>Email *</Label>
                <Input id='create-email' placeholder='contact@domain.com' {...createForm.register('email')} />
                {createForm.formState.errors.email && (
                  <p className='text-xs text-destructive'>{createForm.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <DialogFooter className='sm:justify-between'>
              <Button type='button' variant='outline' onClick={() => setIsCreateOpen(false)}>
                Hủy
              </Button>
              <Button type='submit' disabled={isCreating} className='gap-2'>
                {isCreating && <Loader2 className='h-4 w-4 animate-spin' />}
                Thêm tổ chức
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật thông tin tổ chức</DialogTitle>
            <DialogDescription>
              Điều chỉnh dữ liệu cho tổ chức{' '}
              <span className='font-semibold text-foreground'>{editingOrganization?.name ?? ''}</span>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateSubmit} className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='update-name'>Tên tổ chức</Label>
                <Input id='update-name' placeholder='Tên tổ chức' {...updateForm.register('name')} />
                {updateForm.formState.errors.name && (
                  <p className='text-xs text-destructive'>{updateForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='update-phone'>Số điện thoại</Label>
                <Input id='update-phone' placeholder='Số điện thoại' {...updateForm.register('phoneNumber')} />
                {updateForm.formState.errors.phoneNumber && (
                  <p className='text-xs text-destructive'>{updateForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='update-email'>Email</Label>
              <Input id='update-email' placeholder='Email' {...updateForm.register('email')} />
              {updateForm.formState.errors.email && (
                <p className='text-xs text-destructive'>{updateForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='update-address'>Địa chỉ</Label>
              <Textarea
                id='update-address'
                placeholder='Địa chỉ tổ chức'
                className='min-h-[100px]'
                {...updateForm.register('address')}
              />
              {updateForm.formState.errors.address && (
                <p className='text-xs text-destructive'>{updateForm.formState.errors.address.message}</p>
              )}
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='update-mac'>MAC Address</Label>
                <Input id='update-mac' placeholder='VD: AA:BB:CC:DD:EE:FF' {...updateForm.register('macAddress')} />
                {updateForm.formState.errors.macAddress && (
                  <p className='text-xs text-destructive'>{updateForm.formState.errors.macAddress.message}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='update-bundle'>Bundle Google Drive ID</Label>
                <Input
                  id='update-bundle'
                  placeholder='Nhập Bundle Google Drive ID'
                  {...updateForm.register('bundleGoogleDriveId')}
                />
                {updateForm.formState.errors.bundleGoogleDriveId && (
                  <p className='text-xs text-destructive'>
                    {updateForm.formState.errors.bundleGoogleDriveId.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className='sm:justify-between'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingOrganization(null);
                }}
              >
                Hủy
              </Button>
              <Button type='submit' disabled={isUpdating} className='gap-2'>
                {isUpdating && <Loader2 className='h-4 w-4 animate-spin' />}
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deactivateTarget)} onOpenChange={(open) => !open && setDeactivateTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vô hiệu hóa tổ chức</DialogTitle>
            <DialogDescription>
              Hành động này sẽ khóa quyền truy cập của tổ chức{' '}
              <span className='font-semibold text-foreground'>{deactivateTarget?.name ?? ''}</span> vào hệ thống.
            </DialogDescription>
          </DialogHeader>

          <div className='rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700'>
            <div className='flex gap-2'>
              <ShieldAlert className='h-5 w-5 flex-shrink-0' />
              <div>
                <p className='font-semibold'>Lưu ý quan trọng</p>
                <p>
                  Sau khi vô hiệu hóa, tổ chức sẽ không thể truy cập các tính năng quản trị. Bạn có thể kích hoạt lại
                  sau bằng việc cập nhật trạng thái từ hệ thống backend.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className='sm:justify-between'>
            <Button type='button' variant='outline' onClick={() => setDeactivateTarget(null)}>
              Hủy
            </Button>
            <Button
              type='button'
              variant='destructive'
              onClick={handleDeactivate}
              disabled={isDeactivating}
              className='gap-2'
            >
              {isDeactivating && <Loader2 className='h-4 w-4 animate-spin' />}
              Xác nhận vô hiệu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


