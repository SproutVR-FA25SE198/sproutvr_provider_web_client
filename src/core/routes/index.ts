import configs from '@/core/configs';

import { createBrowserRouter } from 'react-router-dom';

// const authGuardLazy = async () => ({
//   Component: (await import('@/core/guards/AuthGuard')).default,
// });

const router = createBrowserRouter([
  // Authenticated routes
  {
    // lazy: authGuardLazy,
    // children: [
    //   {
    //     lazy: mainLayoutLazy,
    //     children: [
    //
    //     ],
    //   },
    // ],
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
