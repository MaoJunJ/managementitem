<template>
  <div class="clears">
    <!-- 导入面包屑导航 -->
    <crumbs one="用户管理" two="用户列表"></crumbs>

    <el-row :gutter="5" class="my_table">
      <el-col :span="7">
        <hr />
      </el-col>

      <el-col :span="8">
        <!-- 导入搜索框 -->
        <el-input
          @keyup.native="gouesrs"
          placeholder="请输入内容"
          v-model.trim="usersobj.query"
          class="input-with-select"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @keyup.enter.native="gouesrs"></el-button>
        </el-input>
      </el-col>

      <!-- 导入添加用户 -->
      <el-col :span="2">
        <el-button type="info" round size="medium" @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>

      <el-col :span="7">
        <hr />
      </el-col>
    </el-row>

    <!-- 导入表格 -->
    <!-- 用 ':formatter' 来绑定 设置时间格式的方法 dateForma -->
    <el-table :data="userlist" style="width: 100%" stripe border>
      <el-table-column
        type="index"
        :index="indexMethod"
        width="60"
        header-align="center"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column prop="username" label="姓名" width="120" header-align="center" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180" header-align="center" align="center"></el-table-column>
      <el-table-column prop="role_name" label="权限" width="180" header-align="center" align="center"></el-table-column>

      <!-- 自定义模板列表 -->
      <el-table-column label="用户状态" width="300" header-align="center" align="center">
        <template slot-scope="scope">
          <!-- scope.row得到这一行的数据 -->
          <!-- {{ scope.row }} -->
          <el-switch
            style="display: block"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#909399"
            active-text="开启"
            inactive-text="关闭"
            @change="gomodifyUserStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <!-- 自定义模板列表 -->
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            icon="el-icon-s-operation"
            circle
            @click="handleAssignUserRoles(scope.row)"
            title="权限"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEditUserSubmission(scope.row)"
            title="设置"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.row)"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="usersobj.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="usersobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="usertotal"
      background
      class="my_pagination"
    ></el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" center width="30%">
      <el-form :model="addusers" :rules="rules" ref="addusers">
        <el-form-item label="姓名" label-width="55px" prop="username">
          <el-input v-model="addusers.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="55px" prop="password">
          <el-input v-model="addusers.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="55px" prop="email">
          <el-input v-model="addusers.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="55px" prop="mobile">
          <el-input v-model="addusers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goaddusers('addusers')">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('addusers')">重 置</el-button>
      </div>
    </el-dialog>

    <!-- 分配用户角色对话框 -->
    <el-dialog title="编辑权限" :visible.sync="assignUserRolesFormVisible" center width="30%">
      <el-form :model="editlist" ref="editlist">
        <el-form-item label="姓名" label-width="100px">
          <span>{{editlist.username}}</span>
        </el-form-item>
        <el-form-item label="选择权限" label-width="100px">
          <el-select v-model="editlist.rid" placeholder="···手动滑稽···">
            <el-option
              v-for="(temp, index) in allRolesList"
              :key="index"
              :label="temp.roleName"
              :value="temp.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goeditlist('editlist')">确 定</el-button>
        <el-button @click="assignUserRolesFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户提交对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserSubmissionFormVisible" center width="30%">
      <el-form :model="addusers" :rules="rules" ref="editUser">
        <el-form-item label="姓名" label-width="55px" prop="username">
          <el-input v-model="addusers.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="55px" prop="email">
          <el-input v-model="addusers.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="55px" prop="mobile">
          <el-input v-model="addusers.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goeditUser('editUser')">确 定</el-button>
        <el-button @click="cancelTheEditor">取 消</el-button>
        <el-button @click="clear">清 除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入各种方法
import {
  users,
  adduserss,
  modifyUserStatus,
  assignUserRoles,
  editUserSubmission,
  deleteSingleUser,
  listOfAllRoles
} from "../../http/http";

export default {
  data() {
    return {
      // 添加用户对话框
      dialogFormVisible: false,
      // 分配用户角色对话框
      assignUserRolesFormVisible: false,
      // 编辑用户提交对话框
      editUserSubmissionFormVisible: false,

      // 用户数据列表
      addusers: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: ""
      },

      // 表单验证的规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "change"
          }
        ]
      },

      // 给分页参数一个对象存值
      usersobj: {
        // 查询参数
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 5
      },

      // 总用户参数
      usertotal: 999,

      // 用户参数
      userlist: [],

      // 编辑权限存的数据
      editlist: {
        id: "",
        rid: "",
        username: ""
      },

      // 所有角色列表
      allRolesList: []
    };
  },

  methods: {
    // 编号
    indexMethod(index) {
      return index * 1 + 1;
    },

    // 改变每页显示条数
    handleSizeChange(val) {
      this.usersobj.pagesize = val;
      this.pagenum = 1;
      this.gouesrs();
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.usersobj.pagenum = val;
      this.gouesrs();
    },

    // 获取用户数据列表
    gouesrs() {
      if (this.usersobj.query != "") {
        this.usersobj.pagenum = 1;
      }
      users(this.usersobj).then(res => {
        this.usertotal = res.data.data.total;
        this.userlist = res.data.data.users;
      });
    },

    // 提交添加用户数据
    goaddusers(formName) {
      this.$refs[formName].validate(valid => {
        // 验证表单数据
        if (valid) {
          // 发送请求添加用户
          adduserss(this.addusers).then(res => {
            if (res.data.meta.status == 201) {
              this.dialogFormVisible = false;
              this.gouesrs();
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });

              // 清空输入框数据
              this.resetForm("addusers");
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 修改用户状态
    gomodifyUserStatus(val) {
      modifyUserStatus(val.id, val.mg_state).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 点击权限按钮
    handleAssignUserRoles(val) {
      this.assignUserRolesFormVisible = true;
      let rid;
      this.editlist.username = val.username;
      this.editlist.id = val.id;

      // 通过权限名字找到其id
      this.allRolesList.forEach(function(currentValue) {
        for (const key in currentValue) {
          if (currentValue[key] == val.role_name) {
            rid = currentValue.id;
          }
        }
      });
      this.editlist.rid = rid;
    },

    // 提交修改用户权限的信息
    goeditlist() {
      assignUserRoles(this.editlist).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
          // 获取用户数据列表
          this.gouesrs();
          this.assignUserRolesFormVisible = false;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 点击编辑按钮
    handleEditUserSubmission(val) {
      this.addusers.username = val.username;
      this.addusers.mobile = val.mobile;
      this.addusers.email = val.email;
      this.addusers.id = val.id;
      this.editUserSubmissionFormVisible = true;
    },

    // 编辑用户信息界面的清除按钮
    clear() {
      this.addusers.mobile = "";
      this.addusers.email = "";
    },

    // 彻底清除数据
    clearplus() {
      this.addusers.id = "";
      this.addusers.mobile = "";
      this.addusers.username = "";
      this.addusers.email = "";
    },

    // 提交编辑
    goeditUser() {
      editUserSubmission(this.addusers).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });

          // 清除数据
          this.clearplus();

          // 获取用户数据列表
          this.gouesrs();
          this.editUserSubmissionFormVisible = false;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 取消编辑
    cancelTheEditor() {
      // 清除数据
      this.clearplus();

      this.editUserSubmissionFormVisible = false;
    },

    // 点击删除按钮
    handleDelete(val) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSingleUser(val.id).then(res => {
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });

              // 获取用户数据列表
              this.gouesrs();
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
    // 获取用户数据列表
    this.gouesrs();

    // 获取所有角色列表
    listOfAllRoles().then(res => {
      this.allRolesList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.my_table {
  height: 50px;
  background-color: #e9e9e9;
  line-height: 40px;
  padding: 0 15px;
}

.clears {
  overflow-x: hidden;
}

.my_pagination {
  margin-top: 10px;
}
</style>