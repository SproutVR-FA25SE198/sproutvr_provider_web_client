import { Badge } from '@/common/components/ui/badge';
import { cn } from '@/common/utils';

const STATUS_STYLES: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm',
  Inactive: 'bg-slate-200 text-slate-700 border border-slate-300',
  Pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  Suspended: 'bg-rose-100 text-rose-700 border border-rose-200',
};

const STATUS_LABELS: Record<string, string> = {
  Active: 'Hoạt động',
  Inactive: 'Ngưng hoạt động',
  Pending: 'Chờ kích hoạt',
  Suspended: 'Tạm khóa',
};

interface OrganizationStatusBadgeProps {
  status: string;
  className?: string;
}

export default function OrganizationStatusBadge({ status, className }: OrganizationStatusBadgeProps) {
  const normalizedStatus = status || 'Inactive';
  const label = STATUS_LABELS[normalizedStatus] ?? normalizedStatus;
  const style = STATUS_STYLES[normalizedStatus] ?? STATUS_STYLES.Inactive;

  return (
    <Badge variant='outline' className={cn('px-2.5 py-1 text-xs font-semibold', style, className)}>
      {label}
    </Badge>
  );
}


