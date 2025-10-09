import { Outlet } from 'react-router-dom';

import Footer from './components/footer';
import Header from './components/header';

const ClientLayout = () => {
  return (
    <>
      <Header />
      <main className='mt-12 min-h-[calc(100vh-80px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
