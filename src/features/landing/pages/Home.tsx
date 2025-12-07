import ScrollToTopButton from '@/common/components/scroll-to-top';
import useScrollTop from '@/common/hooks/useScrollTop';

import { Benefits } from '../components/benefits';
import { DownloadAppButton } from '../components/common/download-app-button';
import { KeyFeatures } from '../components/features';
import { Hero } from '../components/hero';
import { NextStep } from '../components/nextStep';
import { Provision } from '../components/provision';
import { SignatureProducts } from '../components/signature';

// Replace with your actual download URL
const DESKTOP_APP_DOWNLOAD_URL =
  'https://drive.google.com/file/d/1uZKJIcWnNraD5iP7VzMyFhBLj8-EGmIE/view?usp=drive_link';

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
      <DownloadAppButton downloadUrl={DESKTOP_APP_DOWNLOAD_URL} />
    </>
  );
};

export default Home;
