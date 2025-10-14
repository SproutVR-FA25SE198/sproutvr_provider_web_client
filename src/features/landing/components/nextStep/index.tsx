'use client';

import { useScrollReveal } from '@/features/landing/hooks/use-scroll-reveal';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { nextStepData } from '../../data/nextStep';
import SectionContainer from '../common/section-container';
import { SectionHeader } from '../common/section-header';

import { GuideCard } from './guide-card';
import { RegisterForm } from './register-form';
import { StepItem } from './step-item';

export function NextStep() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.3 });

  return (
    <section id='get-started' ref={ref} className='bg-background'>
      <SectionContainer>
        <SectionHeader
          heading={nextStepData.heading}
          subheading={nextStepData.subheading}
          isInView={isVisible}
          className='mb-16 text-center w-full'
        />

        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          {/* Left: Registration Form */}
          <div
            className={`animate-fade-in-up transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <RegisterForm
              title={nextStepData.form.title}
              subtitle={nextStepData.form.subtitle}
              submitText={nextStepData.form.submitText}
              disclaimer={nextStepData.form.disclaimer}
            />
          </div>

          {/* Right: Steps */}
          <div
            ref={stepsRef}
            className={`animate-fade-in-up transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <h3 className='text-2xl font-bold text-foreground mb-8'>Đường đến phương pháp học tập tiên tiến!</h3>

            <div className='space-y-6'>
              {nextStepData.steps.map((step, index) => (
                <StepItem key={index} {...step} index={index} isVisible={stepsInView} />
              ))}
            </div>

            <GuideCard
              title={nextStepData.guide.title}
              description={nextStepData.guide.description}
              buttonText={nextStepData.guide.buttonText}
              isVisible={stepsInView}
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
