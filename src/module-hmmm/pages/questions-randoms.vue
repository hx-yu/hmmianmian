<template>
  <!-- <div class="dashboard-container">
    <div class="app-container">组题列表111</div>
  </div> -->
  <el-card>
      <el-table border :data="tableData">
        <el-table-column align='center' width="50px" type="index" label="序号"></el-table-column>
        <el-table-column align='center' prop="addTime" label="组题时间"></el-table-column>
        <el-table-column align='center' width="100px" prop="userName" label="用户名"></el-table-column>
        <el-table-column align='center' width="180px" prop="id" label="试题ID"></el-table-column>
        <el-table-column align='center' prop="progressOfAnswer" label="答题进度"></el-table-column>
        <el-table-column align='center' prop="accuracyRate" label="正确率"></el-table-column>
        <el-table-column align='center' prop="totalSeconds" label="答题总耗时（秒）"></el-table-column>
        <el-table-column align='center' prop="questionType" label="组题类型/详情"></el-table-column>
        <el-table-column align='center' label="操作">
          <el-button type="text" @click="removeRandom">删除</el-button>
        </el-table-column>
      </el-table >
      <el-row  
          style="height:100px;"
          type="flex"
          justify="center"
          align="middle">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="pageList.counts"  
              :page-count="pageList.pages"
              :page-size="pageList.pageSize"
              :current-page="pageList.page">
          </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
import {randoms,removeRandoms} from '../../api/hmmm/questions'
export default {
  name: 'QuestionsRandoms',
  data() {
    return {
      tableData:[],//接收列表信息
      pageList:{  
        counts:0,//总记录数
        pageSize:10,//每页数量
        pages:0,//总页数
        page:1,//当前页码 
      }
    }
  },
  methods:{
  async getPageMessage(){
    let result = await randoms()
    // console.log(result);
    result.data.items.forEach((item,index) => {
      // console.log(item);
      item.progressOfAnswer=item.progressOfAnswer+"%"
      item.accuracyRate=item.accuracyRate+"%"
      // console.log(item);
    });
    this.tableData=result.data.items
    this.pageList.counts=result.data.counts
    this.pageList.pagesize=result.data.pagesize
    this.pageList.pages=result.data.pages
    // this.pageList.page=result.data.pages
    },
    async removeRandom(){
      await this.$confirm("您确认要删除吗")
      await removeRandoms(this.tableData)
         this.$message({
           type:"success",
           message:"删除成功"
         })


    }
  },
  created(){ 
    this.getPageMessage()
    },
  }

</script>

<style scoped lang='less'>

</style>
