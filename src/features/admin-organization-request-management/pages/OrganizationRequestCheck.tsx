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
import { Label } from '@/common/components/ui/label';
import { Textarea } from '@/common/components/ui/textarea';
import configs from '@/core/configs';

import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, ShieldCheck, ShieldX } from 'lucide-react';
import { JSX, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ApprovalStatusBadge from '../components/approval-status-badge';
import useCheckOrganizationRequest from '../hooks/useCheckOrganizationRequest';
import useGetOrganizationRequestById from '../hooks/useGetOrganizationRequestById';
import type { ApprovalStatus } from '../types/organization-request.type';

const APPROVAL_STATUS_LABELS: Record<ApprovalStatus, string> = {
  Approved: 'Đã duyệt',
  Rejected: 'Đã từ chối',
  Unverified: 'Chưa xác minh',
  Approval_Pending: 'Chờ duyệt',
};

export default function OrganizationRequestCheckPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<ApprovalStatus>('Approved');
  const [rejectReason, setRejectReason] = useState('');

  const { data, isLoading, isError } = useGetOrganizationRequestById(id);
  const { mutateAsync, isPending } = useCheckOrganizationRequest();

  const isActionDisabled = useMemo(() => {
    if (!id || !data) return true;
    return isPending || data.approvalStatus !== 'Approval_Pending';
  }, [data, id, isPending]);

  const DetailItem = ({ label, value }: { label: string; value?: string | null }) => (
    <div className='rounded-xl border border-border/70 bg-muted/40 p-4 shadow-sm transition-colors hover:border-primary/40'>
      <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>{label}</p>
      <p className='mt-2 text-sm font-semibold text-foreground break-words'>{value || '—'}</p>
    </div>
  );

  useEffect(() => {
    if (!id) {
      toast.error('Không tìm thấy mã yêu cầu.');
      navigate(configs.routes.adminOrganizationRequests);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!data) return;
    if (data.approvalStatus !== 'Approval_Pending') {
      toast.info('Yêu cầu này đã được xử lý.');
      navigate(configs.routes.adminOrganizationRequests);
      return;
    }
    setSelectedStatus('Approved');
  }, [data, navigate]);

  useEffect(() => {
    if (selectedStatus !== 'Rejected') {
      setRejectReason('');
    }
  }, [selectedStatus]);

  const handleBack = () => {
    navigate(configs.routes.adminOrganizationRequests);
  };

  const handleSubmit = async () => {
    if (!id || isActionDisabled) return;
    if (selectedStatus === 'Rejected' && !rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối.');
      return;
    }

    try {
      await mutateAsync({
        OrganizationRegisterRequestId: id,
        ApprovalStatus: selectedStatus,
        RejectReason: selectedStatus === 'Rejected' ? rejectReason.trim() : null,
      });
      toast.success('Cập nhật trạng thái thành công.');
      navigate(configs.routes.adminOrganizationRequests);
    } catch (error) {
      toast.error('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
    }
  };

  let requestInfo: JSX.Element;
  if (isError) {
    requestInfo = (
      <div className='flex items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive'>
        Không thể tải thông tin yêu cầu. Vui lòng thử lại sau.
      </div>
    );
  } else if (isLoading || !data) {
    requestInfo = (
      <div className='flex items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground'>
        <Loader2 className='h-5 w-5 animate-spin text-primary' />
        Đang tải thông tin yêu cầu...
      </div>
    );
  } else {
    requestInfo = (
      <div className='space-y-6'>
        <div className='flex flex-wrap items-start justify-between gap-4 rounded-xl bg-secondary/10 p-4'>
          <div>
            <p className='text-xs uppercase tracking-wide text-muted-foreground'>Tên tổ chức</p>
            <p className='mt-2 text-xl font-semibold text-foreground'>{data.organizationName}</p>
            <p className='mt-1 text-sm text-muted-foreground'>Mã yêu cầu: {data.id}</p>
          </div>
          <ApprovalStatusBadge status={data.approvalStatus} />
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <DetailItem label='Email liên hệ' value={data.contactEmail} />
          <DetailItem label='Số điện thoại' value={data.contactPhone} />
          <DetailItem label='Địa chỉ' value={data.address} />
          <DetailItem label='Trạng thái hiện tại' value={APPROVAL_STATUS_LABELS[data.approvalStatus]} />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-muted/50'>
      <div className='container mx-auto px-4 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <Button variant='outline' size='icon' onClick={handleBack} className='border-border text-primary'>
                <ArrowLeft className='h-5 w-5' />
              </Button>
              <div>
                <h1 className='text-3xl font-bold text-foreground'>Kiểm duyệt yêu cầu đăng ký tổ chức</h1>
                <p className='mt-1 text-sm text-muted-foreground'>
                  Đảm bảo rằng thông tin tổ chức phù hợp với chính sách trước khi phê duyệt.
                </p>
              </div>
            </div>
          </div>

          <div className='grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
            <Card className='border-border/60 shadow-lg'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-xl font-semibold text-foreground'>Thông tin yêu cầu</CardTitle>
                <CardDescription>
                  Thông tin này được cung cấp bởi tổ chức khi gửi yêu cầu đăng ký. Vui lòng rà soát kỹ.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>{requestInfo}</CardContent>
            </Card>

            <Card className='border-border/60 shadow-lg lg:sticky lg:top-24'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-foreground'>Quyết định kiểm duyệt</CardTitle>
                <CardDescription>
                  Chỉ khả dụng cho yêu cầu đang ở trạng thái <strong>Chờ duyệt</strong>.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <Label className='text-sm font-medium text-muted-foreground'>Chọn kết quả kiểm duyệt</Label>
                  <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    <Button
                      type='button'
                      onClick={() => setSelectedStatus('Approved')}
                      disabled={isActionDisabled}
                      variant={selectedStatus === 'Approved' ? 'default' : 'outline'}
                      className={`h-auto justify-start gap-3 rounded-xl border ${selectedStatus === 'Approved'
                        ? 'border-primary/70 shadow-md'
                        : 'border-border hover:border-primary/40'
                        } py-4`}
                    >
                      <ShieldCheck className='h-5 w-5' />
                      <span className='text-left'>
                        <span className='block text-sm font-semibold'>Đồng ý</span>

                      </span>
                    </Button>

                    <Button
                      type='button'
                      onClick={() => setSelectedStatus('Rejected')}
                      disabled={isActionDisabled}
                      variant={selectedStatus === 'Rejected' ? 'destructive' : 'outline'}
                      className={`h-auto justify-start gap-3 rounded-xl border ${selectedStatus === 'Rejected'
                        ? 'border-destructive/70 shadow-md'
                        : 'border-border hover:border-destructive/40'
                        } py-4`}
                    >
                      <ShieldX className='h-5 w-5' />
                      <span className='text-left'>
                        <span className='block text-sm font-semibold'>Từ chối</span>

                      </span>
                    </Button>
                  </div>
                </div>

                {selectedStatus === 'Rejected' && (
                  <div className='space-y-2'>
                    <Label className='text-sm font-semibold text-foreground'>Lý do từ chối *</Label>
                    <Textarea
                      value={rejectReason}
                      onChange={(event) => setRejectReason(event.target.value)}
                      placeholder='Ví dụ: Chúng tôi chỉ phục vụ khách hàng trường học...'
                      className='min-h-[140px] resize-none bg-background/60'
                    />
                    <p className='text-xs text-muted-foreground'>
                      Lý do sẽ được gửi tới người liên hệ của tổ chức để họ cập nhật lại thông tin.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className='flex-col items-stretch gap-3'>
                <Button
                  onClick={handleSubmit}
                  disabled={isActionDisabled}
                  className='w-full gap-2 rounded-xl py-5 text-base font-semibold'
                >
                  {isPending && <Loader2 className='h-5 w-5 animate-spin' />}
                  Xác nhận quyết định
                </Button>

                {!data && (
                  <p className='text-xs text-muted-foreground'>
                    Hãy đợi hệ thống tải xong thông tin yêu cầu trước khi đưa ra quyết định.
                  </p>
                )}

                {data && data.approvalStatus !== 'Approval_Pending' && (
                  <p className='text-xs text-muted-foreground'>
                    Yêu cầu hiện đã được xử lý. Chỉ những yêu cầu đang chờ duyệt mới có thể kiểm duyệt.
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

