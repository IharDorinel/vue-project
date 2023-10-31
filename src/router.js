import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue';
import CoachesList from './pages/coaches/CoachesList';
import NotFound from './pages/NotFound';
import store from './store';

const CoachDetails = defineAsyncComponent(() => import('./pages/coaches/CoachDetails'))
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration'))
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach'))
const RequestsReceived = defineAsyncComponent(() => import('./pages/requests/RequestsReceived'))
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches'},
    { path: '/coaches', component: CoachesList },
    { path: '/coaches/:id', component: CoachDetails,
      props: true,
      children: [
      { path: 'contact', component: ContactCoach }
    ]},
    { path: '/register', component: CoachRegistration, meta: {requiresAuth: true} },
    { path: '/requests', component: RequestsReceived, meta: {requiresAuth: true} },
    { path: '/auth', component: UserAuth, meta: {requiresUnauth: true} },
    { path: '/:notFound(.*)', component: NotFound },
  ]
})

router.beforeEach(function(to, _, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
  
})

export default router