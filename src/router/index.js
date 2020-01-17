import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'knowledge',
      component: () => import('@/components/view/knowledge'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: () => import('@/components/view/knowledge')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/components/view/detail')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/components/view/privacy')
    },
    {
      path: '/findpwd',
      name: 'findpwd',
      component: () => import('@/components/login/findpwd')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/login')
    },
    {
      path: '/onlinetest',
      name: 'onlinetest',
      component: () => import('@/components/view/PC/onlinetest')
    },
    {
      path: '/testDetail',
      name: 'testDetail',
      component: () => import('@/components/view/PC/testDetail')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('@/components/view/PC/question')
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('@/components/view/PC/score')
    },
  ]
})
