const routes = {
  home: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
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
  notFound: '*',
};

export default routes;
