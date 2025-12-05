import Loading from '@/common/components/loading';
import { RootState } from '@/core/store';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.root.auth);
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.root.auth);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}
