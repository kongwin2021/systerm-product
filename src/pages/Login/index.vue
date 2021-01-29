<template>
  <div class="login-page">
    <img src="./bg-color.png" alt="">
    <video id="v1" autoplay muted loop style="width: 100%">
      <source src="./bg_video.mp4">
  </video>
    <div class="container">
      <h1>王下七武海管理系统</h1>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  
  </div>
</template>

<script>
//  登入逻辑的实现

//  1、 收集用户输入的username&password传递给后端；

//  2、 登入通过后将后端返回的token存到本地；

//  3、 每次请求的时候,携带token到请求头；authorization

//  4、 展示token校验正确的数据；

//  5、 校验不通过跳转到登入页；



import {login} from "@/api"
import {mapMutations} from "vuex"
  export default {
    data() {
      /**
       * @param {Object} rule 就是一个表单验证对象
       * @param {String} value 输入值
       * @param {function} callback 校验通过不传参，校验不通过传参。
       */
      var validateUsername = (rule, value, callback) => {
       //  用户名正则，4到16位（字母、数字、下划线、减号）
       //var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
       if( !value ) {
          callback('4到16位（字母、数字、下划线、减号）')
       } else {
         callback()
       }
      };
      var validatePassword = (rule, value, callback) => {
        if( !value ) {
          callback('请输入密码')
       } else {
         callback()
       }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapMutations(['SET_USERINFO']),
      submitForm(formName) {
        
        //console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {  //  代表本地校验通过
            //  打开加载登入动画

            const loading = this.$loading({
              lock: true,
              text: '正在登入',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })

            let { username,password } = this.loginForm;
            //  发送登入请求
            login(username,password)
            .then(res =>{
              //  服务器响应关闭加载动画
              loading.close()

              console.log(res);
              if(res.data.state) {

                this.$message.success('登入成功')
                //  用户名密码正确
                localStorage.setItem("qf2008-token",res.data.token)
                localStorage.setItem("qf-userInfo",JSON.stringify(res.data.userInfo))
                //  更改state中['userInfo'] 的值；
                this.SET_USERINFO(res.data.userInfo)
                //  跳转到主页
                this.$router.push("/")
              } else {
                //  用户名密码错误
                this.$message.error("用户名密码错误")
              }
            })
            .catch(err =>{
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
  // var video= document.getElementById('v1');
  //   video.playbackRate = 0.5;

  
</script>

<style scoped>
  /* 表单样式 */
  .el-form{
    width: 400px;
    /* display: none; */
  }
  .login-page{
    position:relative;
  }
 
  video{
    position: fixed;
    right:0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -9999;
    /*灰色调*/
    /*-webkit-filter:grayscale(100%)*/

}
  img{
    opacity:.8;
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50px;
    left: 200px;
  }
h1{
  margin-top: 100px;
  margin-bottom: 50px;
  color: #fff;
  text-align: center;
}
.container{
    /* display: none; */
    width: 400px;
    height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    background-color: rgba(0,0,0,.2);
    position: absolute;
    right: 100px;
    top: 80px;
    border-radius: 20px;

  }

</style>
