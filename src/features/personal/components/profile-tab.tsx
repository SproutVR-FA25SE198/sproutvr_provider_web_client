import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Organization } from '@/common/types/user.type';

import { motion } from 'framer-motion';
import { Eye, HelpCircle, Lock } from 'lucide-react';
import { useState } from 'react';

import { ChangePasswordModal } from './change-password-modal';

interface ProfileTabProps {
  organization: Organization;
}

const ProfileTab = ({ organization }: ProfileTabProps) => {
  const [copiedBundleUrl, setCopiedBundleUrl] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Create Google Drive folder URL from bundleGoogleDriveId
  const bundleUrl = organization.bundleGoogleDriveId
    ? `https://drive.google.com/drive/folders/${organization.bundleGoogleDriveId}`
    : null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBundleUrl(true);
    setTimeout(() => setCopiedBundleUrl(false), 2000);
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1 overflow-auto p-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='max-w-4xl space-y-6'
        >
          {/* Organization Name */}
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-primary'>{organization.name}</h1>
            <Button variant='outline' onClick={() => setShowChangePassword(true)} className='gap-2'>
              <Lock className='w-4 h-4' />
              Đổi mật khẩu
            </Button>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='contact-email' className='text-sm'>
                  Email liên hệ:
                </Label>
                <Input id='contact-email' type='email' readOnly value={organization.email} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='contact-phone' className='text-sm'>
                  Số điện thoại liên hệ:
                </Label>
                <Input id='contact-phone' readOnly value={organization.phoneNumber} />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='contact-address' className='text-sm'>
                Địa chỉ liên hệ:
              </Label>
              <Input id='contact-address' readOnly value={organization.address} />
            </div>
          </div>

          <hr className='my-12' />
          <div className='space-y-4'>
            {/* Bundle Link */}
            <div className='space-y-2'>
              <Label htmlFor='bundle-url' className='text-sm'>
                Link tải Bundle
              </Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  {bundleUrl ? (
                    <Input
                      id='bundle-url'
                      value={bundleUrl}
                      readOnly
                      className='cursor-pointer hover:bg-muted/50 transition-colors'
                      onClick={() => window.open(bundleUrl, '_blank')}
                    />
                  ) : (
                    <Input
                      id='bundle-url'
                      value='Bạn chưa có link tải bộ cài đặt'
                      readOnly
                      className='cursor-not-allowed italic'
                    />
                  )}
                  {copiedBundleUrl && (
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600'>
                      Đã sao chép!
                    </span>
                  )}
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 bg-transparent'
                  title='Click vào URL để copy hoặc mở link'
                  disabled={!bundleUrl}
                >
                  <HelpCircle className='w-4 h-4' />
                </Button>
                {bundleUrl && (
                  <Button
                    variant='default'
                    size='icon'
                    className='shrink-0'
                    onClick={() => window.open(bundleUrl, '_blank')}
                    title='Mở Google Drive'
                  >
                    <Eye className='w-4 h-4' />
                  </Button>
                )}
              </div>
            </div>

            {/* Activation Key */}
            {/* <div className='space-y-2'>
              <Label htmlFor='activation-key' className='text-sm'>
                Key kích hoạt
              </Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <Input
                    id='activation-key'
                    value={
                      organization.activationKey
                        ? showActivationKey
                          ? activationKey
                          : ''
                        : 'Bạn chưa có key kích hoạt'
                    }
                    placeholder={showActivationKey ? '' : '••••-••••-••••-••••'}
                    readOnly
                    className={`cursor-pointer ${!organization.activationKey && 'italic'}`}
                    onClick={() =>
                      organization.activationKey && showActivationKey && copyToClipboard(activationKey as string, 'key')
                    }
                  />
                  {copiedKey && (
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600'>
                      Đã sao chép!
                    </span>
                  )}
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 bg-transparent'
                  title='Help'
                  onClick={() => setShowActivationInstruction(!showActivationInstruction)}
                >
                  <HelpCircle className='w-4 h-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 bg-transparent'
                  onClick={() => setShowActivationKey(!showActivationKey)}
                  title={showActivationKey ? 'Ẩn' : 'Hiện'}
                >
                  {showActivationKey ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </Button>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal open={showChangePassword} onOpenChange={setShowChangePassword} />
    </div>
  );
};

export default ProfileTab;
