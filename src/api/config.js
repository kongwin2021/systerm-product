import axios from "axios";

import router from "../router";

import ElementUI from "element-ui";



axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true;  //  允许请求携带认证

//  创建请求拦截器，可以给每个请求带上想要传递的内容；

axios.interceptors.request.use(config =>{
//  登入&注册是不需要携带token
    if( config.url == "/user/login") {
        return config
    } else{
        let token = localStorage.getItem('qf2008-token')
        //  config 指的是每个请求对象
        config.headers['authorization'] = token;
        //  放行
        return config
    }
})

//  响应拦截
axios.interceptors.response.use(config =>{
    let {data} = config;
    if(data.code == '1004' || data.code == '10022') {
        //  在当前的后台api中1004代表token校验失败，提示错误并且让页面跳转到登入页；
       ElementUI.Message.error('登入信息失效，请重新登入')
        router.push("/login")
    }
    return config
})



axios.create({
    timeout: 4000
})

export default axios 