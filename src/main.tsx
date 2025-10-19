import routes from '@/core/routes';
import { persistor, store } from '@/core/store';

import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </StrictMode>,
);
