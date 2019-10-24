<template>
  <div>
    <!-- 导入面包屑导航 -->
    <crumbs one="商品管理" two="商品分类"></crumbs>

    <el-row class="my_row">
      <!-- 导入新增按钮 -->
      <el-button icon="el-icon-plus" circle @click="addCategoryss=true"></el-button>
    </el-row>

    <!-- 导入商品列表模板 -->
    <el-table
      :data="newarr"
      style="width: 100%;"
      row-key="cat_id"
      border
      indent="50"
      :tree-props="{children: 'children'}"
      height="440"
    >
      <el-table-column prop="cat_name" label="分类名称" sortable header-align="center"></el-table-column>
      <el-table-column
        prop="cat_level"
        label="当前层级"
        sortable
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.cat_level | f_level}}</template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="当前状态"
        width="120"
        sortable
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.cat_deleted ? '无效' :'有效'}}</template>
      </el-table-column>

      <!-- 自定义模板列表 -->
      <el-table-column label="操作" header-align="center" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="compile(scope.row)"
            title="编辑"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deletes(scope.row)"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="cat_pid"
        label="父 ID"
        sortable
        width="120"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="cat_id"
        label="ID"
        sortable
        width="120"
        header-align="center"
        align="center"
      ></el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsCategory.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="goodsCategory.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsCategory.total"
      background
      class="my_pagination"
    ></el-pagination>

    <!-- 添加对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addCategoryss" center width="30%">
      <el-form :model="addCategory" :rules="rules" ref="addCategoryss">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="addCategory.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类层级" label-width="80px" prop="cat_level">
          <el-cascader
            v-model="addCategory.val"
            :options="commodityListTwo"
            :props="{ expandTrigger: 'hover',label: 'cat_name',value: 'cat_id',checkStrictly: true}"
            separator=" - "
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goaddCategory('addCategoryss')">确 定</el-button>
        <el-button @click="addCategoryss = false">取 消</el-button>
        <el-button @click="resetForm('addCategory')">重 置</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑商品分类" :visible.sync="editProductCategories" center width="30%">
      <el-form :model="systematicName" :rules="rules" ref="systematicNames">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="systematicName.cat_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goeditProductCategories('systematicNames')">确 定</el-button>
        <el-button @click="editProductCategories = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入各种方法
import {
  commodityLists,
  addCategorys,
  editProductCategoriess,
  deleteCategory
} from "../../http/http";

export default {
  data() {
    return {
      addCategoryss: false,
      editProductCategories: false,

      // 存获取到的商品分类列表 2层
      commodityListTwo: [],

      // 存获取到的商品分类列表 3层
      commodityLists: [],

      // 存获分类过的商品列表
      newarr: [],

      // 给分页参数一个对象存值
      goodsCategory: {
        // 查询参数，可以为空
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
        // 总页数
        total: 999
      },

      // 编辑分类
      systematicName: {
        cat_id: "",
        cat_name: ""
      },

      // 添加分类
      addCategory: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0,
        val: []
      },

      // 表单验证的规则
      rules: {
        cat_name: [{ required: true, message: "请输入分类名称" }]
      }
    };
  },

  methods: {
    // 改变每页显示条数
    handleSizeChange(val) {
      this.goodsCategory.pagesize = val;
      this.goodsCategory.pagenum = 1;
      this.commodityList();
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.goodsCategory.pagenum = val;
      this.commodityList();
    },

    // 商品分类列表数据
    commodityList() {
      // type请求参数表示显示二层分类列表
      commodityLists(2).then(res => {
        this.commodityListTwo = res.data.data;
      });

      // type请求参数表示显示三层分类列表
      commodityLists(3).then(res => {
        // 将总数据先存起来
        this.commodityLists = res.data.data;

        // 切割页面数据
        // 起始下标
        let start =
          (this.goodsCategory.pagenum - 1) * this.goodsCategory.pagesize;
        // 结束的下标
        let end = this.goodsCategory.pagenum * this.goodsCategory.pagesize;

        // 截取数组时不包括结束下标,所以上面就不要-1了
        this.newarr = res.data.data.slice(start, end);

        // 页码的总数
        this.goodsCategory.total = res.data.data.length;
      });
    },

    // 点击编辑按钮
    compile(val) {
      this.systematicName.cat_id = val.cat_id;
      this.systematicName.cat_name = val.cat_name;
      this.editProductCategories = true;
    },

    // 提交编辑
    goeditProductCategories(formName) {
      this.$refs[formName].validate(valid => {
        // 验证表单数据
        if (valid) {
          // 发送请求
          editProductCategoriess(this.systematicName).then(res => {
            if (res.data.meta.status == 200) {
              this.editProductCategories = false;

              // 商品分类列表数据
              this.commodityList();

              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 点击删除
    deletes(val) {
      this.$confirm("此操作将删除该商品分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCategory(val.cat_id).then(res => {
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });

              // 商品分类列表数据
              this.commodityList();
            }
          });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: res.data.meta.msg
          });
        });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 确认新增
    goaddCategory(formName) {
      const length = this.addCategory.val.length;
      this.addCategory.cat_level = length;
      switch (length) {
        case 0:
          this.addCategory.cat_pid = 0;
          break;
        case 1:
          this.addCategory.cat_pid = this.addCategory.val[0];
          break;
        case 2:
          this.addCategory.cat_pid = this.addCategory.val[1];
          break;
        default:
      }

      this.$refs[formName].validate(valid => {
        // 验证表单数据
        if (valid) {
          // 发送请求
          addCategorys(this.addCategory).then(res => {
            console.log(res);
            if (res.data.meta.status == 201) {
              this.addCategoryss = false;

              // 商品分类列表数据
              this.commodityList();

              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  },

  created() {
    // 商品分类列表数据
    this.commodityList();
  },

  filters: {
    f_level: function(val) {
      switch (val) {
        case 0:
          val = "|";
          return val;

        case 1:
          val = "| |";
          return val;

        case 2:
          val = "| | |";
          return val;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my_row {
  height: 50px;
  line-height: 40px;
  background-color: #e9e9e9;
  text-align: center;
}

.my_pagination {
  margin: 10px 0;
}
</style>