<template>
  <div>
    <!-- 导入面包屑导航 -->
    <crumbs one="订单管理" two="订单列表"></crumbs>

    <!-- 导入表格 -->
    <div class="my_table">
      <el-card>
        <el-table :data="tableData" stripe border style="width: 100%;" height="440px">
          <el-table-column type="index" width="60" header-align="center" align="center" label="序号"></el-table-column>
          <el-table-column
            property="order_number"
            label="订单编号"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            property="order_price"
            label="订单价格"
            width="120"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            property="order_pay"
            label="是否付款"
            width="120"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">{{scope.row.order_pay | f_state}}</template>
          </el-table-column>
          <el-table-column
            property="is_send"
            label="是否发货"
            width="120"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            property="update_time"
            label="下单时间"
            width="120"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">{{scope.row.update_time | f_time('MM-DD HH:ss')}}</template>
          </el-table-column>

          <!-- 自定义模板列表 -->
          <el-table-column label="操作" header-align="center" align="center" width="60">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="compile(scope.row)"
                title="编辑"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="neworderDataList.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="neworderDataList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="neworderDataList.total"
        background
        class="my_pagination"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { orderDataList } from "../../http/http";

export default {
  data() {
    return {
      neworderDataList: {
        pagenum: 1,
        pagesize: 10,
        total: 999
      },

      tableData: []
    };
  },

  methods: {
    orderDataLists() {
      orderDataList(this.neworderDataList).then(res => {
        console.log(res);
        this.neworderDataList.total = res.data.data.total;
        this.tableData = res.data.data.goods;
      });
    },

    // 改变每页显示条数
    handleSizeChange(val) {
      this.neworderDataList.pagesize = val;
      this.pagenum = 1;
      this.orderDataLists();
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.neworderDataList.pagenum = val;
      this.orderDataLists();
    }
  },

  created() {
    this.orderDataLists();
  },

  filters: {
    f_state: function(val) {
      switch (val) {
        case "0":
          val = "未付款";
          return val;

        case "1":
          val = "已付款";
          return val;

        default:
          break;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.my_table {
  padding: 0 20px;
}
.my_pagination {
  margin: 10px 0;
}
</style>