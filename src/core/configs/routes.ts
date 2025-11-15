const routes = {
  home: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
  verifyEmail: '/verify-email',
  register: '/register',
  personal: '/personal/:tab?',
  catalog: '/catalog',
  basket: '/basket',
  mapDetails: '/catalog/:id',
  checkout: '/checkout',
  paymentResult: '/payment-result',
  logout: '/logout',
  // Admin routes
  adminOrders: '/admin/orders',
  adminOrderDetails: '/admin/orders/:id',
  adminOrganizationRequests: '/admin/organization-requests',
  adminOrganizationRequestCheck: '/admin/organization-requests/:id/check',
  adminOrganizationManagement: '/admin/organizations',
  notFound: '*',
};

export default routes;
