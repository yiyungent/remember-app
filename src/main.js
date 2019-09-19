// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import axios from 'axios'
import * as filters from './filters'

import vuetify from "./plugins/vuetify";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

// import FastClick from 'fastclick'

// FastClick.attach(document.body)

// axios 请求拦截 - 在发送请求之前做某件事
axios.interceptors.request.use(function(request){
  if (localStorage.token) {
    // 在 headers 中设置 Authorization 属性放token，token是存在缓存中的 
    request.headers.Authorization  = `Bearer ${localStorage.token}`;
  }

  return request;
}, function (error) {
  return Promise.reject(error);
})

// 为什么传这三个参数，官网有详细介绍
router.beforeEach((to,from,next) => {
  // 这里的meta就是我们刚刚在路由里面配置的meta
  if(to.meta.needLogin){
      // 下面这个判断是自行实现到底是否有没有登录
      if (store.getters.isLogin){
      // 登录就继续
          next();
      }else {
      // 没有登录跳转到登录页面，登录成功之后再返回到之前请求的页面
          next({
              path : '/login',
              query : {redirect : to.fullPath}
          })
      }
  }else {
  // 不需要登录的，可以继续访问
      next()
  }
});


Vue.config.productionTip = false
Vue.prototype.$http = axios

// 注册常用全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>'
})
