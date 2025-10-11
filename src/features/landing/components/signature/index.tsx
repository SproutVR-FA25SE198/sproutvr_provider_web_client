'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

import { signatureProductsData } from '../../data/signature';
import SectionContainer from '../common/section-container';
import { SectionHeader } from '../common/section-header';

import { ProductCard } from './product-card';

export function SignatureProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id='products' ref={ref} className='bg-accent'>
      <SectionContainer>
        <SectionHeader
          heading={signatureProductsData.heading}
          subheading={signatureProductsData.subheading}
          isInView={isInView}
          className='text-center mb-16'
        />

        <div className='grid lg:grid-cols-3 gap-8'>
          {signatureProductsData.maps.map((map, index) => (
            <ProductCard key={index} {...map} index={index} isInView={isInView} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
