<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 上 -->
      <el-card>
        <el-form :inline="true">
          <!-- 目录 -->
          <el-form-item label="目录名称">
            <el-select style="margin-right:10px;" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in 4"
                :key="item"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 状态 -->
          <el-form-item label="状态">
            <el-select></el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button style="width:90px;margin:0 10px;">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width:90px" type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 下 -->
      <el-card class="underCard">
        <!-- <el-row slot="header"></el-row> -->
        <el-table :data="listCatalog" style="width: 100%">
          <el-table-column  prop="id" label="序号" ></el-table-column>
          <el-table-column  prop="directoryName" label="目录名称" ></el-table-column>
          <el-table-column  prop="creator" label="创建者" ></el-table-column>
          <el-table-column  prop="addDate" label="创建日期" ></el-table-column>
          <el-table-column  prop="totals" label="面试题数量" ></el-table-column>
          <el-table-column :formatter='statesTab' prop="state"  label="状态" >
          </el-table-column>
          <el-table-column   label="操作" >
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
      listCatalog:[] ,//目录列表,
    }
  },
  methods: {
    statesTab(row,column,cellValue,index){
      console.log(row);
      return row.state===1? '开启': '屏蔽'
      
    }
  },
  created() {
    list().then(res => {
      console.log(res);
      this.listCatalog = res.data.items.reverse()
    });
  }
};
</script>

<style lang='less' scoped>
// .pagination{
//   // height: 80px;
// }
.underCard{
  margin-top: 20px;
}
</style>
