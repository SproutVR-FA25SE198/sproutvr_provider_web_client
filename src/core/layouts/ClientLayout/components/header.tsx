'use client';

import images from '@/assets/imgs';
import { Button } from '@/common/components/ui/button';
import { UserRole } from '@/common/constants/roles';
import useBaskets from '@/common/hooks/useBasket';
import { logoutThunk } from '@/common/stores/authStore/authThunks';
import configs from '@/core/configs';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';

import { LogOut, Menu, Settings, ShoppingBasket, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = useAppSelector((state) => state.root.auth.isAuthenticated);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='relative w-30'>
              <img src={images.logo} alt='SproutVR' className='mx-auto w-12' />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            <NavLinks />
          </nav>

          {/* CTA Buttons */}
          <div className='hidden md:flex items-center gap-0'>
            <ActionButtons isAuthenticated={isAuthenticated} onClick={() => {}} />
          </div>

          {/* Mobile Menu Button */}
          <button className='md:hidden p-2' onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label='Toggle menu'>
            {mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-border animate-fade-in-up'>
            <nav className='flex flex-col gap-4'>
              <NavLinks onNavigate={() => setMobileMenuOpen(false)} />

              <div className='flex flex-col gap-2 pt-2'>
                <ActionButtons mobile isAuthenticated={isAuthenticated} onClick={() => setMobileMenuOpen(false)} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { href: '/', label: 'Về SproutVR' },
    { href: configs.routes.catalog, label: 'Catalog' },
    { href: '/#register', label: 'Đăng ký tổ chức', isHash: true },
    { href: configs.routes.help, label: 'Trợ giúp' },
    { href: configs.routes.contact, label: 'Liên hệ' },
  ];

  const handleHashNavigation = (hash: string) => {
    onNavigate?.();

    // If already on home page, just scroll to the element
    if (location.pathname === '/') {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {links.map((link) =>
        link.isHash ? (
          <button
            key={link.label}
            onClick={() => handleHashNavigation('register')}
            className='text-sm font-medium text-foreground hover:text-secondary hover:cursor-pointer transition-colors'
          >
            {link.label}
          </button>
        ) : (
          <Link
            key={link.label}
            to={link.href}
            onClick={onNavigate}
            className='text-sm font-medium text-foreground hover:text-secondary transition-colors'
          >
            {link.label}
          </Link>
        ),
      )}
    </>
  );
}

function ActionButtons({
  mobile = false,
  isAuthenticated = false,
  onClick,
}: {
  mobile?: boolean;
  isAuthenticated?: boolean;
  onClick: () => void;
}) {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector((state) => state.root.auth.user?.role);

  const { basketCount } = useBaskets();

  const handleLogout = () => {
    onClick();
    dispatch(logoutThunk());
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to={configs.routes.personal.replace(':tab?', 'profile')}>
            <Button
              variant='ghost'
              size={mobile ? 'default' : 'icon'}
              className='text-primary hover:bg-secondary/90 text-secondary-foreground'
              onClick={onClick}
            >
              {userRole !== UserRole.SystemAdmin ? (
                <User className='w-5 h-5 text-primary' />
              ) : (
                <Settings className='w-5 h-5 text-primary' />
              )}
              {mobile && <span className='ml-2'>Tài khoản</span>}
            </Button>
          </Link>
          {userRole !== UserRole.SystemAdmin && (
            <Link to={configs.routes.basket}>
              <Button
                variant='ghost'
                size={mobile ? 'default' : 'icon'}
                className='text-primary relative hover:bg-secondary/90 text-secondary-foreground'
                onClick={onClick}
              >
                <ShoppingBasket className='w-5 h-5 text-primary' />
                {mobile && <span className='ml-2'>Giỏ hàng</span>}
                {basketCount > 0 && (
                  <span className='absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-600 rounded-full'>
                    {basketCount}
                  </span>
                )}
              </Button>
            </Link>
          )}
          <Button
            variant='ghost'
            size={mobile ? 'default' : 'icon'}
            className='text-primary hover:bg-secondary/90 text-secondary-foreground'
            onClick={handleLogout}
          >
            <LogOut className='w-5 h-5 text-primary' />
            {mobile && <span className='ml-2'>Đăng xuất</span>}
          </Button>
        </>
      ) : (
        <>
          <Link to={configs.routes.login}>
            <Button variant='secondary' size={mobile ? 'default' : 'icon'} className='px-12'>
              <span>Đăng nhập</span>
            </Button>
          </Link>
        </>
      )}

      {/* {url !== configs.routes.checkout && (mobile ? <CartDrawer /> : <CartPopover />)} */}
    </>
  );
}
