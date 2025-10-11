'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { ProvisionCard as ProvisionCardType, ProvisionData } from '../../data/provision';
import SectionContainer from '../common/section-container';
import { SectionHeader } from '../common/section-header';

import { ProvisionCard } from './provision-card';

export function Provision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className='bg-background'>
      <SectionContainer>
        <SectionHeader
          heading={ProvisionData.heading}
          subheading={ProvisionData.subheading}
          isInView={isInView}
          className='mb-12 text-center w-full'
        />

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {ProvisionData.provisions.map((provision: ProvisionCardType, index) => (
            <ProvisionCard
              key={index}
              icon={provision.icon}
              title={provision.title}
              description={provision.description}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
