'use client';

import { Button } from '@/common/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Subject } from '@/common/types';
import useGetSubjects from '@/features/catalog/hooks/useGetSubjects';

import useUploadMap from '../hooks/useUploadMap';

import { Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface UploadMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UploadMapDialog({ open, onOpenChange }: UploadMapDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const { data: subjectsData, isLoading: isLoadingSubjects } = useGetSubjects();
  const subjects = subjectsData?.data || [];

  const { mutate: uploadMap, isPending } = useUploadMap();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is a zip file
      if (!file.name.endsWith('.zip')) {
        toast.error('Vui lòng chọn file .zip');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Vui lòng chọn file map');
      return;
    }

    if (!subjectId) {
      toast.error('Vui lòng chọn môn học');
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error('Vui lòng nhập giá hợp lệ');
      return;
    }

    uploadMap(
      {
        MapDataFile: selectedFile,
        SubjectId: subjectId,
        Price: Number(price),
      },
      {
        onSuccess: () => {
          toast.success('Tải lên map thành công!');
          onOpenChange(false);
          // Reset form
          setSelectedFile(null);
          setSubjectId('');
          setPrice('');
        },
        onError: (error: any) => {
          console.error('Upload map error:', error);
          const status = error?.response?.status;
          const message = error?.response?.data?.message || error?.message;
          
          if (status === 403) {
            toast.error('Không có quyền upload map. Vui lòng đăng nhập lại với tài khoản System Admin.');
          } else if (status === 401) {
            toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          } else if (status === 413) {
            toast.error('File quá lớn. Vui lòng chọn file nhỏ hơn.');
          } else if (status === 400) {
            toast.error(message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
          } else {
            toast.error(message || 'Có lỗi xảy ra khi tải lên map. Vui lòng thử lại.');
          }
        },
      }
    );
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setSubjectId('');
    setPrice('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Upload className='w-5 h-5 text-primary' />
            Tải lên Map mới
          </DialogTitle>
          <DialogDescription>
            Upload file .zip chứa dữ liệu map và điền thông tin cần thiết
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            {/* File Upload */}
            <div className='grid gap-2'>
              <Label htmlFor='mapFile'>
                File Map (.zip) <span className='text-red-500'>*</span>
              </Label>
              <div className='flex items-center gap-2'>
                <Input
                  id='mapFile'
                  type='file'
                  accept='.zip'
                  onChange={handleFileChange}
                  disabled={isPending}
                  className='cursor-pointer'
                />
              </div>
              {selectedFile && (
                <p className='text-sm text-muted-foreground'>
                  Đã chọn: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Subject Selection */}
            <div className='grid gap-2'>
              <Label htmlFor='subject'>
                Môn học <span className='text-red-500'>*</span>
              </Label>
              <Select value={subjectId} onValueChange={setSubjectId} disabled={isPending || isLoadingSubjects}>
                <SelectTrigger id='subject'>
                  <SelectValue placeholder='Chọn môn học' />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingSubjects ? (
                    <SelectItem value='loading' disabled>
                      Đang tải...
                    </SelectItem>
                  ) : (
                    subjects.map((subject: Subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Price Input */}
            <div className='grid gap-2'>
              <Label htmlFor='price'>
                Giá (VNĐ) <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='price'
                type='number'
                placeholder='Nhập giá map'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isPending}
                min='0'
                step='1000'
              />
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleCancel} disabled={isPending}>
              Hủy
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Đang tải lên...
                </>
              ) : (
                <>
                  <Upload className='mr-2 h-4 w-4' />
                  Tải lên
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

