import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect:{
    //     name:'knowledge'
    //   },
    //   meta:{
    //     requireAuth:true,
    //   }
    // },
    {
      path: '/',
      name: 'knowledge',
      component: () => import('@/components/view/knowledge')
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
  ]
})
