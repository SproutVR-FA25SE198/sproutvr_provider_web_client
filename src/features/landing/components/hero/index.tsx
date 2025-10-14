'use client';

import { motion } from 'framer-motion';

import { heroData } from '../../data/hero';
import { FloatingCard } from '../common/floating-card';
import { LandingBadge } from '../common/landing-badge';
import { LandingButton } from '../common/landing-button';
import SectionContainer from '../common/section-container';
import { Title } from '../common/title';

import { HeroStat } from './hero-stat';

export function Hero() {
  return (
    <section className='relative pb-24 overflow-hidden bg-gradient-to-br from-primary via-primary to-[#0f2c5b]'>
      <div className='absolute inset-0 opacity-10'>
        <motion.div
          className='absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl'
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl'
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/50 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
      </div>

      <SectionContainer className='pt-8 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='text-center lg:text-left'>
            <LandingBadge text={heroData.badge.text} />
            <Title main={heroData.title.main} highlight={heroData.title.highlight} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed max-w-2xl mx-auto lg:mx-0'
            >
              {heroData.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
            >
              {heroData.buttons.map((button, index) => (
                <LandingButton
                  href={button.href}
                  key={index}
                  text={button.text}
                  variant={button.variant}
                  icon={button.icon}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20'
            >
              {heroData.stats.map((stat, index) => (
                <HeroStat key={index} value={stat.value} label={stat.label} index={index} />
              ))}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative w-[85%] mx-auto'
          >
            <motion.div
              className='relative rounded-2xl overflow-hidden shadow-2xl'
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img src={heroData.image.src || '/placeholder.svg'} alt={heroData.image.alt} className='w-full h-auto' />
              <div className='absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent' />
            </motion.div>

            <FloatingCard
              icon={heroData.floatingCard.icon}
              label={heroData.floatingCard.label}
              value={heroData.floatingCard.value}
            />
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
