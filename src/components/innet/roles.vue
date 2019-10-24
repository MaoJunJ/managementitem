<template>
  <div>
    <!-- 导入面包屑导航 -->
    <crumbs one="权限管理" two="角色列表"></crumbs>

    <!-- 导入新增按钮 -->
    <el-row class="my_row">
      <el-button icon="el-icon-plus" circle @click="addingRolesFormVisible=true"></el-button>
    </el-row>

    <!-- 导入表格 -->
    <el-table :data="rolesList" style="width: 100%" stripe border>
      <!-- 表格下拉数据 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 分配权限判断 -->
          <p v-if="props.row.children.length==0" class="my_p">
            <el-tag effect="dark " disable-transitions type="danger">没有权限</el-tag>
          </p>

          <!-- 第一层 -->
          <el-row v-for="(temp, index) in props.row.children" :key="index">
            <el-col :span="3">
              <el-tag
                effect="dark "
                closable
                disable-transitions
                type="success"
                @close="deletes(props.row.id,temp.id,props.row)"
              >{{temp.authName}} {{temp.id}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>

            <!-- 第二层 -->
            <el-col :span="21">
              <el-row v-for="(temps, index) in temp.children" :key="index">
                <el-col :span="4">
                  <el-tag
                    effect="dark "
                    closable
                    disable-transitions
                    type="type"
                    @close="deletes(props.row.id,temps.id,props.row)"
                  >{{temps.authName}} {{temps.id}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>

                <!-- 第三层 -->
                <el-col :span="20">
                  <el-tag
                    effect="dark "
                    class="my_tag"
                    v-for="(tempss, index) in temps.children"
                    :key="index"
                    closable
                    disable-transitions
                    type="warning"
                    @close="deletes(props.row.id,tempss.id,props.row)"
                  >{{tempss.authName}} {{tempss.id}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
        label="角色名称"
        prop="roleName"
        width="400"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        label="角色描述"
        prop="roleDesc"
        width="400"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column label="ID" prop="id" header-align="center" align="center"></el-table-column>

      <!-- 自定义模板列表 -->
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            icon="el-icon-s-operation"
            circle
            @click="powerAndResponsibilityDivision(scope.row)"
            title="权限分配"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editingTheRoles(scope.row)"
            title="编辑角色"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteTheRoles(scope.row)"
            title="删除角色"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色提交对话框 -->
    <el-dialog title="添加角色" :visible.sync="addingRolesFormVisible" center width="30%">
      <el-form :model="addingRolesList" :rules="rules" ref="addingRoles">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="addingRolesList.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="addingRolesList.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addingRoless('addingRoles')">确 定</el-button>
        <el-button @click="clear()">取 消</el-button>
        <el-button @click="resetForm('addingRoles')">重 置</el-button>
      </div>
    </el-dialog>

    <!-- 权限分配对话框 -->
    <el-dialog
      title="权限分配"
      :visible.sync="powerAndResponsibilityDivisionFormVisible"
      center
      width="22%"
    >
      <!-- 树形列表 -->
      <el-tree
        :data="datas"
        node-key="id"
        ref="tree"
        highlight-current
        check-on-click-node
        show-checkbox
        :default-expand-all="true"
        icon-class="el-icon-caret-right"
        indent="50"
        :props="defaultProps"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="gopowerAndResponsibility()">确 定</el-button>
        <el-button @click="powerAndResponsibilityDivisionFormVisible = false">取 消</el-button>
        <el-button @click="resetChecked" type="danger">清 空</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editingTheRoleFormVisible" center width="30%">
      <el-form :model="addingRolesList" :rules="rules" ref="editingTheRole">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="addingRolesList.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="addingRolesList.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goeditingTheRole('editingTheRole')">确 定</el-button>
        <el-button @click="clear()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入各种方法
import {
  listOfAllRoles,
  deletesRolespecifiedPermissions,
  addingRoles,
  editingTheRole,
  deleteTheRole,
  listOfAllPermissions,
  roleAuthorization
} from "../../http/http";

export default {
  data() {
    return {
      // 添加角色对话框
      addingRolesFormVisible: false,
      powerAndResponsibilityDivisionFormVisible: false,
      editingTheRoleFormVisible: false,

      // 角色列表清单
      rolesList: [],

      // 添加角色清单
      addingRolesList: {
        roleName: "",
        roleDesc: "",
        id: ""
      },

      // 表单验证的规则
      rules: {
        roleName: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ]
      },

      // 树形角色列表清单
      datas: [],

      defaultProps: {
        children: "children",
        label: "authName"
      },

      // 存其id值
      id: ""
    };
  },

  methods: {
    // 编号
    indexMethod(index) {
      return index * 1 + 1;
    },

    // 删除角色指定权限
    deletes(roleId, rightId, val) {
      deletesRolespecifiedPermissions(roleId, rightId).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });

          // data.data里会返回剩余的权限
          val.children = res.data.data;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 清除之前填的数据
    clear() {
      this.addingRolesList.roleName = "";
      this.addingRolesList.roleDesc = "";
      this.addingRolesList.id = "";
      this.addingRolesFormVisible = false;
      this.editingTheRoleFormVisible = false;
    },

    // 添加角色
    addingRoless(formName) {
      this.$refs[formName].validate(valid => {
        // 验证表单数据
        if (valid) {
          addingRoles(this.addingRolesList).then(res => {
            if (res.data.meta.status == 201) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });
              this.clear();
              this.listOfAllRoless();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 请求角色列表
    listOfAllRoless() {
      listOfAllRoles().then(res => {
        this.rolesList = res.data.data;
      });
    },

    // 点击编辑角色框
    editingTheRoles(val) {
      this.addingRolesList.id = val.id;
      this.addingRolesList.roleName = val.roleName;
      this.addingRolesList.roleDesc = val.roleDesc;
      this.editingTheRoleFormVisible = true;
    },

    // 提交编辑角色框
    goeditingTheRole(formName) {
      this.$refs[formName].validate(valid => {
        // 验证表单数据
        if (valid) {
          editingTheRole(this.addingRolesList).then(res => {
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });
              this.clear();
              this.listOfAllRoless();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },

    // 点击权限分配框
    powerAndResponsibilityDivision(val) {
      this.id = val.id;
      let list = [];

      this.powerAndResponsibilityDivisionFormVisible = true;

      // 递归找到最后一个数组里的id
      function recursion(temp) {
        if (temp.children) {
          for (let i = 0; i < temp.children.length; i++) {
            recursion(temp.children[i]);
          }
        } else {
          list.push(temp.id);
        }
      }
      recursion(val);

      // 下一次dom更新调用，它相当于就是setTimeout，只不过它的执行时机是下一次dom更新后才调用
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(list);
      });
    },

    // 清空所有角色权限
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    // 删除角色
    deleteTheRoles(val) {
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTheRole(val.id).then(res => {
            if (res.data.meta.status == 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success"
              });

              // 请求角色列表
              this.listOfAllRoless();
            }
          });
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 提交分配权限id信息
    gopowerAndResponsibility() {
      let newstr = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()
      ].join();
      roleAuthorization(this.id, newstr).then(res => {
        if (res.data.meta.status == 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
          // 获取树形角色列表
          this.listOfAllRoless();
          this.powerAndResponsibilityDivisionFormVisible = false;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 获取树形角色列表
    listOfAllPermissionss() {
      listOfAllPermissions("tree").then(res => {
        this.datas = res.data.data;
      });
    }
  },

  created() {
    // 一进来请求角色列表
    this.listOfAllRoless();

    // 一进来获取树形角色列表
    this.listOfAllPermissionss();
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
.my_tag {
  margin-right: 15px;
  margin-bottom: 15px;
}
.my_p {
  text-align: center;
}
</style>