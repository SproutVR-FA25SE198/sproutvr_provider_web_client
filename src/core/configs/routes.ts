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
  logout: '/logout',
  notFound: '*',
};

export default routes;
