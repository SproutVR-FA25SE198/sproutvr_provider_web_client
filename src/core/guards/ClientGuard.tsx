import Loading from '@/common/components/loading';
import { UserRole } from '@/common/constants/roles';
import { RootState } from '@/core/store';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import configs from '../configs';

/**
 * ClientGuard prevents admin users from accessing client/public routes
 * and redirects them to the admin dashboard.
 * Non-admin users (authenticated or not) can access these routes.
 */
export default function ClientGuard() {
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.root.auth);

  if (isLoading) {
    return <Loading isLoading />;
  }

  // If authenticated as admin, redirect to admin dashboard
  if (isAuthenticated && user?.role === UserRole.SystemAdmin) {
    return <Navigate to={configs.routes.adminOrders} replace />;
  }

  // Allow all other users (guests and authenticated non-admin users)
  return <Outlet />;
}
