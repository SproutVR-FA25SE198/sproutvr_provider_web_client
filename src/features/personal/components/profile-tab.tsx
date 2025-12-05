import Loading from '@/common/components/loading';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Organization } from '@/common/types/user.type';

import { motion } from 'framer-motion';
import { Eye, EyeOff, HelpCircle, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { SaveMACAddress } from '../services/profile.service';

import ActivationKeyInstruction from './activation-key-instruction';
import MacAddressInstruction from './mac-address-instruction';

interface ProfileTabProps {
  organization: Organization;
}

const ProfileTab = ({ organization }: ProfileTabProps) => {
  const [showMacAddress, setShowMacAddress] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showActivationInstruction, setShowActivationInstruction] = useState(false);
  const [showActivationKey, setShowActivationKey] = useState(false);
  const [macAddress, setMacAddress] = useState(organization.macAddress || '');
  const [isLoading, setIsLoading] = useState(false);
  const [activationKey] = useState(organization.activationKey || undefined);
  const [copiedMac, setCopiedMac] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBundleUrl, setCopiedBundleUrl] = useState(false);

  // Create Google Drive folder URL from bundleGoogleDriveId
  const bundleUrl = organization.bundleGoogleDriveId
    ? `https://drive.google.com/drive/folders/${organization.bundleGoogleDriveId}`
    : null;

  const copyToClipboard = (text: string, type: 'mac' | 'key' | 'bundle') => {
    navigator.clipboard.writeText(text);
    if (type === 'mac') {
      setCopiedMac(true);
      setTimeout(() => setCopiedMac(false), 2000);
    } else if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedBundleUrl(true);
      setTimeout(() => setCopiedBundleUrl(false), 2000);
    }
  };

  const handleSaveMacAddress = async () => {
    if (!macAddress) {
      toast.error('Vui lòng nhập địa chỉ MAC hợp lệ.');
      return;
    }
    setIsLoading(true);
    try {
      await SaveMACAddress(macAddress).then(() => {
        toast.success('Địa chỉ MAC đã được lưu thành công.');
      });
    } catch (error) {
      console.error('Error saving MAC address:', error);
      toast.error('Có lỗi xảy ra khi lưu địa chỉ MAC. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^A-Fa-f0-9]/g, '') // allow only hex characters
      .toUpperCase()
      .slice(0, 12); // max 12 hex digits

    // group every two characters and join with -
    const formatted = value.match(/.{1,2}/g)?.join('-') || '';
    setMacAddress(formatted);
  };

  if (isLoading) return <Loading isLoading />;

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
          <div>
            <h1 className='text-2xl font-bold text-primary'>{organization.name}</h1>
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
          {/* MAC Address & Activation Key Section */}
          <div className='space-y-4'>
            {/* MAC Address */}
            <div className='space-y-2'>
              <form onSubmit={(e) => e.preventDefault()}>
                <Label htmlFor='mac-address' className='text-sm'>
                  Địa chỉ MAC
                </Label>
                <div className='flex gap-2'>
                  <div className='relative flex-1'>
                    <Input
                      id='mac-address'
                      value={showMacAddress ? organization.macAddress : macAddress}
                      placeholder={
                        organization.macAddress
                          ? showMacAddress
                            ? ''
                            : '••••••••••••••••'
                          : 'Hãy thêm địa chỉ MAC, ví dụ: 00-1A-2B-3C-4D-5E'
                      }
                      required
                      readOnly={organization.macAddress !== null}
                      onChange={handleMacChange}
                      className={`cursor-pointer ${!organization.macAddress && 'italic'}`}
                      onClick={() => showMacAddress && copyToClipboard(macAddress, 'mac')}
                    />
                    {copiedMac && (
                      <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600'>
                        Đã sao chép!
                      </span>
                    )}
                  </div>
                  <Button
                    variant='outline'
                    onClick={() => setShowInstruction(!showInstruction)}
                    size='icon'
                    className='shrink-0 bg-transparent'
                    title='Hướng dẫn'
                  >
                    <HelpCircle className='w-4 h-4' />
                  </Button>
                  {organization.macAddress !== null ? (
                    <Button
                      variant='outline'
                      size='icon'
                      className='shrink-0 bg-transparent'
                      onClick={() => setShowMacAddress(!showMacAddress)}
                      title={showMacAddress ? 'Ẩn' : 'Hiện'}
                    >
                      {showMacAddress ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </Button>
                  ) : (
                    <Button
                      variant='default'
                      size='icon'
                      type='submit'
                      className='shrink-0'
                      onClick={handleSaveMacAddress}
                      title={showMacAddress ? 'Ẩn' : 'Hiện'}
                    >
                      <Save className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Instruction Box */}
            {showInstruction && <MacAddressInstruction />}

            {/* Bundle Link */}
            <div className='space-y-2'>
              <Label htmlFor='bundle-url' className='text-sm'>
                Link tải Bundle
              </Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  {bundleUrl ? (
                    <a href={bundleUrl} target='_blank' rel='noopener noreferrer'>
                      <Input
                        id='bundle-url'
                        value={bundleUrl}
                        readOnly
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={(e) => {
                          e.preventDefault();
                          copyToClipboard(bundleUrl, 'bundle');
                        }}
                      />
                    </a>
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
            <div className='space-y-2'>
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
            </div>
            {showActivationInstruction && <ActivationKeyInstruction />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileTab;
