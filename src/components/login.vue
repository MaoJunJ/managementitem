<template>
  <div class="loginbg">
    <div class="loginbox">
      <div class="logintop">登录界面</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="my_width">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="tishi()" class="my_width">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入login方法
import { login } from "../api/http";

export default {
  data() {
    return {
      // 数据保存地
      ruleForm: {
        username: "admin",
        password: "123456"
      },

      // 表单提示规则
      rules: {
        username: [
          { message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "change"
          }
        ],
        password: [
          { message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 登录接口
    submitForm(val) {
      // 先判断是否为空值
      if (
        this.ruleForm.username.length != 0 ||
        this.ruleForm.password.length != 0
      ) {
        this.$refs[val].validate(valid => {
          // 是否符合表单验证规则
          if (valid) {
            // 符合
            login(this.ruleForm).then(res => {
              if (res.data.meta.status == 200) {
                // 登录成功提示
                this.$message({
                  showClose: true,
                  message: res.data.meta.msg,
                  type: "success"
                });
                // 保存返回的token
                window.sessionStorage.setItem("token", res.data.data.token);
                // 执行跳转路由页面
                this.$router.push("/index");
              } else {
                // 登录失败提示
                this.$message({
                  showClose: true,
                  message: res.data.meta.msg,
                  type: "error"
                });
              }
            });
          } else {
            // 不符合表达验证规则
            return false;
          }
        });
      } else {
        // 为空提示
        this.$message({
          showClose: true,
          message: "请输入完整的账号或密码！",
          type: "warning"
        });
      }
    },

    // 不开放注册的功能
    tishi() {
      this.$message({
        showClose: true,
        message: "注册功能暂未开放"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.loginbg {
  width: 100%;
  height: 100%;
  background-color: rgb(80, 80, 80);
  display: flex;
  justify-content: center;
  align-items: center;
  .loginbox {
    box-sizing: border-box;
    width: 500px;
    height: 400px;
    background-color: #fff;
    border-radius: 30px;
    // box-shadow: 0px 0px 50px 5px rgb(156, 156, 156);
    padding: 0px 50px;
    .my_width {
      width: 100%;
    }
    .logintop {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 0px 0px 10px 10px;
      background-color: #6cc1d6;
      font-size: 20px;
      letter-spacing: 2px;
      color: #fff;
      margin-bottom: 5px;
    }
  }
}
</style>