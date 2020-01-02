<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 上 -->
      <el-card>
        <!-- 按钮 -->
        <el-row slot="header">
          <el-button @click="openDialog" class="buttons" type="primary">新增目录</el-button>
          <el-button type="primary">返回学科</el-button>
        </el-row>
        <el-form style="margin-top:20px">
          <el-form-item label="目录名称" label-width="100px">
            <el-input style="width:230px;margin-right:10px"></el-input>
            <el-button>清除</el-button>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 下 -->
      <el-card class="underCard">
        <!-- <el-row slot="header"></el-row> -->
        <el-table :data="listCatalog" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="directoryName" label="目录名称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="addDate" label="创建日期"></el-table-column>
          <el-table-column prop="totals" label="面试题数量"></el-table-column>
          <el-table-column :formatter="statesTab" prop="state" label="状态"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="obj">
              <span>
                <el-button type="text" size="small">修改</el-button>
                <el-button
                  @click="editState(obj.row)"
                  type="text"
                  size="small"
                >{{obj.row.state===1? '禁用': '开启'}}</el-button>
                <el-button @click="removeDirec(obj.row)" type="text" size="small">删除</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-row type="flex" style="height:80px" justify="center" align="middle">
          <el-pagination
            class="pagination"
            layout=" prev, pager, next, sizes,jumper"
            background
            :total="100"
          ></el-pagination>
        </el-row>
      </el-card>
      <!-- 对话框 -->
      <el-dialog @close="closeDialog" :visible="diaLog">
        <el-form style="margin-left:50px" label-width="100px">
          <el-form-item label="目录名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="学科">
            <el-select v-model="subjectList.id">
              <el-option
                v-for="item in subjectList"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-button type="primary">确定</el-button>
              <el-button>取消</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  list as listDirectorys,
  update,
  removeState,
  remove
} from "../../api/hmmm/directorys";
import { list as listSubjects } from "../../api/hmmm/subjects";
import { log } from "util";
export default {
  data() {
    return {
      listCatalog: [], //目录列表,
      diaLog: false, // 对话框
      subjectList: [] // 学科目录
    };
  },
  methods: {
    // 删除
    removeDirec(row) {
      console.log(row);
      let { id } = row;
      this.$confirm("是否删除").then(() => {
        remove({ id }).then(res => {
          console.log(1);
          this.get()
        });
      });
    },
    // 修改目录
    // editDirec(row){
    //   let {id} = row
    //   this.openDialog()
    //   update({id}).then(()=>{
    //     console.log(1)
    //   })
    // },
    // 学科列表
    subject() {
      listSubjects().then(res => {
        // console.log(res.data);
        this.subjectList = res.data.items;
      });
    },
    // 打开对话框
    openDialog() {
      this.diaLog = true;
      this.subject();
    },
    // 关闭对话框
    closeDialog() {
      this.diaLog = false;
    },
    // 修改状态
    editState(row) {
      //  console.log(row);
      let { id, state } = row;
      //  console.log(id,state);

      removeState({ id, state }).then(res => {
        console.log(res);
      });
    },

    // 状态设置方法
    statesTab(row, column, cellValue, index) {
      // console.log(row);
      return row.state === 1 ? "启用" : "禁用";
    },

    get() {
      // 获取表格列表
      listDirectorys().then(res => {
        // console.log(res.data.items);
        this.listCatalog = res.data.items;
      });
    }
  },
  created() {
    this.get();
  }
};
</script>

<style lang='less' scoped>
// .pagination{
//   // height: 80px;
// }
.underCard {
  margin-top: 20px;
}
.buttons {
  text-align: center;
}
</style>
