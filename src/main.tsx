import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import routes from '@/core/routes';

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
