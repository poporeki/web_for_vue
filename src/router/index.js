import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Loading.vue'
import BLOG from './blog/index.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      meta: {
        title: "YANSK'S BLOG",
        notshow: {
          loading: true
        }
      },
      redirect: '/blog'
    },
    BLOG, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆'
      },
      component: Login
    }
  ]
})