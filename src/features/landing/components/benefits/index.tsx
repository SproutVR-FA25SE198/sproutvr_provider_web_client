'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { clientBenefitsData } from '../../data/benefits';
import SectionContainer from '../common/section-container';

import { BenefitCard } from './benefit-card';
import { TestimonialCard } from './testimonial-card';

export function Benefits() {
  const benefitsRef = useRef(null);
  const testimonialRef = useRef(null);
  const benefitsVisible = useInView(benefitsRef, { once: true, amount: 0.2 });
  const testimonialVisible = useInView(testimonialRef, { once: true, amount: 0.3 });

  return (
    <section id='benefits' className='py-20 md:py-24 bg-primary text-white relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <SectionContainer className='relative z-10'>
        <div ref={benefitsRef} className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance'>{clientBenefitsData.heading}</h2>
          <p className='text-lg text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed'>
            {clientBenefitsData.subheading}
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {clientBenefitsData.benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} isVisible={benefitsVisible} />
          ))}
        </div>

        <div ref={testimonialRef}>
          <TestimonialCard {...clientBenefitsData.testimonial} isVisible={testimonialVisible} />
        </div>
      </SectionContainer>
    </section>
  );
}
