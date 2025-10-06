'use client';

import { motion } from 'framer-motion';

interface HeroStatProps {
  value: string;
  label: string;
  index: number;
}

export function HeroStat({ value, label, index }: HeroStatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className='text-3xl md:text-4xl font-bold text-white mb-1'>{value}</div>
      <div className='text-sm text-white/80'>{label}</div>
    </motion.div>
  );
}
