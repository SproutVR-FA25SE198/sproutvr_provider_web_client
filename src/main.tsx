import routes from '@/core/routes';

import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        {/* <CartProvider> */}
        <RouterProvider router={routes} />
        {/* </CartProvider> */}
        <ToastContainer
          position='top-right'
          className={'mt-15'}
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnHover={false}
          closeOnClick
          theme='light'
        />
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
