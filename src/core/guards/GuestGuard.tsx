import Loading from '@/common/components/loading';
import { useExternalCheck } from '@/common/hooks/useExternalCheck';
import { RootState } from '@/core/store';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import configs from '../configs';

export default function GuestGuard() {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth.auth);
  const isExternal = useExternalCheck();
  const navigate = useNavigate();
  const cameFromLogin = document.referrer && document.referrer.startsWith(window.location.origin + '/login');

  useEffect(() => {
    if (isAuthenticated && !isExternal && !cameFromLogin) {
      navigate(-1);
    }
  }, [isAuthenticated, isExternal, navigate]);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (isAuthenticated) {
    return <Navigate to={configs.routes.home} replace />;
  }

  return <Outlet />;
}
