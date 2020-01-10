import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'knowledge',
      component: () => import('@/components/view/knowledge'),
      meta:{
        requireAuth:true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/login/register')
    },
    {
      path: '/findpwd',
      name: 'findpwd',
      component: () => import('@/components/login/findpwd')
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: () => import('@/components/view/knowledge')
    },
  ]
})
