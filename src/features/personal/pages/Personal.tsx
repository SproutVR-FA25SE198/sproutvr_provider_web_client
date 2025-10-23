'use client';

import Loading from '@/common/components/loading';
import { Card, CardContent } from '@/common/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/components/ui/tabs';
import { useExternalCheck } from '@/common/hooks/useExternalCheck';
import { GetOrdersResponse } from '@/common/types';
import configs from '@/core/configs';

import { History, Library, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import LibraryTab from '../components/library-tab';
import OrdersTab from '../components/orders-tab';
import ProfileTab from '../components/profile-tab';
import useGetLibrary from '../hooks/useGetLibrary';
import useGetOrders from '../hooks/useGetOrders';
import useGetProfile from '../hooks/useGetProfile';

const PERSONAL_TABS = { profile: 'profile', library: 'library', orders: 'orders' };

export default function PersonalPage() {
  const [activeTab, setActiveTab] = useState(useParams().tab || PERSONAL_TABS.profile);
  const isExternal = useExternalCheck();
  const navigate = useNavigate();

  const { data: organization, isLoading: isLoadingProfile, isError: isErrorProfile } = useGetProfile();
  const { data: orders, isLoading: isLoadingOrders, isError: isErrorOrders } = useGetOrders();
  const { data: purchasedMaps, isLoading: isLoadingLibrary, isError: isErrorLibrary } = useGetLibrary();

  const isLoading = isLoadingProfile || isLoadingOrders || isLoadingLibrary;
  const isError = isErrorProfile || isErrorOrders || isErrorLibrary;

  useEffect(() => {
    if (isError) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
      const timer = setTimeout(() => {
        if (isExternal) navigate(configs.routes.home);
        else navigate(-1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError, isExternal, navigate]);

  const setTab = (tab: string) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `/personal/${tab}`);
  };

  if (isLoading) {
    return <Loading isLoading />;
  }

  return (
    <div className=' bg-background flex flex-col overflow-hidden mt-14'>
      <div className='flex-1 flex overflow-hidden'>
        {/* Left Sidebar Navigation */}
        <Tabs defaultValue={activeTab} className='flex flex-col md:flex-row gap-2 md:gap-8 w-full mx-auto md:mr-24'>
          <div className='w-full md:w-64 md:ml-24 md:shrink-0'>
            {/* Mobile Tabs */}
            <TabsList className='w-full grid grid-cols-3 md:hidden'>
              <TabsTrigger
                onChange={() => setTab(PERSONAL_TABS.profile)}
                value={PERSONAL_TABS.profile}
                className='gap-2'
              >
                <User className='w-4 h-4' />
                <span className='hidden sm:inline'>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                onChange={() => setTab(PERSONAL_TABS.library)}
                value={PERSONAL_TABS.library}
                className='gap-2'
              >
                <Library className='w-4 h-4' />
                <span className='hidden sm:inline'>Library</span>
              </TabsTrigger>
              <TabsTrigger onChange={() => setTab(PERSONAL_TABS.orders)} value={PERSONAL_TABS.orders} className='gap-2'>
                <History className='w-4 h-4' />
                <span className='hidden sm:inline'>Orders</span>
              </TabsTrigger>
            </TabsList>

            {/* Desktop Sidebar */}
            <Card className='hidden md:block sticky top-24 left-24'>
              <CardContent className='p-4'>
                <TabsList className='flex flex-col h-auto bg-transparent p-0 space-y-2'>
                  <TabsTrigger
                    onClick={() => setTab(PERSONAL_TABS.profile)}
                    value={PERSONAL_TABS.profile}
                    className='w-full justify-start gap-3 data-[state=active]:bg-secondary data-[state=active]:text-white'
                  >
                    <User className='w-5 h-5' />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setTab(PERSONAL_TABS.library)}
                    value={PERSONAL_TABS.library}
                    className='w-full justify-start gap-3 data-[state=active]:bg-secondary data-[state=active]:text-white'
                  >
                    <Library className='w-5 h-5' />
                    <span>Library</span>
                  </TabsTrigger>
                  <TabsTrigger
                    onClick={() => setTab(PERSONAL_TABS.orders)}
                    value={PERSONAL_TABS.orders}
                    className='w-full justify-start gap-3 data-[state=active]:bg-secondary data-[state=active]:text-white'
                  >
                    <History className='w-5 h-5' />
                    <span>Payment History</span>
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>
          </div>

          <div className='flex-1 h-full overflow-auto mx-auto'>
            {/* Profile Tab Content */}
            <TabsContent value={PERSONAL_TABS.profile} className='mt-0 mb-14 md:mt-0'>
              <ProfileTab organization={organization} />
            </TabsContent>
            {/* Library Tab Content */}
            <TabsContent value={PERSONAL_TABS.library} className='mt-0 mb-14 md:mt-0'>
              <LibraryTab purchasedMaps={purchasedMaps} />
            </TabsContent>
            {/* Orders Tab Content */}
            <TabsContent value={PERSONAL_TABS.orders} className='mt-0 mb-14 md:mt-0'>
              <OrdersTab orderHistory={orders || ({} as GetOrdersResponse)} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
