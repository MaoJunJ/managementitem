<template>
  <div>
    <!-- 导入面包屑导航 -->
    <crumbs one="权限管理" two="权限列表"></crumbs>

    <!-- 导入表格 -->
    <el-table :data="userlist" style="width: 100%" stripe border height="500">
      <el-table-column
        type="index"
        :index="indexMethod"
        width="60"
        header-align="center"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column prop="id" label="权限 ID" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column
        prop="authName"
        label="权限说明"
        width="300"
        header-align="center"
        align="center"
      ></el-table-column>

      <!-- 自定义列表 -->
      <el-table-column label="权限层级" width="120" header-align="center" align="center">
        <template slot-scope="scope">{{scope.row.level | f_level}}</template>
      </el-table-column>

      <el-table-column prop="pid" label="权限父 ID" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="path" label="对应访问路径" header-align="center" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入各种方法
import { listOfAllPermissions } from "../../http/http";

export default {
  data() {
    return {
      // 所有权限列表
      userlist: []
    };
  },

  methods: {
    // 编号
    indexMethod(index) {
      return index * 1 + 1;
    }
  },

  created() {
    //   获取所有权限列表
    listOfAllPermissions("list").then(res => {
      this.userlist = res.data.data;
    });
  },

  filters: {
    //   权限层级过滤
    f_level: function(val) {
      switch (val) {
        case "0":
          val = "一 级（1）";
          return val;
        case "1":
          val = "二 级（2）";
          return val;
        case "2":
          val = "三 级（3）";
          return val;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>