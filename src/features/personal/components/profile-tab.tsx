import { Button } from '@/common/components/ui/button';
import { Card, CardContent } from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Organization } from '@/common/types/user.type';

import { motion } from 'framer-motion';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface ProfileTabProps {
  organization: Organization;
}

const ProfileTab = ({ organization }: ProfileTabProps) => {
  const [showMacAddress, setShowMacAddress] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showActivationKey, setShowActivationKey] = useState(false);
  const [macAddress] = useState('00:1B:44:11:3A:B7');
  const [activationKey] = useState('XXXX-XXXX-XXXX-XXXX');
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
                <Input id='contact-phone' readOnly value={organization.phone} />
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
              <Label htmlFor='mac-address' className='text-sm'>
                MAC Address
              </Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <Input
                    id='mac-address'
                    value={showMacAddress ? macAddress : ''}
                    placeholder={showMacAddress ? '' : '••••••••••••••••'}
                    readOnly={organization.macAddress !== ''}
                    className='cursor-pointer'
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
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 bg-transparent'
                  onClick={() => setShowMacAddress(!showMacAddress)}
                  title={showMacAddress ? 'Hide' : 'Show'}
                >
                  {showMacAddress ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </Button>
              </div>
            </div>

            {/* Instruction Box */}
            <Card className='border-muted bg-muted/30' hidden={!showInstruction}>
              <CardContent className='py-8'>
                <div className='text-center text-muted-foreground font-medium'>
                  Instruction related to MAC & activation key
                </div>
              </CardContent>
            </Card>

            {/* Activation Key */}
            <div className='space-y-2'>
              <Label htmlFor='activation-key' className='text-sm'>
                Activation key
              </Label>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <Input
                    id='activation-key'
                    value={showActivationKey ? activationKey : ''}
                    placeholder={showActivationKey ? '' : '••••-••••-••••-••••'}
                    readOnly
                    className='cursor-pointer'
                    onClick={() => showActivationKey && copyToClipboard(activationKey, 'key')}
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
