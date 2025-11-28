import Loading from '@/common/components/loading';
import { UserRole } from '@/common/constants/roles';
import { RootState } from '@/core/store';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminGuard() {
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.root.auth);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Check if user has admin role
  if (user?.role !== UserRole.SystemAdmin) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

