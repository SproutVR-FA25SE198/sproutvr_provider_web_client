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
  console.log('GuestGuard rendered. isAuthenticated:', isAuthenticated, 'isExternal:', isExternal);

  useEffect(() => {
    if (isAuthenticated && !isExternal) {
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
