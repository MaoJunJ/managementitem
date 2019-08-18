<template>
  <!-- 导入面包屑导航制作模板 -->
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my_breadcrumb">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{one}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{two}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["one", "two"]
};
</script>

<style lang="less" scoped>
.my_breadcrumb {
  height: 40px;
  background-color: #e9e9e9;
  line-height: 40px;
  padding-left: 15px;
}
</style>