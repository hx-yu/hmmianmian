<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 上 -->
      <el-card>
        <!-- 按钮 -->
        <el-row slot="header">
          <el-button class="buttons" type="primary">新增目录</el-button>
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
            <span>
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">禁用</el-button>
              <el-button type="text" size="small">删除</el-button>
            </span>
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
    </div>
  </div>
</template>

<script>
import { list } from "../../api/hmmm/directorys";
import { log } from "util";
export default {
  data() {
    return {
      listCatalog: [] //目录列表,
    };
  },
  methods: {
    // 状态设置方法
    statesTab(row, column, cellValue, index) {
      // console.log(row);
      return row.state === 1 ? "开启" : "屏蔽";
    }
  },
  created() {
    // 获取表格列表
    list().then(res => {
      console.log(res);
      this.listCatalog = res.data.items.reverse();
    });
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
