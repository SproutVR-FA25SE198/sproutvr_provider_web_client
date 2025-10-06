'use client';

import { motion } from 'framer-motion';

interface LandingBadgeProps {
  text: string;
}

export function LandingBadge({ text }: LandingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      className='inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6 backdrop-blur-sm border border-secondary/30'
    >
      <motion.span
        className='w-2 h-2 bg-secondary rounded-full'
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <span className='text-sm font-medium text-white'>{text}</span>
    </motion.div>
  );
}
