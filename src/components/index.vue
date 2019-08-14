<template>
  <div class="indexs">
    <el-container>
      <!-- 顶部标题栏 -->

      <el-header>后台管理系统
        <!-- <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">后台管理系统</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row> -->
      </el-header>

      <el-container>
        <!-- 侧边导航栏 -->
        <el-aside width="150px">
          <el-menu :default-openeds="['1', '5']">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>用户管理
              </template>
              <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-message"></i>权限管理
              </template>
              <el-menu-item index="2-1">角色列表</el-menu-item>
              <el-menu-item index="2-2">权限列表</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-message"></i>商品管理
              </template>
              <el-menu-item index="3-1">商品列表</el-menu-item>
              <el-menu-item index="3-2">分类参数</el-menu-item>
              <el-menu-item index="3-3">商品分类</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-message"></i>订单管理
              </template>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-message"></i>数据统计
              </template>
              <el-menu-item index="5-1">数据报表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 内容区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #6cc1d6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  //   background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.indexs {
  .el-container {
    .el-header {
      font-size: 25px;
      color: rgb(255, 255, 255);
      letter-spacing: 2px;
    }

    .el-container {
      height: 100%;
      .el-menu {
        height: 100%;
      }
      .el-main {
        height: 100%;
      }
    }
  }
}
</style>