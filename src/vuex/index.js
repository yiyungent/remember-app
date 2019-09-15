import Vue from 'vue'
import Vuex from 'vuex'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {      // this.$store.state.***
    count: 0
  },
  mutations: {  // this.$store.commit('方法的名称', '按需传递唯一的参数')
    increment (state) {
      state.count++
    }
  },
  getters: {    // thus.$store.getters.***

  }
})

export default store
