<template>
  <div class="question-container">
    <!-- 新增试题 -->
    <el-button type="primary" @click="onSubmit" icon="el-icon-plus">
       新增试题
    </el-button>
    
    <!-- 试题搜索 -->
    <el-card class="question-bank-search">
  <el-row :gutter="5">
      <el-form size='medium'
      ref='formInline'
       label-position="left"
       label-width='70px'
       :model="formInline" 
        class="demo-form-inline">



      <el-col :span="6">
        <el-form-item prop="enterprise" label="企业名称">
            <el-input v-model="formInline.enterprise" style="width:100%;min-width:170px;" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="6">
           <el-form-item prop="difficulty" label="难度">
              <el-select v-model="formInline.difficulty" style="width:100%;min-width:170px;" placeholder="请选择">
                  <el-option label="简单" value="1"></el-option>
                  <el-option label="一般" value="2"></el-option>
                  <el-option label="困难" value="3"></el-option>
              </el-select>
           </el-form-item>
      </el-col>

      <el-col :span="6">
           <el-form-item prop="questionType" label="试题类型">
              <el-select v-model="formInline.questionType" style="width:100%;min-width:170px;" placeholder="请选择">
                  <el-option label="单选" value="1"></el-option>
                  <el-option label="多选" value="2"></el-option>
                  <el-option label="简答" value="3"></el-option>
              </el-select>
           </el-form-item>
      </el-col>

      <el-col :span="6">
        <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 -->
           <el-form-item prop="tags" label="标签">
              <el-select v-model="formInline.tags" style="width:100%;min-width:170px;" placeholder="请选择">
                  <el-option label="javaScript" value="1"></el-option>
                  <el-option label="瑞雯" value="2"></el-option>
              </el-select>
           </el-form-item>
      </el-col>

      <el-col :span="6">
           <el-form-item prop="direction" label="方向">
              <el-select v-model="formInline.direction" style="width:100%;min-width:170px;" placeholder="请输入题目编号/题干">
                  <el-option label="o2o" value="1"></el-option>
                  <el-option label="外包服务" value="2"></el-option>
                  <el-option label="企业服务" value="3"></el-option>
                  <el-option label="互联网金融" value="4"></el-option>
                  <el-option label="企业咨询" value="5"></el-option>
                  <el-option label="互联网" value="6"></el-option>
                  <el-option label="电子商务" value="7"></el-option>
                  <el-option label="其他" value="8"></el-option>
              </el-select>
           </el-form-item>
      </el-col>
           <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 --> <!-- 未完成 -->
      <el-col :span="6">
           <el-form-item prop="keyword" label="关键字">
              <el-input v-model="formInline.keyword" style="width:100%;min-width:170px;" placeholder="请输入"></el-input>
           </el-form-item>
      </el-col>

      <el-col :span="6">
           <el-form-item prop="remarks" label="题目备注">
              <el-input v-model="formInline.remarks" style="width:100%;min-width:170px;" placeholder="请输入"></el-input>
           </el-form-item>
      </el-col>

      <el-col :span="6">
           <el-form-item prop="catalogID" label="目录">
              <el-select v-model="formInline.catalogID" style="width:100%;min-width:170px;" placeholder="请输入二级目录">
                  <el-option label="戏码得" value="shanghai"></el-option>
                  <el-option label="丽尔库" value="beijing"></el-option>
              </el-select>
           </el-form-item>
      </el-col>

      <el-col :span="6">
          <el-form-item prop="creatorID" label="录入人">
              <el-input v-model="formInline.creatorID" style="width:100%;min-width:170px;" placeholder="请输入"></el-input>
          </el-form-item>
      </el-col>

      <el-col :span="6">
         <el-form-item>
            <el-button style="width:30%; min-width:75px;"  @click="resetForm()">清除</el-button>
            <el-button style="width:30%; min-width:75px;" type="primary" @click="onSubmit">搜索</el-button>
         </el-form-item>
      </el-col>
   
           
      </el-form>
 </el-row>
    </el-card>
    <el-card>

     <el-table
     :data='tableData'
     >
       <el-table-column prop="id" label="序号">
         
       </el-table-column>
       <el-table-column prop="integer" label="试题编号">
        
       </el-table-column>
       <el-table-column prop="questionType" label="题型">
          
       </el-table-column>
       <el-table-column label="题干">
         <span>1</span>
       </el-table-column>
       <el-table-column label="录入时间">
         <span>1</span>
       </el-table-column>
       <el-table-column label="难度">
         <span>1</span>
       </el-table-column>
       <el-table-column label="使用次数">
         <span>1</span>
       </el-table-column>
       <el-table-column label="录入人">
         <span>1</span>
       </el-table-column>
       <el-table-column label="状态">
         <span>1</span>
       </el-table-column>
       <el-table-column label="操作">
         <span>1</span>
       </el-table-column>
     </el-table>

    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[
          {id:1,integer:'cc',questionType:2,}
          ],

        formInline:{

          enterprise:'',  //企业名称
          difficulty:'', //难度
          questionType:'', //试题类型
          tags:'',  //标签
          direction:[], //方向
          keyword:'', //关键字
          remarks:'', //题目备注
          catalogID:'', //目录
          creatorID:'' // 录入人
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      // 重置搜索框
      resetForm(){
        this.$refs.formInline.resetFields()
      }
    }
  }
</script>

<style scoped>
.question-container{
  margin: 10px 20px;
}
.question-bank-search{
  margin: 15px 0;
}

</style>