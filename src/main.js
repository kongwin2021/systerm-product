import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//  引入基础重置样式
import "@/assets/style/base.css"
import "@/assets/style/el-reset.css"

// Vue.config.productionTip = false;
Vue.use(ElementUI);

//  路由前置钩子（导航守卫）
router.beforeEach((to,from,next) => {
  // console.log(to);
  // console.log(from);
  //  用户登录之后 localstorage中会有token
  // console.log(to);
  let token = localStorage.getItem('qf2008-token');
  //  判断如果是注册页面或是登入页面直接放行
  if(token) {
    next()
  } else { //  没token
    if (to.path === "/login") {
      next()
    } else { //  如果访问的不是登录页就让他跳转登录页
      next({ path: "/login" })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
