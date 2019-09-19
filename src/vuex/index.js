import Vue from 'vue'
import Vuex from 'vuex'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {      // this.$store.state.***
    // // 注意：这里只是设置初始值，不会自动根据 localStorage 值的改变而自动更新
    // token: localStorage.getItem('token') || '',
    // // token 过期时间（Unix时间戳）
    // token_expire: localStorage.getItem('token_expire') || 0,
    user: null
  },
  mutations: {  // this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 获取当前登录账号并保存到 user
    getUser(state, vm) {
      vm.$http({
        method: "get",
        url: "/api/User"
      }).then(res => {
        if (res.data.code > 0) {
          state.user = res.data.data;
        } else {
          // 获取用户信息失败-未登录/ token 失效
          state.user = null;
        }
      });
    },
    // 注销账号
    logout(state) {
      localStorage.removeItem('token');
      // state.token = '';
      // state.token_expire = 0;

      state.user = null;
    },
    // // 保存 token 信息
    // saveToken(state, token, token_expire) {
    //   state.token = token;
    //   state.token_expire = token_expire;
    // }
  },
  getters: {    // thus.$store.getters.***
    // isLoginStore: state => {
    //   var currentUnixTime = Math.round(new Date().getTime() / 1000);
    //   if (!!localStorage.token && !!localStorage.token_expire && currentUnixTime < localStorage.token_expire) {
    //     // token 存在 且 不为空 且 未过期
    //     console.log("store.getters.isLogin: true");
    //     return true;
    //   } else {
    //     localStorage.removeItem('token');
    //     console.log("store.getters.isLogin: false");

    //     return false;
    //   }
    // }
  }
})

export default store
