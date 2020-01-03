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
Vue.prototype.$ = $
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});