// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from './router'
import axios from 'axios'
import qs from 'qs'
import $ from 'jQuery'
import Router from 'vue-router'
import global from '@/components/global'
import echarts from 'echarts'
import Vuex from 'vuex'
import VueCropper from 'vue-cropper' //图片裁剪工具
import store from './store'
Vue.use(Vuex)
Vue.prototype.$echarts = echarts
Vue.prototype.$ = $
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.global_ = global
Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(VueCropper)
Vue.prototype.$Message.config({
  top: 70,
  duration:2
});
//路由跳转相同地址报错解决
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/* eslint-disable no-new */
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//      // 判断该路由是否需要登录权限
//      let userName = sessionStorage.getItem("userName")
//      console.log(userName)
//     if (userName) { // 判断缓存里面是否有 userName  //在登录的时候设置它的值
//       next();
//     }else {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }else {
//     next();
//   }
// });
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});