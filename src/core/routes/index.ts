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

const clientGuardLazy = async () => ({
  Component: (await import('@/core/guards/ClientGuard')).default,
});

const clientLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/ClientLayout')).default,
});

const adminLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/AdminLayout')).default,
});

const router = createBrowserRouter([
  // Common routes (protected from admin)
  {
    lazy: clientGuardLazy,
    children: [
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
          {
            path: configs.routes.verifyEmail,
            lazy: async () => ({
              Component: (await import('@/features/auth/pages/VerifyEmail')).default,
            }),
          },
          {
            path: configs.routes.help,
            lazy: async () => ({
              Component: (await import('@/features/landing/pages/Help')).default,
            }),
          },
          {
            path: configs.routes.contact,
            lazy: async () => ({
              Component: (await import('@/features/landing/pages/Contact')).default,
            }),
          },
        ],
      },
    ],
  },

  // Guest routes (protected from admin via ClientGuard + must not be authenticated)
  {
    lazy: clientGuardLazy,
    children: [
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
    ],
  },

  // Auth routes (already protected from admin in AuthGuard)
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
          {
            path: configs.routes.adminPayments,
            lazy: async () => ({
              Component: (await import('@/features/admin-order-management/pages/PaymentList')).default,
            }),
          },
          {
            path: configs.routes.adminOrganizationRequests,
            lazy: async () => ({
              Component: (
                await import('@/features/admin-organization-request-management/pages/OrganizationRequestList')
              ).default,
            }),
          },
          {
            path: configs.routes.adminOrganizationRequestCheck,
            lazy: async () => ({
              Component: (
                await import('@/features/admin-organization-request-management/pages/OrganizationRequestCheck')
              ).default,
            }),
          },
          {
            path: configs.routes.adminOrganizationManagement,
            lazy: async () => ({
              Component: (await import('@/features/admin-organization-management/pages/OrganizationManagement'))
                .default,
            }),
          },
          {
            path: configs.routes.adminOrganizationDetails,
            lazy: async () => ({
              Component: (await import('@/features/admin-organization-management/pages/OrganizationDetails')).default,
            }),
          },
          {
            path: configs.routes.adminMaps,
            lazy: async () => ({
              Component: (await import('@/features/admin-maps/pages/MapList')).default,
            }),
          },
          {
            path: configs.routes.adminMapDetails,
            lazy: async () => ({
              Component: (await import('@/features/admin-maps/pages/MapDetails')).default,
            }),
          },
          {
            path: configs.routes.adminMapUpdate,
            lazy: async () => ({
              Component: (await import('@/features/admin-maps/pages/UpdateMap')).default,
            }),
          },
          {
            path: configs.routes.adminNotifications,
            lazy: async () => ({
              Component: (await import('@/features/admin-notifications/pages/NotificationList')).default,
            }),
          },
          {
            path: configs.routes.adminNotificationDetails,
            lazy: async () => ({
              Component: (await import('@/features/admin-notifications/pages/NotificationDetails')).default,
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
