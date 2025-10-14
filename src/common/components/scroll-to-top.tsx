'use client';

import { Button } from '@/common/components/ui/button';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className='fixed bottom-7 right-7 z-50'
        >
          <Button
            size='icon'
            className='rounded-full bg-secondary text-primary-foreground shadow-lg hover:bg-secondary/70 hover:cursor-pointer transition-colors'
            onClick={scrollToTop}
          >
            <ArrowUp className='w-7 h-7' />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
