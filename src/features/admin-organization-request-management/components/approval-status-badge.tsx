import { Badge } from '@/common/components/ui/badge';
import { cn } from '@/common/utils';

import type { ApprovalStatus } from '../types/organization-request.type';

const STATUS_LABELS: Record<ApprovalStatus, string> = {
  Unverified: 'Chưa xác minh',
  Approval_Pending: 'Chờ duyệt',
  Approved: 'Đã duyệt',
  Rejected: 'Từ chối',
};

const STATUS_STYLES: Record<ApprovalStatus, string> = {
  Approved: 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm',
  Approval_Pending: 'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm',
  Unverified: 'bg-slate-100 text-slate-700 border border-slate-200',
  Rejected: 'bg-rose-100 text-rose-700 border border-rose-200 shadow-sm',
};

interface ApprovalStatusBadgeProps {
  status: ApprovalStatus;
  className?: string;
}

export default function ApprovalStatusBadge({ status, className }: ApprovalStatusBadgeProps) {
  const label = STATUS_LABELS[status] ?? status;
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Unverified;

  return (
    <Badge variant='outline' className={cn('px-2.5 py-1 text-xs font-semibold', style, className)}>
      {label}
    </Badge>
  );
}

