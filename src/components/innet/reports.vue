<template>
  <div>
    <!-- 导入面包屑导航 -->
    <crumbs one="数据统计" two="数据报表"></crumbs>

    <div class="my_echartss">
      <div class="my_echarts" ref="echartss"></div>
    </div>
  </div>
</template>

<script>
// 导入各类插件
import echarts from "echarts";
import { newecharts } from "../../http/http";

export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.echartss);

    var option = {
      title: {
        text: "销售情况"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: []
    };

    newecharts().then(res => {
      option.legend = res.data.data.legend;
      option.series = res.data.data.series;
      option.xAxis = res.data.data.xAxis[0];

      // 两边不留白
      option.xAxis.boundaryGap = false;
      option.xAxis.type = "category";

      // 绘制图表
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
.my_echartss {
  height: 100%;
  background-color: #fff;
  padding: 20px;
  margin: 20px;
}
.my_echarts {
  height: 470px;
}
</style>