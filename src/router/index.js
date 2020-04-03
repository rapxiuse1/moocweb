import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'knowledge',
      component: () => import('@/components/view/knowledge'),
    },
    {
      path: '/home',//首页
      name: 'home',
      component: () => import('@/components/view/home')
    },
    {
      path: '/knowledge',//常见问题
      name: 'knowledge',
      component: () => import('@/components/view/knowledge')
    },
    {
      path: '/detail',//常见问题明细
      name: 'detail',
      component: () => import('@/components/view/detail')
    },
    {
      path: '/privacy',//用户协议
      name: 'privacy',
      component: () => import('@/components/view/privacy')
    },
    {
      path: '/findpwd',//密码找回
      name: 'findpwd',
      component: () => import('@/components/login/findpwd')
    },
    {
      path: '/login',//初始登录页面
      name: 'login',
      component: () => import('@/components/login/login')
    },
    {
      path: '/onlinetest',//在线考试
      name: 'onlinetest',
      component: () => import('@/components/view/PC/onlinetest'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/testDetail',//试卷详情
      name: 'testDetail',
      component: () => import('@/components/view/PC/testDetail')
    },
    {
      path: '/question',//答题页面
      name: 'question',
      component: () => import('@/components/view/PC/question')
    },
    {
      path: '/score',//答案分析
      name: 'score',
      component: () => import('@/components/view/PC/score')
    },
    {
      path: '/answerList',//解析
      name: 'answerList',
      component: () => import('@/components/view/PC/answerList')
    },
    {
      path: '/answerMark',//批改
      name: 'answerMark',
      component: () => import('@/components/view/PC/answerMark')
    },
    {
      path: '/questionList',//问卷调查
      name: 'questionList',
      component: () => import('@/components/view/PC/questionList'),
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/questionSurvey',//问卷详细
      name: 'questionSurvey',
      component: () => import('@/components/view/PC/questionSurvey')
    },
    {
      path: '/questionResult',//问卷统计
      name: 'questionResult',
      component: () => import('@/components/view/PC/questionResult')
    },
    {
      path: '/feedBack',//意见反馈
      name: 'feedBack',
      component: () => import('@/components/view/PC/feedBack'),
      meta: {
        requireAuth: true,
      }
    },
  ]
})
