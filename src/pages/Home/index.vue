<template>
  <div class="home-page">
    <el-container>
      <el-aside width="200">

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <!-- 顶部 -->
        <el-header>

          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content">
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                七武海管理系统
              </div></el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar  
                            fit="fit"
                            >
                </el-avatar>
                <span>欢迎您：</span>  
                <b class="nickname">{{userInfo.nickname}}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>

        </el-header>
        <!-- 主体区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { getLoginLog } from "@/api"
  import {mapState} from "vuex"
  export default {
    computed:{
      ...mapState(['userInfo'])
    },
    data() {
      return {
        isCollapse: true
      };
    },
    mounted() {
      getLoginLog()
        .then(res =>{
          console.log(res);
        })
    },
    methods: {
      quit() {
        //  退出登入
        //  1、清除token和userInfo
        //  2、跳转登录页
        localStorage.removeItem('qf-userInfo')
        localStorage.removeItem('qf-token')

        this.$router.push("/login")
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

/* .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  } */
  .row-bg{
    /* background: linear-gradient(135deg, #4c67ff, #5635df); */
    color: #fff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
 
  .el-header{
    background: linear-gradient(135deg, #4c67ff, #5635df);
  }
  .quit{
    cursor: pointer;
    
  }
  .el-avatar--circle{
    vertical-align: middle;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  /* .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */
  /* .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  } */
  /* 侧边栏样式 */
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

