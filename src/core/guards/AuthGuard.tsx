import Loading from '@/common/components/loading';
import { UserRole } from '@/common/constants/roles';
import { RootState } from '@/core/store';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import configs from '../configs';

export default function AuthGuard() {
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.root.auth);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (user?.role === UserRole.SystemAdmin) {
    return <Navigate to={configs.routes.adminOrders} replace />;
  }

  return <Outlet />;
}
