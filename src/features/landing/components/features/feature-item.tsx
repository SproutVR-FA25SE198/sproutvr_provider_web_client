'use client';

import { motion } from 'framer-motion';

import type { Feature } from '../../data/features';

interface FeatureItemProps extends Feature {
  index: number;
  isVisible: boolean;
}

export function FeatureItem({ icon: Icon, title, description, index, isVisible }: FeatureItemProps) {
  return (
    <motion.div
      className='flex gap-4 p-4 rounded-xl hover:bg-accent transition-all group relative overflow-hidden'
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 5, scale: 1.02 }}
    >
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity'
        initial={false}
      />

      <motion.div
        className='flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center relative z-10'
        whileHover={{ scale: 1.15, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Icon className='w-6 h-6 text-secondary' />
      </motion.div>
      <div className='relative z-10'>
        <h3 className='text-lg font-bold text-foreground mb-1'>{title}</h3>
        <p className='text-muted-foreground leading-relaxed'>{description}</p>
      </div>
    </motion.div>
  );
}
