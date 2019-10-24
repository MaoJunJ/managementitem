<template>
  <div class="my">
    <!-- 导入面包屑导航 -->
    <crumbs one="商品管理" two="分类参数"></crumbs>

    <div class="my_inner">
      <!-- 提示文案 -->
      <el-alert
        class="my_alert"
        :closable="false"
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      ></el-alert>

      <!-- 级联选择器 -->
      <div class="my_cascader">
        请选择商品分类：
        <el-cascader
          placeholder="请选择商品分类"
          expand-trigger="hover"
          v-model="selectedOptions"
          :props="{ label: 'cat_name', value: 'cat_id' }"
          :options="options"
          :show-all-levels="false"
          @change="accordingToIDs"
        ></el-cascader>
      </div>

      <!-- tab栏切换 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="small">添加动态参数</el-button>
          <!-- 表格数据部分 -->

          <el-table class="my_table" :data="tableData" style="width: 100%" stripe border>
            <!-- 表格下拉数据 -->
            <el-table-column type="expand">
              <template slot-scope="scope"><el-tag
                :key="index"
                v-for="(item, index) in scope.row.params"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row, index)">
                {{item}}
              </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>

            <!-- 序号 -->
            <el-table-column
              type="index"
              :index="indexMethod"
              width="60"
              header-align="center"
              align="center"
              label="序号"
            ></el-table-column>

            <!-- 表格标题 -->
            <el-table-column
              label="商品参数"
              prop="attr_name"
              width="800"
              header-align="center"
              align="center"
            ></el-table-column>

            <!-- 自定义模板列表 -->
            <el-table-column label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="editingTheRoles(scope.row)"
                  title="编辑"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteTheRoles(scope.row)"
                  title="删除"
                ></el-button>
              </template>
            </el-table-column>




          </el-table>



        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 导入方法
import { commodityLists, accordingToID } from "../../http/http";

export default {
  data() {
    return {
      // 存储级联选择器的数组
      options: [],
      // 已选择的类
      selectedOptions: [],
      // tab栏默认选择项
      activeName: "many",
      // 表格many数据数组
      tableData: [],
      // 表格only数据数组
      staticTableData: [],
      inputVisible: false,
      inputValue: ""
    };
  },

  created() {
    // 在服务器阶段调用此方法
    this.commodityList();
  },

  methods: {
    // 加载级联选择器里面的分级内容
    commodityList() {
      commodityLists(3).then(res => {
        if (res.data.meta.status == 200) {
          this.options = res.data.data;
          console.log(this.options);
        }
      });
    },

    // 加载列表里的数据
    accordingToIDs() {
      const url = `categories/${this.selectedOptions[2]}/attributes?sel=${
        this.activeName
      }`;
      accordingToID(url).then(res => {
        if (res.data.meta.status == 200) {
if (this.activeName === 'many') {
          this.tableData = res.data.data;
          // 给数组中的每一项添加params属性，把attr_vals用,分割，转换成数组存储到params中
          this.tableData.forEach((item) => {
            const arr = [];
            item.attr_vals.trim().split(',').forEach((item1) => {
              if (item1) {
                arr.push(item1);
              }
            });
            this.$set(item, 'params', arr);
          });
        } else {
          this.staticTableData = res.data.data;
        }
        }
      });
    },

    // 编号
    indexMethod(index) {
      return index * 1 + 1;
    }
  }
};
</script>

<style lang='less' scoped>
.my {
  .my_inner {
    .my_alert {
      margin: 10px 0;
    }
    .my_cascader {
      margin: 20px 0;
    }
    .my_table {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    background-color: #e9e9e9;
    box-sizing: border-box;
    padding: 10px 15px;
  }
}
</style>