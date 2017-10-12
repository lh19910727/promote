import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/pages/main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/promote/wheel/',
  routes: [
    {
      path: '/:id*',
      name: 'main',
      components: {
        default: MainPage,
      },
    },
  ],
});
