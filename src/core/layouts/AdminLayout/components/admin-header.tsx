'use client';

import images from '@/assets/imgs';
import { Button } from '@/common/components/ui/button';
import { logoutThunk } from '@/common/stores/authStore/authThunks';
import configs from '@/core/configs';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';

import { LogOut, Package, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminHeader() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.root.auth.user);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary text-white shadow-lg'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo & Title */}
          <Link to={configs.routes.adminOrders} className='flex items-center space-x-3'>
            <div className='relative w-10 h-10 bg-white rounded-lg p-1.5'>
              <img src={images.logo} alt='SproutVR' className='w-full h-full object-contain' />
            </div>
            <div>
              <h1 className='text-xl font-bold flex items-center gap-2'>
                <Shield className='w-5 h-5' />
                Admin Panel
              </h1>
              <p className='text-xs text-white/80'>Quản trị hệ thống</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className='flex items-center gap-1'>
            <Link to={configs.routes.adminOrders}>
              <Button
                variant={location.pathname.includes('/admin/orders') ? 'secondary' : 'ghost'}
                className={`gap-2 ${
                  location.pathname.includes('/admin/orders')
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Package className='w-4 h-4' />
                Quản lý đơn hàng
              </Button>
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className='flex items-center gap-4'>
            <div className='text-right hidden sm:block'>
              <p className='text-sm font-medium'>{user?.email || 'Admin'}</p>
              <p className='text-xs text-white/70'>System Administrator</p>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleLogout}
              className='text-white hover:bg-white/20'
              title='Đăng xuất'
            >
              <LogOut className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

