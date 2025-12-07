'use client';

import { Button } from '@/common/components/ui/button';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DownloadAppButtonProps {
  downloadUrl: string;
}

export function DownloadAppButton({ downloadUrl }: DownloadAppButtonProps) {
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  // Match the same scroll threshold as ScrollToTopButton
  useEffect(() => {
    const toggleVisibility = () => {
      setScrollTopVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        right: scrollTopVisible ? 72 : 24, // Move left when scroll button is visible
      }}
      transition={{ duration: 0.3 }}
      className='fixed bottom-6 z-50'
      style={{ right: scrollTopVisible ? 72 : 24 }}
    >
      <motion.a
        href={downloadUrl}
        target='_blank'
        rel='noopener noreferrer'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size='lg'
          className='bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground font-semibold shadow-2xl shadow-secondary/30 gap-2 px-6 py-6 rounded-full'
        >
          <Download className='w-5 h-5 animate-bounce' />
          <span className='flex flex-col items-start'>
            <span className='text-xs opacity-80'>Tải miễn phí</span>
            <span className='text-sm font-bold'>Ứng dụng Desktop</span>
          </span>
        </Button>
      </motion.a>
    </motion.div>
  );
}
