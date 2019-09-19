import Vue from 'vue'
import Vuex from 'vuex'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {      // this.$store.state.***
    token: localStorage.getItem('token') || '',
    // token 过期时间（Unix时间戳）
    token_expire: localStorage.getItem('token_expire') || 0,
    user: null
  },
  mutations: {  // this.$store.commit('方法的名称', '按需传递唯一的参数')
    // 注销账号
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('token_expire');
      state.user = null;
    }
  },
  getters: {    // thus.$store.getters.***
    isLogin: state => {
      var currentUnixTime = Math.round(new Date().getTime() / 1000);
      if (!!state.token && currentUnixTime < state.token_expire) {
        // token 存在 且 不为空 且 未过期
        return true;
      } else {
        return false;
      }
    }
  }
})

export default store
