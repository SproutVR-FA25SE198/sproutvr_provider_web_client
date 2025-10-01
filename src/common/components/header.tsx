'use client';

import images from '@/assets/imgs';
import configs from '@/core/configs';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from './ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='relative w-30'>
              <img src={images.logo} alt='SproutVR' className='mx-auto w-30' />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            <NavLinks />
          </nav>

          {/* CTA Buttons */}
          <div className='hidden md:flex items-center gap-3'>
            <ActionButtons isAuthenticated={false} onClick={() => {}} />
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
              <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />

              <div className='flex flex-col gap-2 pt-2'>
                <ActionButtons mobile isAuthenticated={false} onClick={() => setMobileMenuOpen(false)} />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLinks({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const links = [
    { href: '', label: 'Về SproutVR' },
    { href: configs.routes.catalog, label: 'Catalog' },
    { href: '', label: 'Đăng ký tổ chức' },
    { href: '', label: 'Trợ giúp' },
    { href: '', label: 'Liên hệ' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={onClick}
          className={`text-sm font-medium text-foreground hover:text-secondary transition-colors`}
        >
          {link.label}
        </Link>
      ))}
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
  const url = useLocation().pathname;
  //   const handleLogout = () => {
  //     onClick();
  //     removeAccessToken();
  //     removeRefreshToken();
  //     window.location.reload();
  //   };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to={configs.routes.profile}>
            <Button
              variant='ghost'
              size={mobile ? 'default' : 'icon'}
              className='text-primary hover:text-[#B84A0E] hover:bg-[#FFE8D6]'
              onClick={onClick}
            >
              Tài khoản
              {mobile && <span className='ml-2'>Tài khoản</span>}
            </Button>
          </Link>
          <Button
            variant='ghost'
            size={mobile ? 'default' : 'icon'}
            className='text-primary hover:text-[#B84A0E] hover:bg-[#FFE8D6]'
            // onClick={handleLogout}
          >
            Đăng xuất
            {mobile && <span className='ml-2'>Đăng xuất</span>}
          </Button>
        </>
      ) : (
        <>
          <Link to={configs.routes.login}>
            <Button
              variant='ghost'
              size={mobile ? 'default' : 'icon'}
              className='text-primary hover:text-[#B84A0E] hover:bg-[#FFE8D6]'
            >
              Đăng nhập
              {mobile && <span className='ml-2'>Đăng nhập</span>}
            </Button>
          </Link>
        </>
      )}

      {/* {url !== configs.routes.checkout && (mobile ? <CartDrawer /> : <CartPopover />)} */}
    </>
  );
}
