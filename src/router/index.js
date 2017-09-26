import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/pages/main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        default: MainPage,
      },
    },
    {
      path: '/404',
      alias: '*',
      name: 'notFound',
      component: resolve => require(['@/pages/notFound'], resolve),
    },
  ],
});