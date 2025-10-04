'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { keyFeaturesData } from '../../data/features';
import { useScrollReveal } from '../../hooks/use-scroll-reveal';
import SectionContainer from '../common/section-container';
import { SectionHeader } from '../common/section-header';

import { FeatureItem } from './feature-item';

export function KeyFeatures() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.15 });
  const imageRef = useRef(null);
  const imageVisible = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <section id='features' ref={sectionRef} className='py-20 md:py-24 bg-background relative overflow-hidden'>
      <motion.div
        className='absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent to-transparent opacity-50'
        initial={{ x: 100, opacity: 0 }}
        animate={sectionVisible ? { x: 0, opacity: 0.5 } : { x: 100, opacity: 0 }}
        transition={{ duration: 1 }}
      />

      <SectionContainer className='relative z-10'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left: Image */}
          <motion.div
            ref={imageRef}
            className='order-2 lg:order-1'
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={imageVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <div className='relative'>
              <motion.div
                className='relative rounded-2xl overflow-hidden shadow-2xl'
                whileHover={{ scale: 1.02, rotateY: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={keyFeaturesData.image.src || '/placeholder.svg'}
                  alt={keyFeaturesData.image.alt}
                  className='w-full h-auto rounded-2xl'
                />
              </motion.div>
              <motion.div
                className='absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-2xl opacity-20 blur-2xl'
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className='absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-2xl opacity-20 blur-2xl'
                animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          {/* Right: Features */}
          <div className='order-1 lg:order-2'>
            <SectionHeader
              heading={keyFeaturesData.heading}
              subheading={keyFeaturesData.subheading}
              isInView={sectionVisible}
              className='text-center lg:text-left mb-6'
            />

            <div className='space-y-3'>
              {keyFeaturesData.features.map((feature, index) => (
                <FeatureItem key={index} {...feature} index={index} isVisible={sectionVisible} />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
