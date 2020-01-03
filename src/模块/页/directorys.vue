<template>
  <div>
    <!-- 上 -->
    <el-card>
      <!-- 按钮 -->
      <el-row slot="header">
        <el-button @click="visibleState = true" class="buttons" type="primary">新增目录</el-button>
        <el-button type="primary">返回学科</el-button>
      </el-row>

      <el-form inline style="margin-top:20px" :data="seachForm">
        <el-form-item label="目录名称" label-width="100px" prop="directoryName">
          <el-input v-model="seachForm.directoryName" style="width:230px;margin-right:10px"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="seachForm.state">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear">清除</el-button>
          <el-button @click="seachDirectory" type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下 -->
    <el-card class="underCard">
      <!-- <el-row slot="header"></el-row> -->
      <el-table :data="listCatalog" style="width: 100%">
        <el-table-column align="center" prop="id" label="序号"></el-table-column>
        <el-table-column align="center" prop="directoryName" label="目录名称"></el-table-column>
        <el-table-column align="center" prop="username" label="创建者"></el-table-column>
        <el-table-column align="center" prop="addDate" label="创建日期">
          <template slot-scope="obj">
            {{obj.row.addDate | parseTimeByString}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="totals" label="面试题数量"></el-table-column>
        <el-table-column align="center" :formatter="statesTab" prop="state" label="状态"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="obj">
            <!-- {{obj.row}} -->
            <el-button @click="visibleChange(obj.row.id)" type="text" size="small">修改</el-button>
            <el-button
              @click="stateChanges(obj.row)"
              type="text"
              size="small"
            >{{ obj.row.state===1? '禁用' :'启用' }}</el-button>
            <el-button @click="delDirectory(obj.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 对话框 -->
      <el-dialog :show-close="false" :visible="visibleState">
        <el-form label-width="100px" :model="formData" :rules="rules" ref="meForm">
          <el-form-item label="目录名称" prop="directoryName">
            <el-input style="width:50%" v-model="formData.directoryName"></el-input>
          </el-form-item>
          <el-form-item label="学科" prop="subjectID">
            <el-select style="width:50%" v-model="formData.subjectID">
              <el-option
                v-for="item in subjectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-row type="flex" justify="end">
            <el-button @click="diaLogTest" type="primary">确定</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 分页 -->
      <el-row type="flex" style="height:80px" justify="end" align="middle">
        <el-pagination
          class="pagination"
          layout=" prev, pager, next"
          background
          :total="pages.total"
          :current-page="pages.currentPage"
          :page-size="pages.pageSize"
          @current-change="pageChange"
        ></el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { parseTimeByString } from '../../filters/index'
import {
  list as directorList,
  add,
  remove,
  removeState,
  update,
  detail
} from "../../api/hmmm/directorys";
import { status } from "../../api/hmmm/constants";
import { simple } from "../../api/hmmm/subjects";
export default {
  data() {
    return {
      directId: null,
      rules: {
        // 表单规则对象
        directoryName: [
          { required: true, message: "目录名称不能为空", trigger: "blur" }
        ],
        subjectID: [
          { required: true, message: "学科不能为空", trigger: "blur" }
        ]
      },
      formData: {
        //表单对象
        directoryName: "",
        subjectID: null
      },
      subjectList: [], //学科列表
      visibleState: false, //对话框
      listCatalog: [], //目录列表,
      seachForm: {
        directoryName: "", //目录名称
        state: null
      },
      // 分页对象
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      status //状态
    };
  },
  methods: {
    // 切换状态
    stateChanges(row) {
      this.$confirm("是否切换状态").then(() => {
        removeState({
          id: row.id,
          state: row.state === 1 ? 0 : 1 // 1 ->启用 0->禁用  如果当前状态是启用就禁用 是禁用就启用
        }).then(res => {
          // console.log(res.data);
          this.getDirectoy(this.seachForm); //带搜索条件
        });
      });
    },
    // 分页切换、
    pageChange(newPage) {
      this.pages.currentPage = newPage;
      this.getDirectoy(this.seachForm); //带搜索条件
    },
    // 点击删除
    delDirectory(row) {
      this.$confirm("是否删除").then(() => {
        remove({ id: row.id }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getDirectoy(this.seachForm);
        });
      });
    },
    // 点击取消
    cancel() {
      this.visibleState = false;
      // 清空输入框
      this.formData = {
        //表单对象
        directoryName: "",
        subjectID: null
      };
    },
    // 修改目录
    visibleChange(id) {
      this.directId = id;
      this.visibleState = true;
      detail({ id }).then(res => {
        this.formData = res.data;
        console.log(res.data);
      });
    },
    // 对话框表单校验 /新增 修改
    diaLogTest() {
      // console.log(this.$refs.meForm);
      this.$refs.meForm.validate().then(() => {
        // 调用新增/修改接口 判断是否有id
        if (this.formData.id) {
          update(this.formData).then(res => {
            this.getTips();
          });
        } else {
          add(this.formData).then(res => {
            this.getTips();
          });
        }
        this.visibleState = false; //关闭对话框
      });
    },
    getTips() {
      this.$message({
        type: "success",
        message: "操作成功"
      });
      // 清空dialog的输入框
      this.formData = {
        //dialog表单对象
        directoryName: "",
        subjectID: null
      };
      this.getDirectoy();
    },
    // 获取学科
    getSubject() {
      simple().then(res => {
        this.subjectList = res.data;
      });
    },
    // 清除搜索框
    clear() {
      this.seachForm = {
        directoryName: "", //目录名称
        state: null
      };
      this.seachDirectory();
    },
    // 搜索
    seachDirectory() {
      this.pages.currentPage = 1;
      this.getDirectoy(this.seachForm);
    },
    // 状态设置方法
    statesTab(row, column, cellValue, index) {
      // console.log(row);
      return row.state === 1 ? "启用" : "禁用";
    },
    // 获取目录列表
    getDirectoy(data) {
      directorList({
        page: this.pages.currentPage,
        pagesize: this.pages.pagesize,
        ...data
      }).then(res => {
        // console.log(res);
        this.pages.total = res.data.counts;
        this.listCatalog = res.data.items;
      });
    }
  },
  created() {
    this.getDirectoy();
    this.getSubject(); //获取学科
  }
};
</script>

<style lang='less' scoped>
.underCard {
  margin-top: 20px;
}
.buttons {
  text-align: center;
}
</style>
