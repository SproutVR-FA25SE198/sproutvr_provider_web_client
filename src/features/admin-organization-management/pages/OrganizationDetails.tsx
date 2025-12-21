'use client';

import { Button } from '@/common/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import configs from '@/core/configs';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import useGetOrganizationById from '@/features/admin-order-management/hooks/useGetOrganizationById';
import OrganizationStatusBadge from '../components/organization-status-badge';

export default function OrganizationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: organization, isLoading, isError } = useGetOrganizationById(id || '');

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getGoogleDriveFolderUrl = (folderId: string | null) => {
    if (!folderId) return null;
    return `https://drive.google.com/drive/folders/${folderId}`;
  };

  if (isLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-center py-12'>
          <Loader2 className='w-8 h-8 animate-spin text-primary' />
          <span className='ml-2 text-muted-foreground'>Đang tải thông tin tổ chức...</span>
        </div>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardContent className='pt-6'>
            <div className='flex flex-col items-center justify-center py-12'>
              <AlertCircle className='w-16 h-16 text-destructive mb-4' />
              <p className='text-center text-destructive text-lg font-semibold mb-2'>
                Không tìm thấy tổ chức
              </p>
              <p className='text-center text-muted-foreground mb-4'>
                Tổ chức bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <Button onClick={() => navigate(configs.routes.adminOrganizationManagement)}>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Quay lại danh sách
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className='mb-8 flex items-center justify-between'>
            <Button 
              variant='ghost' 
              onClick={() => navigate(configs.routes.adminOrganizationManagement)} 
              className='gap-2 hover:bg-muted/50 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              Quay lại
            </Button>
          </div>

          {/* Organization Info Card */}
          <Card className='mb-6 border-2 shadow-xl overflow-hidden'>
            <CardHeader className='bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pb-6'>
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-6'>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 p-5 text-primary shadow-lg ring-2 ring-primary/20'
                  >
                    <Building2 className='h-10 w-10' />
                  </motion.div>
                  <div>
                    <CardTitle className='text-4xl font-bold text-foreground mb-3 tracking-tight'>
                      {organization.name}
                    </CardTitle>
                    <div className='flex items-center gap-3'>
                      <OrganizationStatusBadge status={organization.status} />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className='pt-8'>
              <div className='grid gap-6 md:grid-cols-2'>
                {/* Left Column */}
                <div className='space-y-5'>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <User className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                          Tên người dùng
                        </p>
                        <p className='text-base font-semibold text-foreground break-words'>
                          {organization.userName || '—'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <Mail className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                          Email
                        </p>
                        <p className='text-base font-semibold text-foreground break-words'>{organization.email || '—'}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <Phone className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                          Số điện thoại
                        </p>
                        <p className='text-base font-semibold text-foreground break-words'>
                          {organization.phoneNumber || '—'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <MapPin className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                          Địa chỉ
                        </p>
                        <p className='text-base font-semibold text-foreground break-words'>{organization.address || '—'}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column */}
                <div className='space-y-5'>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <Shield className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                          MAC Address
                        </p>
                        <p className='text-base font-semibold text-foreground font-mono break-all'>
                          {organization.macAddress || '—'}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <ExternalLink className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3'>
                          Bundle Google Drive
                        </p>
                        {organization.bundleGoogleDriveId ? (
                          <Button
                            variant='outline'
                            size='sm'
                            className='gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all'
                            onClick={() => {
                              const url = getGoogleDriveFolderUrl(organization.bundleGoogleDriveId);
                              if (url) {
                                window.open(url, '_blank', 'noopener,noreferrer');
                              }
                            }}
                          >
                            <ExternalLink className='h-4 w-4' />
                            Mở folder trên Google Drive
                          </Button>
                        ) : (
                          <p className='text-base font-semibold text-muted-foreground'>—</p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                        <Calendar className='h-5 w-5' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                          Ngày tạo
                        </p>
                        <p className='text-base font-semibold text-foreground'>
                          {formatDate(organization.createdAtUtc)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {organization.updatedAtUtc && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className='group rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/30 p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300'
                    >
                      <div className='flex items-start gap-4'>
                        <div className='rounded-lg bg-primary/10 p-2.5 text-primary group-hover:bg-primary/20 transition-colors'>
                          <Calendar className='h-5 w-5' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5'>
                            Ngày cập nhật
                          </p>
                          <p className='text-base font-semibold text-foreground'>
                            {formatDate(organization.updatedAtUtc)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

