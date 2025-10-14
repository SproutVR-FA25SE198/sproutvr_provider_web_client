'use client';

import { Button } from '@/common/components/ui/button';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface LandingButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
  icon: LucideIcon;
  href?: string;
}

export function LandingButton({ text, variant, icon: Icon, href }: LandingButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <a href={href}>
        <Button
          size='lg'
          variant={isPrimary ? 'default' : 'outline'}
          className={
            isPrimary
              ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-semibold group relative overflow-hidden shadow-lg hover:shadow-secondary/50 transition-shadow'
              : 'bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm text-base font-semibold group shadow-lg hover:shadow-white/20 transition-shadow'
          }
        >
          {isPrimary && (
            <motion.span
              className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          )}
          <span className={`${isPrimary ? 'relative z-10' : ''} flex items-center`}>
            {variant === 'secondary' && <Icon className='mr-2 w-5 h-5 group-hover:scale-110 transition-transform' />}
            {text}
            {variant === 'primary' && <Icon className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />}
          </span>
        </Button>
      </a>
    </motion.div>
  );
}
