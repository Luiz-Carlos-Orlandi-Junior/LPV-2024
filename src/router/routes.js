const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: '/books', component: () => import('pages/BooksPage.vue')},
      { path: '/gender', component: () => import('pages/GenderPage.vue')},
      { path: '/shopping', component: () => import('pages/ShoppingPage.vue')},
      { path: '/listing', component: () => import('pages/ListingPage.vue')}
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),

  },
]
export default routes
