<template>
  <div class="dashboard-container">
    <div class="app-container">题库-试题录入</div>
    <el-card>
      <!-- 表单区域 -->
      <el-form>
        <!-- 学科 -->
        <el-form-item label="学科">
          <el-select style="width:30%;" v-model="subject">
            <el-option v-for="(item,index) in subjects" :key="index" :value="item.id" :label="item.subjectName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录">
          <el-select style="width:30%;" v-model="catalog">
            <el-option v-for="(item,index) in catalogs" :key="index" :value="item.id" :label="item.directoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select style="width:30%;" v-model="company">
            <el-option v-for="(item,index) in companys" :key="index" :value="item.id" :label="item.company"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select style="width:14%;" v-model="city">
            <el-option v-for="(item,index) in provinces" :key="index" :value="item" :label="item"></el-option>
          </el-select>
          <el-select style="width:14%;margin-left:20px;" v-model="area">
            <el-option v-for="(item,index) in region" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向">
          <el-select style="width:30%;" v-model="direction">
            <el-option v-for="(item,index) in directions" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-radio-group v-model="questionType" @change="questionTypeChange">
            <el-radio
              v-for="(item,index) in questionTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题型">
          <el-radio-group v-model="level" @change="levelChange">
            <el-radio
              v-for="(item,index) in levels"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题干">
          <quill-editor v-model="questionStem" style="margin-top:40px;height:300px;width:95%;"></quill-editor>
        </el-form-item>
        <!-- 单选选项 -->
        <el-form-item v-if="questionType==='单选'" label="选项" style="margin-top:120px;">
          <el-col>
            <el-radio-group v-model="singleChoice" @change="radioChange">
              <el-row type="flex" align="middle" style="margin-bottom:20px;">
                <el-radio label="A">A</el-radio>
                <el-input style="width:60%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
              <el-row type="flex" align="middle" style="margin-bottom:20px;">
                <el-radio label="B">B</el-radio>
                <el-input style="width:60%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
              <el-row type="flex" align="middle" style="margin-bottom:20px;">
                <el-radio label="C">C</el-radio>
                <el-input style="width:60%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
              <el-row type="flex" align="middle" style="margin-bottom:20px;">
                <el-radio label="D">D</el-radio>
                <el-input style="width:60%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
            </el-radio-group>
          </el-col>
          <el-col>
            <el-button type="warning">
              <i class="el-icon-plus"></i>
              <span>增加选项和答案</span>
            </el-button>
          </el-col>
        </el-form-item>
        <!-- 多选选项 -->
        <el-form-item v-if="questionType==='多选'" label="选项" style="margin-top:120px;">
          <el-col>
            <el-checkbox-group v-model="multipleChoice" @change="checkboxChange">
              <el-row type="flex" align="middle">
                <el-checkbox label="A">A</el-checkbox>
                <el-input style="width:30%;margin-left:3%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
              <el-row type="flex" align="middle">
                <el-checkbox label="B">B</el-checkbox>
                <el-input style="width:30%;margin-left:3%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
              <el-row type="flex" align="middle">
                <el-checkbox label="C">C</el-checkbox>
                <el-input style="width:30%;margin-left:3%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
              <el-row type="flex" align="middle">
                <el-checkbox label="D">D</el-checkbox>
                <el-input style="width:30%;margin-left:3%;"></el-input>
                <el-upload action="" :show-file-list="false">
                  <img style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;" src="../../assets/404_images/404_cloud.png" alt />
                </el-upload>
              </el-row>
            </el-checkbox-group>
          </el-col>
          <el-col>
            <el-button type="warning">
              <i class="el-icon-plus"></i>
              <span>增加选项和答案</span>
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="【解析视频】" style="margin-top:100px;">
          <el-upload action="" :show-file-list="false" :http-request="uploadVideo">
            <el-button type="primary">上传视频</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="答案解析：">
          <quill-editor v-model="answer" style="width:95%;height:200px;margin-top:50px;"></quill-editor>
        </el-form-item>
        <el-form-item label="题目备注" style="margin-top:100px;">
          <el-input v-model="remark" type="textarea" style="width:95%;" rows="5"></el-input>
        </el-form-item>
        <el-form-item label="试题标签">
          <el-input v-model="tag" placeholder="请输入" style="width:95%;"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" style="height:60px" align="middle">
        <el-button @click="submit" type="primary" style="width:100px;">提交</el-button>
        <el-button style="width:100px;">取消</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 题型、难度
import { difficulty, questionType, direction } from "../../api/hmmm/constants";
// 学科列表
import { list as subjects } from "../../api/hmmm/subjects";
// 目录列表
import { list as directorys } from "../../api/hmmm/directorys";
// 企业列表
import { list as companys } from "../../api/hmmm/companys";
// 城市、地区列表
import { provinces, citys } from "../../api/hmmm/citys";
// 添加试题
import { batch } from "../../api/hmmm/questions"
export default {
  name: "QuestionsNew",
  data() {
    return {
      // 学科列表
      subjects: [],
      subject: "",
      // 目录列表
      catalogs: [],
      catalog: "",
      // 企业列表
      companys: [],
      company: "",
      // 城市列表
      provinces: [],
      // 选择城市
      city: "",
      // 地区列表
      region: [],
      // 地区选择
      area: "",
      // 方向列表
      directions: direction,
      direction: "",
      // 题型选项
      questionTypes: questionType,
      questionType: "1",
      // 难易度选项
      levels: difficulty,
      level: 1,
      // 题干
      questionStem: "",
      // 单选选项
      singleChoice: "A",
      // 多选选项
      multipleChoice: ["A"],
      // 选项标题
      title:'',
      // 视频解析
      videoURL:'',
      // 答案解析
      answer:'',
      // 题目备注
      remark:'',
      // 试题标签
      tag:''
    };
  },
  methods: {
    // 获取学科列表
    async getList() {
      let result = await subjects();
      this.subjects = result.data.items;
    },
    // 获取目录列表
    async getListCata(){
      let result = await directorys();
      this.catalogs=result.data.items
    },
    // 获取企业列表
    async getCompany(){
      let result = await companys();
      this.companys = result.data.items
    },
    // 获取城市列表
    async getCity() {
      this.provinces = await provinces();
    },
    // 获取地区列表
    async getRegion(area) {
      this.region = await citys(area); 
    },
    // 题型改变
    questionTypeChange() {
      alert(this.questionType);
    },
    // 难易度改变
    levelChange() {
      alert(this.level);
    },
    // 题型单选框改变
    radioChange(){
      alert(this.singleChoice)
    },
    // 题型多选框改变
    checkboxChange(){
      alert(this.multipleChoice)
    },
    // 上传视频
    uploadVideo(params){
      console.log(params);
      this.videoURL = params.file.name;
    },
    // 提交事件
    async submit(){
      let data = {
        subjectID : this.subject,
        catalogID : this.catalog,
        enterpriseID : this.company,
        province : this.city,
        city : this.area,
        direction : this.direction,
        questionType : this.questionType,
        difficulty : this.level,
        question : this.questionStem,
        options :{
          code :'',
          title :'',
          img :'',
          isRight :true
        },
        videoURL : this.videoURL,        
        answer : this.answer,
        remarks : this.remark,
        tags : this.tag,
        isPerfect : true
      }
      await batch(data)
      this.$message({
        type:'success',
        message:'录入成功'
      })
    }
  },
  created() {
    this.getList();
    this.getListCata();
    this.getCompany();
    this.getCity();
    this.getRegion();
  },
  watch: {
    'city': function(newValue, oldValue) {
      this.getRegion(newValue)
    }
  }
};
</script>

<style lang="less" scoped>
.dashboard-container {
  .el-card {
    margin: 0 10px;
    padding: 20px 20px;
  }
}
</style>
