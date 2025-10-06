'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  heading: string;
  subheading: string;
  isInView: boolean;
  className?: string;
}

export function SectionHeader({ heading, subheading, isInView, className }: SectionHeaderProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance'>{heading}</h2>
      <p className='text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed'>{subheading}</p>
    </motion.div>
  );
}
