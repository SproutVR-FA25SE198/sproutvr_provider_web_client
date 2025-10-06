'use client';

import { motion } from 'framer-motion';

import type { Testimonial } from '../../data/benefits';

interface TestimonialCardProps extends Testimonial {
  isVisible: boolean;
}

export function TestimonialCard({ quote, description, author, isVisible }: TestimonialCardProps) {
  return (
    <motion.div
      className='mt-20 max-w-4xl mx-auto'
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20'
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className='flex items-start gap-4 mb-6'>
          <motion.img
            src={author.image}
            alt={author.name}
            className='w-16 h-16 rounded-full'
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <div>
            <div className='text-2xl font-bold mb-2'>"{quote}"</div>
            <div className='text-white/80'>{description}</div>
            <div className='mt-4 font-semibold'>{author.name}</div>
            <div className='text-sm text-white/70'>{author.title}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
