'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import type { Step } from '../../data/nextStep';

interface StepItemProps extends Step {
  index: number;
  isVisible: boolean;
}

export function StepItem({ number, title, description, index, isVisible }: StepItemProps) {
  return (
    <motion.div
      className='flex gap-4 group'
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 100 }}
    >
      <div className='flex-shrink-0'>
        <motion.div
          className='w-16 h-16 bg-accent rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors relative overflow-hidden'
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className='absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'
            initial={false}
          />
          <span className='text-2xl font-bold relative z-10'>{number}</span>
        </motion.div>
      </div>
      <motion.div
        className='flex-1 pt-2'
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
      >
        <h4 className='text-xl font-bold text-foreground mb-2 flex items-center gap-2'>
          {title}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 className='w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity' />
          </motion.div>
        </h4>
        <p className='text-muted-foreground leading-relaxed max-w-xl'>{description}</p>
      </motion.div>
    </motion.div>
  );
}
