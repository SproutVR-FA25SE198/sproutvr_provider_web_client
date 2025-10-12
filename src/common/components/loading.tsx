'use client';

import { cn } from '@/common/utils'; // if you have a cn() util

import { Spinner } from './ui/spinner';

interface LoadingProps {
  isLoading: boolean;
  className?: string;
}

export default function Loading({ isLoading, className }: LoadingProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-background/50 transition-all',
        className,
      )}
    >
      <div className='flex flex-col items-center gap-3'>
        <Spinner className='w-8 h-8 animate-spin text-secondary' />
        <span className='text-sm text-muted-foreground'>Bạn chờ xíu nha...</span>
      </div>
    </div>
  );
}
