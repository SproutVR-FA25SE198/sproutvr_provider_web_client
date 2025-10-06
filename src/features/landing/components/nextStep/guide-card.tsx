'use client';

import { Button } from '@/common/components/ui/button';

import { motion } from 'framer-motion';

interface GuideCardProps {
  title: string;
  description: string;
  buttonText: string;
  isVisible: boolean;
}

export function GuideCard({ title, description, buttonText, isVisible }: GuideCardProps) {
  return (
    <motion.div
      className='mt-10 p-6 bg-accent rounded-xl border w-[95%] border-border relative overflow-hidden'
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity'
        initial={false}
      />
      <div className='relative z-10 text-center'>
        <h4 className='text-lg font-bold text-foreground mb-2'>{title}</h4>
        <p className='text-muted-foreground mb-4'>{description}</p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant='outline' className='w-full hover:bg-secondary hover:text-secondary-foreground'>
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
