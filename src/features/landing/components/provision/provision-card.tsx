'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ProvisionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

export function ProvisionCard({ icon: Icon, title, description, index, isInView }: ProvisionCardProps) {
  return (
    <motion.div
      className='group p-6 rounded-2xl bg-card border border-border hover:border-secondary hover:shadow-lg transition-all relative overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <motion.div
        className='absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none'
        initial={false}
      />

      <motion.div
        className='w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 relative group-hover:shadow-lg group-hover:shadow-secondary/20 transition-shadow'
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          animate={isInView ? { rotate: [0, 360] } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        >
          <Icon className='w-7 h-7 text-secondary' />
        </motion.div>
      </motion.div>
      <h3 className='text-xl font-bold text-foreground mb-3 relative z-10'>{title}</h3>
      <p className='text-muted-foreground leading-relaxed relative z-10'>{description}</p>
    </motion.div>
  );
}
