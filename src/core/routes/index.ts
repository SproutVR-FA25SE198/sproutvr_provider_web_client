import configs from '@/core/configs';

import { createBrowserRouter } from 'react-router-dom';

// const authGuardLazy = async () => ({
//   Component: (await import('@/core/guards/AuthGuard')).default,
// });
const clientLayoutLazy = async () => ({
  Component: (await import('@/core/layouts/ClientLayout')).default,
});
// const mainLayoutLazy = async () => ({
//   Component: (await import('@/core/layouts/MainLayout')).default,
// });

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
