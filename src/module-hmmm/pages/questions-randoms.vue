<template>
  <!-- <div class="dashboard-container">
    <div class="app-container">组题列表111</div>
  </div> -->
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
      <el-button type="text">删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import {randoms} from '../../api/hmmm/questions'
export default {
  name: 'QuestionsRandoms',
  data() {
    return {
      tableData:[],//接收列表信息
      pageLit:{  
        counst:0,//总记录数
        pageSize:10,//每页数量
        pages:0,//总页数
        page:1,//当前页码 
      }
    }
  },
  methods:{
  async getPageMessage(){
    let result = await randoms()
    console.log(result);
    
    result.data.items.forEach((item,index) => {
      // console.log(item);
      item.progressOfAnswer=item.progressOfAnswer+"%"
      item.accuracyRate=item.accuracyRate+"%"
      console.log(item);
    });
    this.tableData=result.data.items
    this.tableData
    }
  },
  created(){ 
    this.getPageMessage()
    },
  }

</script>

<style scoped lang='less'>
</style>
