<template>
  <div>
    <el-row class="my_row">
      <!-- 导入搜索框 -->
      <el-input
        @keyup.native="itemListDatass"
        placeholder="请输入商品名称"
        v-model.trim="itemListDataobj.query"
        class="input-with-select my_input"
      >
        <el-button slot="append" icon="el-icon-search" @keyup.enter="itemListDatass"></el-button>
      </el-input>

      <!-- 导入新增按钮 -->
      <el-button icon="el-icon-plus" circle @click="$router.push('/addTheGoods')"></el-button>
    </el-row>

    <!-- 导入表格 -->
    <el-table :data="itemListDatas" style="width: 100%" stripe border height="440">
      <el-table-column
        type="index"
        :index="indexMethod"
        width="60"
        header-align="center"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column
        prop="goods_id"
        label="商品 ID"
        width="80"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column sortable prop="goods_name" label="商品名称" header-align="center"></el-table-column>
      <el-table-column
        sortable
        prop="goods_price"
        label="价格"
        width="80"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        width="80"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.goods_state | f_state}}</template>
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="添加时间"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.add_time | f_time('MM-DD HH:ss')}}</template>
      </el-table-column>
      <el-table-column
        prop="upd_time"
        label="更新时间"
        width="120"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.upd_time | f_time('MM-DD HH:ss')}}</template>
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
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="itemListDataobj.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="itemListDataobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="itemListDataobj.total"
      background
      class="my_pagination"
    ></el-pagination>

    <!-- 编辑商品 -->
    <el-dialog title="编辑商品" :visible.sync="add" center width="40%">
      <el-form :model="editSubmitItemss" :rules="rules" ref="editSubmitItemss">
        <el-form-item label="商品 ID" label-width="80px" prop="goods_id">
          <el-input v-model="editSubmitItemss.goods_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px" prop="goods_name">
          <el-input v-model="editSubmitItemss.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px" prop="goods_price">
          <el-input v-model="editSubmitItemss.goods_price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="gocompile('editSubmitItemss')">确 定</el-button>
        <el-button @click="clear">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入各种方法
import {
  itemListData,
  editSubmitItems,
  deleteTheGoods
} from "../../../http/http";

export default {
  data() {
    return {
      add: false,

      // 给分页参数一个对象存值
      itemListDataobj: {
        // 查询参数，可以为空
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
        // 总页数
        total: 999
      },

      // 存商品列表数据
      itemListDatas: [],

      // 商品信息列表
      editSubmitItemss: {
        goods_id: "",
        goods_cat: "abc",
        goods_name: "",
        goods_price: "",
        goods_number: "0",
        goods_weight: "0"
      },

      // 表单验证的规则
      rules: {
        goods_name: [
          {
            required: true,
            message: "请输入商品名称"
          }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格"
          }
        ]
      }
    };
  },

  methods: {
    // 编号
    indexMethod(index) {
      return index * 1 + 1;
    },

    // 改变每页显示条数
    handleSizeChange(val) {
      this.itemListDataobj.pagesize = val;
      this.pagenum = 1;
      this.itemListDatass();
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.itemListDataobj.pagenum = val;
      this.itemListDatass();
    },

    // 商品列表数据
    itemListDatass() {
      if (this.itemListDataobj.query != "") {
        this.itemListDataobj.pagenum = 1;
      }
      itemListData(this.itemListDataobj).then(res => {
        this.itemListDatas = res.data.data.goods;
        this.itemListDataobj.total = res.data.data.total;
      });
    },

    // 点击编辑按钮
    compile(val) {
      this.editSubmitItemss.goods_id = val.goods_id;
      this.editSubmitItemss.goods_name = val.goods_name;
      this.editSubmitItemss.goods_price = val.goods_price;
      this.add = true;
    },

    // 编辑提交商品
    gocompile() {
      editSubmitItems(this.editSubmitItemss).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: "编辑商品信息成功",
            type: "success"
          });

          // 调用商品列表数据
          this.itemListDatass();

          // 清除商品编辑框信息
          this.clear();
          this.add = false;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 清除商品编辑框信息
    clear() {
      this.editSubmitItemss.goods_id = "";
      this.editSubmitItemss.goods_name = "";
      this.editSubmitItemss.goods_price = "";
      this.add = false;
    },

    // 点击删除商品
    deletes(val) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTheGoods(val.goods_id).then(res => {
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });

              // 调用商品列表数据
              this.itemListDatass();
            }
          });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  created() {
    // 一进来调用商品列表数据
    this.itemListDatass();
  },

  filters: {
    // 商品状态过滤器
    f_state: function(val) {
      switch (val) {
        case 0:
          val = "未通过";
          return val;

        case 1:
          val = "审核中";
          return val;

        case 2:
          val = "已审核";
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
.my_input {
  width: 300px;
  margin-right: 10px;
}

.my_pagination {
  margin: 10px 0;
}
</style>