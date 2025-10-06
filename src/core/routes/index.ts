import configs from '@/core/configs';

import { createBrowserRouter } from 'react-router-dom';

// const authGuardLazy = async () => ({
//   Component: (await import('@/core/guards/AuthGuard')).default,
// });
const clientLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/ClientLayout')).default,
});

const router = createBrowserRouter([
  // Guest routes
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
