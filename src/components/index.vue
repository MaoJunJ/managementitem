<template>
  <el-container class="mys_container">
    <!-- 头部 -->
    <el-header class="header">
      <el-row :gutter="20">
        <el-col :span="4" justify="center" align="middle">
          <img src="../assets/img/Snipaste_2019-08-15_15-12-19.jpg" alt height="50px" />
        </el-col>
        <el-col :span="16" justify="center" align="middle">
          <i class="header_i">后台商品管理系统</i>
        </el-col>
        <el-col :span="4" justify="center" align="middle">
          <a class="header_a" @click.prevent="logout">注销</a>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧栏 -->
      <el-aside width="180px" class="mys_aside" style="overflow-x: hidden">
        <el-menu class="el-menu-vertical-demo" unique-opened router collapse-transition>
          <el-submenu :index="''+temp.order" v-for="(temp, index) in menuitems" :key="index">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{temp.authName}}</span>
            </template>
            <el-menu-item :index="temps.path" v-for="(temps, index) in temp.children" :key="index">
              <i class="el-icon-collection-tag"></i>
              {{temps.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 底部 -->
      <el-main class="mys_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from "../api/http";

export default {
  data() {
    return {
      menuitems: []
    };
  },

  methods: {
    logout() {
      this.$confirm("此操作将注销账户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!"
          });

          // 发送请求注销
          window.sessionStorage.removeItem("token");

          // 返回登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消注销"
          });
        });
    }
  },

  created() {
    menus().then(res => {
      this.menuitems = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.header {
  background-color: rgb(42, 142, 182);
  height: 60px;
  line-height: 60px;
}

.header_i {
  font-size: 25px;
  color: #fff;
  letter-spacing: 2px;
}
.header_a {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
}

.mys_container {
  height: 100%;
}

.mys_aside {
  background-color: rgb(255, 255, 255);
}

.mys_main {
  background-color: rgb(218, 218, 218);
}
</style>