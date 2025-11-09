import { resetBasket } from '@/common/stores/basketStore/basketSlice';
import { fetchBasketThunk } from '@/common/stores/basketStore/basketThunks';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './components/footer';
import Header from './components/header';

const ClientLayout = () => {
  const auth = useAppSelector((state) => state.root.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      dispatch(fetchBasketThunk(auth.user.sub));
    } else {
      dispatch(resetBasket());
    }
  }, [auth, auth.isAuthenticated, dispatch]);

  return (
    <>
      <Header />
      <main className='mt-14 min-h-[calc(100vh-80px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
