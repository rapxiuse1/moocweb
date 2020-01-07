import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
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
  ]
})
