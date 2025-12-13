import { useSignalRConnection } from '@/features/admin-notifications/hooks/useSignalRConnection';

import { Outlet } from 'react-router-dom';

import AdminHeader from './components/admin-header';

const AdminLayout = () => {
  // Initialize SignalR connection for notifications
  useSignalRConnection();

  return (
    <>
      <AdminHeader />
      <main className='mt-16 min-h-[calc(100vh-64px)] bg-background'>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;

