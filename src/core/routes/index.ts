import configs from '@/core/configs';

import { createBrowserRouter } from 'react-router-dom';

const authGuardLazy = async () => ({
  Component: (await import('@/core/guards/AuthGuard')).default,
});

const guestGuardLazy = async () => ({
  Component: (await import('@/core/guards/GuestGuard')).default,
});

const clientLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/ClientLayout')).default,
});

const router = createBrowserRouter([
  // Common routes
  {
    lazy: clientLayoutLazy,
    children: [
      {
        path: configs.routes.home,
        lazy: async () => ({
          Component: (await import('@/features/landing/pages/Home')).default,
        }),
      },
      {
        path: configs.routes.catalog,
        lazy: async () => ({
          Component: (await import('@/features/catalog/pages/Catalog')).default,
        }),
      },
      {
        path: configs.routes.mapDetails,
        lazy: async () => ({
          Component: (await import('@/features/catalog/pages/MapDetails')).default,
        }),
      },
    ],
  },

  // Guest routes
  {
    lazy: guestGuardLazy,
    children: [
      {
        path: configs.routes.login,
        lazy: async () => ({
          Component: (await import('@/features/auth/pages/Login')).default,
        }),
      },
      {
        path: configs.routes.forgotPassword,
        lazy: async () => ({
          Component: (await import('@/features/auth/pages/ForgotPassword')).default,
        }),
      },
    ],
  },

  // Auth routes
  {
    lazy: authGuardLazy,
    children: [
      {
        path: configs.routes.basket,
        lazy: async () => ({
          Component: (await import('@/features/orders/pages/Basket')).default,
        }),
      },
      {
        path: configs.routes.personal,
        lazy: async () => ({
          Component: (await import('@/features/personal/pages/Personal')).default,
        }),
      },
    ],
  },

  // Checkout routes
  {
    lazy: clientLayoutLazy, // checkoutLazy,
    children: [
      {
        path: configs.routes.checkout,
        lazy: async () => ({
          Component: (await import('@/features/orders/pages/Checkout')).default,
        }),
      },
    ],
  },

  // Error routes
  {
    path: configs.routes.notFound,
    lazy: async () => ({
      Component: (await import('@/features/notFound')).default,
    }),
  },
]);

export default router;
