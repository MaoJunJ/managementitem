<template>
  <div>
    <el-row>
      <el-col :span="4">
        <hr style="visibility: hidden;" />
      </el-col>
      <el-col :span="12">
        <el-alert
          class="my_alert"
          title="添加商品"
          type="info"
          description="请按步骤完成添加商品"
          show-icon
          center
          :closable="false"
        ></el-alert>
      </el-col>
      <el-col :span="4">
        <el-button
          class="my_button"
          icon="el-icon-refresh-left"
          circle
          title="返回"
          style="background-color: #f4f4f5;"
          @click="$router.push('/goodslist')"
        ></el-button>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>

    <div class="steps">
      <el-steps :active="this.step" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品介绍"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-tabs tab-position="left" class="tabs" v-model="step">
        <el-tab-pane label="基本信息" name="0">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm my_form">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>

            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                class="my_cascader"
                placeholder="请选择商品分类"
                expand-trigger="hover"
                v-model="ruleForm.val"
                :options="commodityListTwo"
                :props="{ label: 'cat_name',value: 'cat_id',checkStrictly: true}"
                separator=" - "
                clearable
              ></el-cascader>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="nextForm('ruleForm')">下一步</el-button>
              <el-button type="danger" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品介绍" name="1">商品介绍</el-tab-pane>
        <el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <div class="tabs">
            <el-button type="primary" @click="nextForm('ruleForm')">下一步</el-button>
            <el-button type="danger" plain @click="resetForm('ruleForm')">重置</el-button>
          </div>

          <!-- 预览框 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <div class="my_editor">
            <quillEditor style=" height: 300px;"></quillEditor>
          </div>
          <el-button type="primary" @click="nextForm('ruleForm')">下一步</el-button>
          <el-button type="danger" plain @click="resetForm('ruleForm')">重置</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },

  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      // 步骤条保存步骤
      step: "0",

      // 商品基本信息数组
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: "",
        val: []
      },

      // 表单验证规则
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请输入商品分类", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.my_alert {
  width: 500px;
  margin: 10px auto;
}
.my_button {
  width: 50px;
  height: 50px;
  margin: 10px auto;
  font-size: 20px;
}
.alert {
  padding: 0 15px;
}
.steps {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 0;
}
.tabs {
  margin-top: 20px;
}
.my_form {
  padding: 0 20%;
}
.my_cascader {
  width: 300px;
  display: block;
}
.my_editor {
  height: 400px;
  width: 1000px;
}
</style>