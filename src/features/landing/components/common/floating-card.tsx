'use client';

import { motion } from 'framer-motion';

interface FloatingCardProps {
  icon: string;
  label: string;
  value: string;
}

export function FloatingCard({ icon, label, value }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className='absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4'
    >
      <div className='flex items-center gap-3'>
        <motion.div
          className='w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center'
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className='text-2xl'>{icon}</span>
        </motion.div>
        <div>
          <div className='text-sm font-semibold text-foreground'>{label}</div>
          <motion.div
            className='text-2xl font-bold text-secondary'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {value}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
