'use client';

import { motion } from 'framer-motion';

import type { Benefit } from '../../data/benefits';

interface BenefitCardProps extends Benefit {
  index: number;
  isVisible: boolean;
}

export function BenefitCard({ icon: Icon, stat, title, description, color, index, isVisible }: BenefitCardProps) {
  return (
    <motion.div
      className='text-center group'
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className='relative inline-block mb-6'>
        <motion.div
          className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className='w-10 h-10 text-white' />
        </motion.div>
        <motion.div
          className='absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm'
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
        >
          {stat}
        </motion.div>
      </div>
      <h3 className='text-2xl font-bold mb-3'>{title}</h3>
      <p className='text-white/80 leading-relaxed'>{description}</p>
    </motion.div>
  );
}
