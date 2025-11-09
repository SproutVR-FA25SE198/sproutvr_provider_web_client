import configs from '@/core/configs';

import { createBrowserRouter } from 'react-router-dom';

const authGuardLazy = async () => ({
  Component: (await import('@/core/guards/AuthGuard')).default,
});

const adminGuardLazy = async () => ({
  Component: (await import('@/core/guards/AdminGuard')).default,
});

const guestGuardLazy = async () => ({
  Component: (await import('@/core/guards/GuestGuard')).default,
});

const clientLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/ClientLayout')).default,
});

const adminLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/AdminLayout')).default,
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
        lazy: clientLayoutLazy,
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
    ],
  },

  // Auth routes
  {
    lazy: authGuardLazy,
    children: [
      {
        lazy: clientLayoutLazy,
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
    ],
  },

  // Admin routes
  {
    lazy: adminGuardLazy,
    children: [
      {
        lazy: adminLayoutLazy,
        children: [
          {
            path: configs.routes.adminOrders,
            lazy: async () => ({
              Component: (await import('@/features/admin-order-management/pages/OrderList')).default,
            }),
          },
          {
            path: configs.routes.adminOrderDetails,
            lazy: async () => ({
              Component: (await import('@/features/admin-order-management/pages/Order')).default,
            }),
          },
        ],
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
      {
        path: configs.routes.paymentResult,
        lazy: async () => ({
          Component: (await import('@/features/orders/pages/PaymentResult')).default,
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
