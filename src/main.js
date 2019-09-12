// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
import FastClick from 'fastclick'
import { ViewBox } from 'vux'

FastClick.attach(document.body)

// axios 请求拦截 - 在发送请求之前做某件事
axios.interceptors.request.use(function(response){
  // 在 headers 中设置authorization 属性放token，token是存在缓存中的
  response.headers.token = localStorage["token"]
  return response
}, function (error) {
  return Promise.reject(error);
})

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.component('view-box', ViewBox)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
