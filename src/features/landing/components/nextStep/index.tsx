'use client';

import { Button } from '@/common/components/ui/button';
import configs from '@/core/configs';
import { useAppSelector } from '@/core/store/hooks';
import { useScrollReveal } from '@/features/landing/hooks/use-scroll-reveal';

import { useInView } from 'framer-motion';
import { ArrowRight, MapPin, ShoppingCart, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { nextStepData } from '../../data/nextStep';
import SectionContainer from '../common/section-container';
import { SectionHeader } from '../common/section-header';

import { GuideCard } from './guide-card';
import { RegisterForm } from './register-form';
import { StepItem } from './step-item';

const authenticatedData = {
  heading: 'Khám Phá Thư Viện Bản Đồ VR',
  subheading: 'Hàng trăm bản đồ học tập thực tế ảo đang chờ bạn khám phá!',
  card: {
    title: 'Sẵn Sàng Trải Nghiệm?',
    subtitle: 'Khám phá bộ sưu tập bản đồ VR đa dạng và mang trải nghiệm học tập sống động đến với học sinh của bạn.',
    features: [
      { icon: MapPin, text: 'Hàng trăm bản đồ đa dạng chủ đề' },
      { icon: Sparkles, text: 'Nội dung được cập nhật thường xuyên' },
      { icon: ShoppingCart, text: 'Đặt hàng nhanh chóng, giao hàng tận nơi' },
    ],
  },
  steps: [
    {
      number: '01',
      title: 'Khám phá Catalog',
      description: 'Duyệt qua thư viện bản đồ VR phong phú với nhiều chủ đề từ khoa học, lịch sử đến địa lý.',
    },
    {
      number: '02',
      title: 'Chọn bản đồ phù hợp',
      description: 'Lựa chọn các bản đồ phù hợp với chương trình giảng dạy và nhu cầu của trường.',
    },
    {
      number: '03',
      title: 'Thêm vào giỏ hàng',
      description: 'Thêm bản đồ yêu thích vào giỏ hàng và tiến hành đặt hàng dễ dàng.',
    },
    {
      number: '04',
      title: 'Triển khai & Sử dụng',
      description: 'Nhận bản đồ và bắt đầu mang trải nghiệm VR đến với học sinh ngay lập tức.',
    },
  ],
};

export function NextStep() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.3 });
  const isAuthenticated = useAppSelector((state) => state.root.auth.isAuthenticated);

  const heading = isAuthenticated ? authenticatedData.heading : nextStepData.heading;
  const subheading = isAuthenticated ? authenticatedData.subheading : nextStepData.subheading;
  const steps = isAuthenticated ? authenticatedData.steps : nextStepData.steps;

  return (
    <section id='register' ref={ref} className='bg-background'>
      <SectionContainer>
        <SectionHeader
          heading={heading}
          subheading={subheading}
          isInView={isVisible}
          className='mb-16 text-center w-full'
        />

        <div className='grid lg:grid-cols-2 gap-16 items-start'>
          {/* Left: Registration Form or Explore CTA */}
          <div
            className={`animate-fade-in-up transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {isAuthenticated ? (
              <div className='bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 rounded-3xl p-8 border border-border shadow-lg'>
                <h3 className='text-2xl font-bold text-foreground mb-3'>{authenticatedData.card.title}</h3>
                <p className='text-muted-foreground mb-6'>{authenticatedData.card.subtitle}</p>

                <div className='space-y-4 mb-8'>
                  {authenticatedData.card.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-3'>
                      <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                        <feature.icon className='w-5 h-5 text-primary' />
                      </div>
                      <span className='text-foreground'>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link to={configs.routes.catalog} className='flex-1'>
                    <Button size='lg' className='w-full group'>
                      Khám phá Catalog
                      <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Button>
                  </Link>
                  <Link to={configs.routes.basket} className='flex-1'>
                    <Button size='lg' variant='outline' className='w-full'>
                      <ShoppingCart className='mr-2 w-4 h-4' />
                      Xem giỏ hàng
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <RegisterForm
                title={nextStepData.form.title}
                subtitle={nextStepData.form.subtitle}
                submitText={nextStepData.form.submitText}
                disclaimer={nextStepData.form.disclaimer}
              />
            )}
          </div>

          {/* Right: Steps */}
          <div
            ref={stepsRef}
            className={`animate-fade-in-up transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <h3 className='text-2xl font-bold text-foreground mb-8'>
              {isAuthenticated ? 'Quy trình đặt hàng đơn giản!' : 'Đường đến phương pháp học tập tiên tiến!'}
            </h3>

            <div className='space-y-6'>
              {steps.map((step, index) => (
                <StepItem key={index} {...step} index={index} isVisible={stepsInView} />
              ))}
            </div>

            <GuideCard
              title={isAuthenticated ? 'Cần hỗ trợ?' : nextStepData.guide.title}
              description={
                isAuthenticated
                  ? 'Đội ngũ SproutVR luôn sẵn sàng hỗ trợ bạn trong quá trình lựa chọn và triển khai bản đồ VR.'
                  : nextStepData.guide.description
              }
              buttonText={isAuthenticated ? 'Liên hệ hỗ trợ' : nextStepData.guide.buttonText}
              isVisible={stepsInView}
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
