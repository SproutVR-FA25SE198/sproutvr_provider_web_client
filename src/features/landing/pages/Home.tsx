import ScrollToTopButton from '@/common/components/scroll-to-top';
import useScrollTop from '@/common/hooks/useScrollTop';

import { Benefits } from '../components/benefits';
import { KeyFeatures } from '../components/features';
import { Hero } from '../components/hero';
import { NextStep } from '../components/nextStep';
import { Provision } from '../components/provision';
import { SignatureProducts } from '../components/signature';

const Home = () => {
  useScrollTop();
  return (
    <>
      <Hero />
      <Provision />
      <SignatureProducts />
      <KeyFeatures />
      <Benefits />
      <NextStep />
      <ScrollToTopButton />
    </>
  );
};

export default Home;
