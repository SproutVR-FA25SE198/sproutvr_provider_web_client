import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Organization } from '@/common/types/user.type';

import { motion } from 'framer-motion';
import { Eye, EyeOff, HelpCircle, Save } from 'lucide-react';
import { useState } from 'react';

interface ProfileTabProps {
  organization: Organization;
}

const ProfileTab = ({ organization }: ProfileTabProps) => {
  console.log('ProfileTab organization:', organization);
  const [showMacAddress, setShowMacAddress] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showActivationKey, setShowActivationKey] = useState(false);
  const [macAddress, setMacAddress] = useState(organization.macAddress || '');
  const [activationKey] = useState(organization.activationKey || undefined);
  const [copiedMac, setCopiedMac] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const copyToClipboard = (text: string, type: 'mac' | 'key') => {
    navigator.clipboard.writeText(text);
    if (type === 'mac') {
      setCopiedMac(true);
      setTimeout(() => setCopiedMac(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleMacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^A-Fa-f0-9]/g, '') // allow only hex characters
      .toUpperCase()
      .slice(0, 12); // max 12 hex digits

    // group every two characters and join with :
    const formatted = value.match(/.{1,2}/g)?.join(':') || '';
    setMacAddress(formatted);
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
          <div>
            <h1 className='text-2xl font-bold text-primary'>{organization.name}</h1>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='contact-email' className='text-sm'>
                  Contact email:
                </Label>
                <Input id='contact-email' type='email' readOnly value={organization.email} />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='contact-phone' className='text-sm'>
                  Contact phone:
                </Label>
                <Input id='contact-phone' readOnly value={organization.phoneNumber} />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='contact-address' className='text-sm'>
                Contact address:
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
                  MAC Address
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
                          : 'Hãy thêm địa chỉ MAC, ví dụ: 00:1A:2B:3C:4D:5E'
                      }
                      required
                      readOnly={organization.macAddress !== null}
                      onChange={handleMacChange}
                      className={`cursor-pointer ${!organization.macAddress && 'italic'}`}
                      onClick={() => showMacAddress && copyToClipboard(macAddress, 'mac')}
                    />
                    {copiedMac && (
                      <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600'>Copied!</span>
                    )}
                  </div>
                  <Button
                    variant='outline'
                    onClick={() => setShowInstruction(!showInstruction)}
                    size='icon'
                    className='shrink-0 bg-transparent'
                    title='Help'
                  >
                    <HelpCircle className='w-4 h-4' />
                  </Button>
                  {organization.macAddress !== null ? (
                    <Button
                      variant='outline'
                      size='icon'
                      className='shrink-0 bg-transparent'
                      onClick={() => setShowMacAddress(!showMacAddress)}
                      title={showMacAddress ? 'Hide' : 'Show'}
                    >
                      {showMacAddress ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </Button>
                  ) : (
                    <Button
                      variant='default'
                      size='icon'
                      type='submit'
                      className='shrink-0'
                      onClick={() => {
                        console.log('Save MAC Address:', macAddress);
                      }}
                      title={showMacAddress ? 'Hide' : 'Show'}
                    >
                      <Save className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Instruction Box */}
            <Card className='border-muted bg-muted/30' hidden={!showInstruction}>
              <CardContent className='py-8'>
                <div className='text-center text-muted-foreground font-medium'>
                  Instruction related to MAC & activation key
                </div>
              </CardContent>
            </Card>

            {/* Bundle Link */}
            <div className='space-y-2'>
              <Label htmlFor='activation-key' className='text-sm'>
                Bundle Download URL
              </Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <a href={organization.bundleGoogleDriveUrl || undefined} target='_blank' rel='noopener noreferrer'>
                    <Input
                      id='activation-key'
                      value={organization.bundleGoogleDriveUrl || 'Bạn chưa có link tải bộ cài đặt'}
                      readOnly
                      className={`cursor-pointer ${!organization.bundleGoogleDriveUrl && 'italic'}`}
                    />
                  </a>
                </div>
                <Button variant='outline' size='icon' className='shrink-0 bg-transparent' title='Help'>
                  <HelpCircle className='w-4 h-4' />
                </Button>
              </div>
            </div>

            {/* Activation Key */}
            <div className='space-y-2'>
              <Label htmlFor='activation-key' className='text-sm'>
                Activation key
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
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600'>Copied!</span>
                  )}
                </div>
                <Button variant='outline' size='icon' className='shrink-0 bg-transparent' title='Help'>
                  <HelpCircle className='w-4 h-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 bg-transparent'
                  onClick={() => setShowActivationKey(!showActivationKey)}
                  title={showActivationKey ? 'Hide' : 'Show'}
                >
                  {showActivationKey ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileTab;
