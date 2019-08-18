<template>
  <!-- 直接套用模板布局 -->
  <el-container class="my_container">
    <!-- 头部 -->
    <el-header class="my_header">
      <el-row>
        <el-col :span="2" align="middle" justify="center" class="my_header_img">
          <img src="../assets/img/Snipaste_2019-08-15_20-09-39.jpg" alt height="50px" />
        </el-col>
        <el-col :span="21" class="my_header_i" align="middle" justify="center">
          <i>后台管理系统</i>
        </el-col>
        <el-col :span="1" class="my_header_p" align="middle" justify="center">
          <p @click.prevent="logout()">注销</p>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧栏 -->
      <el-aside width="150px" class="my_aside">
        <el-menu class="el-menu-vertical-demo" unique-opened router>
          <el-submenu :index="''+index" v-for="(temp, index) in menuList" :key="index">
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

      <!-- 内容 -->
      <el-main class="my_main">
        <!-- 设置子路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入左侧菜单的方法
import { menus } from "../http/http";

export default {
  data() {
    return {
      // 用个数组存数据
      menuList: []
    };
  },

  created() {
    // 获取左侧菜单数据
    menus().then(res => {
      this.menuList = res.data.data;
    });
  },

  methods: {
    // 注销提示
    logout() {
      this.$confirm("此操作将会注销, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!"
          });

          // 如果注销成功删除掉token
          window.sessionStorage.removeItem("token");

          // 同时进行页面跳转到登录
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消注销"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.my_container {
  height: 100%;
}

.my_header {
  height: 60px;
  background-color: #f6f6f6;
}

.my_header_i {
  font-size: 25px;
  color: rgb(0, 0, 0);
  line-height: 60px;
  letter-spacing: 2px;
}

.my_header_p {
  font-size: 14px;
  color: rgb(158, 158, 158);
  cursor: pointer;
  line-height: 60px;
  letter-spacing: 2px;
  :hover {
    color: #f6f6f6;
    background-color: rgb(0, 0, 0);
  }
}

.my_header_img {
  line-height: 50px;
}

.my_aside {
  overflow-x: hidden;
  background-color: rgb(255, 255, 255);
}

.my_main {
  background-color: #c7c7c7;
  padding: 0;
}
</style>

