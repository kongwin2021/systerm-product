import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//  刷新页面会丢失用户信息，所以要从localStorage中取；
let userInfo = JSON.parse(localStorage.getItem("qf-userInfo")) || {};



export default new Vuex.Store({
  state: {
    userInfo
  },
  mutations: {
    //  更改userInfo
    SET_USERINFO(state,payload) {
      state.userInfo = payload;
    }
  },
  actions: {},
  modules: {}
})
