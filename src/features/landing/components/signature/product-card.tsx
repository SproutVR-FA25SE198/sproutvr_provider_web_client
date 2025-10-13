'use client';

import { Button } from '@/common/components/ui/button';
import { Card } from '@/common/components/ui/card';
import { MapWithSubject } from '@/common/types';
import configs from '@/core/configs';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps extends MapWithSubject {
  index: number;
  isInView: boolean;
}

export function ProductCard({ id, name, description, imageUrl, subject, index, isInView }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
    >
      <Card className='overflow-hidden group hover:shadow-2xl transition-all h-full relative border-2 border-transparent hover:border-secondary/50 hover:shadow-secondary/20'>
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none z-10'
          initial={false}
          whileHover={{ opacity: 0.1 }}
        />

        <div className='relative overflow-hidden'>
          <motion.img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className='w-full h-64 object-cover'
            whileHover={{ scale: 1.15, filter: 'brightness(1.1)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <motion.div
            className='absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg'
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
          >
            {subject.masterSubject.name}
          </motion.div>
        </div>
        <div className='p-6'>
          <h3 className='text-2xl font-bold text-foreground mb-3'>{name}</h3>
          <p className='text-muted-foreground mb-6 leading-relaxed'>{description}</p>
          <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Button
              variant='ghost'
              onClick={() => navigate(configs.routes.mapDetails.replace(':id', id))}
              className='group/btn text-secondary hover:text-secondary py-0 px-4 relative hover:cursor-pointer'
            >
              <motion.span
                className='absolute -inset-2 bg-secondary/10 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity'
                layoutId={`button-bg-${index}`}
              />
              <span className='relative flex items-center'>
                Chi tiết
                <ArrowRight className='ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
              </span>
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
