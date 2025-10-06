'use client';

import { motion } from 'framer-motion';

interface HeroTitleProps {
  main: string;
  highlight: string;
}

export function Title({ main, highlight }: HeroTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance leading-tight'
    >
      {main}{' '}
      <motion.span
        className='text-secondary inline-block'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {highlight}
      </motion.span>
    </motion.h1>
  );
}
