<template>
  <div class="dashboard-container">
    <div class="app-container">题库-试题录入</div>
    <el-card>
      <!-- 表单区域 -->
      <el-form :model="dataForm" :rules="dataRules" ref="myform">
        <!-- 学科 -->
        <el-form-item prop="subject" label="学科">
          <el-select style="width:30%;" v-model="dataForm.subject">
            <el-option
              v-for="(item,index) in dataForm.subjects"
              :key="index"
              :value="item.id"
              :label="item.subjectName"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 目录 -->
        <el-form-item prop="catalog" label="目录">
          <el-select style="width:30%;" v-model="dataForm.catalog">
            <el-option
              v-for="(item,index) in dataForm.catalogs"
              :key="index"
              :value="item.id"
              :label="item.directoryName"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 企业 -->
        <el-form-item prop="company" label="企业">
          <el-select style="width:30%;" v-model="dataForm.company">
            <el-option
              v-for="(item,index) in dataForm.companys"
              :key="index"
              :value="item.id"
              :label="item.company"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 省会和城市 -->
        <el-form-item prop="city" label="城市">
          <el-select style="width:14%;" v-model="dataForm.city">
            <el-option
              v-for="(item,index) in dataForm.provinces"
              :key="index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
          <el-select style="width:14%;margin-left:20px;" v-model="dataForm.area">
            <el-option
              v-for="(item,index) in dataForm.region"
              :key="index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 方向 -->
        <el-form-item prop="direction" label="方向">
          <el-select style="width:30%;" v-model="dataForm.direction">
            <el-option
              v-for="(item,index) in dataForm.directions"
              :key="index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 题型 -->
        <el-form-item prop="questionType" label="题型">
          <el-radio-group v-model="dataForm.questionType">
            <el-radio
              v-for="(item,index) in dataForm.questionTypes"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 难易度 -->
        <el-form-item prop="level" label="题型">
          <el-radio-group v-model="dataForm.level">
            <el-radio
              v-for="(item,index) in dataForm.levels"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 题干 -->
        <el-form-item prop="questionStem" label="题干">
          <quill-editor
            v-model="dataForm.questionStem"
            style="margin-top:40px;height:300px;width:95%;"
          ></quill-editor>
        </el-form-item>
        <!-- 单选选项 -->
        <el-form-item
          prop="singleChoice"
          v-if="dataForm.questionType==='单选'"
          label="选项"
          style="margin-top:120px;"
        >
          <el-col>
            <el-radio-group v-model="dataForm.singleChoice" @change="radioChange">
              <el-row
                v-for="(item,index) in startArray"
                :key="index"
                type="flex"
                align="middle"
                style="margin-bottom:20px;"
              >
                <el-radio :label="item">{{item}}</el-radio>
                <el-input style="width:60%;"></el-input>
                <el-upload action :show-file-list="false">
                  <img
                    style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;"
                    src="../../assets/404_images/404_cloud.png"
                    alt
                  />
                </el-upload>
              </el-row>
            </el-radio-group>
          </el-col>
          <el-col>
            <el-button type="warning" @click="addSelect">
              <i class="el-icon-plus"></i>
              <span>增加选项和答案</span>
            </el-button>
          </el-col>
        </el-form-item>
        <!-- 多选选项 -->
        <el-form-item
          prop="multipleChoice"
          v-if="dataForm.questionType==='多选'"
          label="选项"
          style="margin-top:120px;"
        >
          <el-col>
            <el-checkbox-group v-model="dataForm.multipleChoice" @change="checkboxChange">
              <el-row v-for="(item,index) in startArray" :key="index" type="flex" align="middle">
                <el-checkbox :label="item">{{item}}</el-checkbox>
                <el-input style="width:30%;margin-left:3%;"></el-input>
                <el-upload action :show-file-list="false">
                  <img
                    style="width:150px;height:80px;border:2px dashed #ccc; margin-left:10px;"
                    src="../../assets/404_images/404_cloud.png"
                    alt
                  />
                </el-upload>
              </el-row>
            </el-checkbox-group>
          </el-col>
          <el-col>
            <el-button type="warning" @click="addSelect">
              <i class="el-icon-plus"></i>
              <span>增加选项和答案</span>
            </el-button>
          </el-col>
        </el-form-item>
        <!-- 解析视频 -->
        <el-form-item label="【解析视频】" style="margin-top:100px;">
          <el-upload action :show-file-list="false" @http-request="uploadVideo">
            <el-button type="primary">上传视频</el-button>
          </el-upload>
        </el-form-item>
        <!-- 答案解析 -->
        <el-form-item prop="answer" label="答案解析：">
          <quill-editor v-model="dataForm.answer" style="width:95%;height:200px;margin-top:50px;"></quill-editor>
        </el-form-item>
        <!-- 题目备注 -->
        <el-form-item prop="remark" label="题目备注" style="margin-top:100px;">
          <el-input v-model="dataForm.remark" type="textarea" style="width:95%;" rows="5"></el-input>
        </el-form-item>
        <!-- 试题标签 -->
        <el-form-item prop="tag" label="试题标签">
          <el-select style="width:30%;" v-model="dataForm.tag">
            <el-option
              v-for="(item,index) in dataForm.tags"
              :key="index"
              :value="item.id"
              :label="item.tagName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 提交 -->
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
// 标签列表
import { list as tags } from "../../api/hmmm/tags";
// 添加试题
import { batch } from "../../api/hmmm/questions";
// 引入富文本
import  VueQuillEditor from 'vue-quill-editor'
// 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: "QuestionsNew",
  data() {
    return {
      dataForm: {
        // 学科列表
        subjects: [],
        subject: null,
        // 目录列表
        catalogs: [],
        catalog: null,
        // 企业列表
        companys: [],
        company: null,
        // 城市列表
        provinces: [],
        // 选择城市
        city: null,
        // 地区列表
        region: [],
        // 地区选择
        area: null,
        // 方向列表
        directions: direction,
        direction: null,
        // 题型选项
        questionTypes: questionType,
        questionType: "1",
        // 难易度选项
        levels: difficulty,
        level: 1,
        // 题干
        questionStem: null,
        // 单选选项
        singleChoice: "A",
        // 多选选项
        multipleChoice: ["A"],
        // 选项标题
        title: null,
        // 选项图片地址
        imgURL: null,
        // 视频解析
        videoURL: null,
        // 答案解析
        answer: null,
        // 题目备注
        remark: null,
        // 标签列表
        tags: [],
        // 试题标签
        tag: null
      },
      dataRules: {
        subject: [{ required: true, message: "必须填项", trigger: 'blur' }],
        catalog: [{ required: true, message: "必须填项", trigger: 'blur' }],
        company: [{ required: true, message: "必须填项", trigger: 'blur' }],
        city: [{ required: true, message: "必须填项", trigger: 'blur' }],
        area: [{ required: true, message: "必须填项" , trigger: 'blur' }],
        direction: [{ required: true, message: "必须填项", trigger: 'blur' }],
        questionType: [{ required: true, message: "必须填项", trigger: 'blur' }],
        level: [{ required: true, message: "必须填项", trigger: 'blur' }],
        questionStem: [{ required: true, message: "必须填项", trigger: 'blur' }],
        singleChoice: [{ required: true, message: "必须填项", trigger: 'blur' }],
        multipleChoice: [{ required: true, message: "必须填项", trigger: 'blur' }],
        questionStem: [{ required: true, message: "必须填项", trigger: 'blur' }],
        tag: [{ required: true, message: "必须填项", trigger: 'blur' }]
      },
      // 选项数组
      choiceArray: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
      // 初始选项数组
      startArray: ["A", "B", "C", "D"]
    };
  },
  methods: {
    // 获取学科列表
    async getList() {
      let result = await subjects();
      this.dataForm.subjects = result.data.items;
    },
    // 获取目录列表
    async getListCata() {
      let result = await directorys();
      this.dataForm.catalogs = result.data.items;
    },
    // 获取企业列表
    async getCompany() {
      let result = await companys();
      this.dataForm.companys = result.data.items;
    },
    // 获取城市列表
    async getCity() {
      this.dataForm.provinces = await provinces();
    },
    // 获取地区列表
    async getRegion(area) {
      this.dataForm.region = await citys(area);
    },
    // 获取标签列表
    async getTags() {
      let result = await tags();
      this.dataForm.tags = result.data.items;
    },
    // 题型增加选项
    addSelect() {
      this.startArray.push(this.choiceArray[this.startArray.length]);
    },
    // 题型单选框改变
    radioChange() {
      alert(this.dataForm.singleChoice);
    },
    // 题型多选框改变
    checkboxChange() {
      alert(this.dataForm.multipleChoice);
    },
    // 上传图片
    uploadImg(params) {
      console.log(params);
    },
    // 上传视频
    uploadVideo(params) {
      this.dataForm.videoURL = params.file.name;
    },
    // 提交事件
    async submit() {
      let data = {
        subjectID: this.dataForm.subject,
        catalogID: this.dataForm.catalog,
        enterpriseID: this.dataForm.company,
        province: this.dataForm.city,
        city: this.dataForm.area,
        direction: this.dataForm.direction,
        questionType: this.dataForm.questionType,
        difficulty: this.dataForm.level,
        question: this.dataForm.questionStem,
        options: {
          code: this.dataForm.singleChoice && this.dataForm.multipleChoice,
          title: this.dataForm.title,
          img: this.dataForm.imgURL,
          isRight: true
        },
        videoURL: this.dataForm.videoURL,
        answer: this.dataForm.answer,
        remarks: this.dataForm.remark,
        tags: this.dataForm.tag,
        isPerfect: true
      };
      let isOk = await this.$refs.myform.validate();
      if (isOk) {
        await batch(data);
        try {
          this.$message({
            type: "success",
            message: "录入成功"
          });
          this.dataForm = {
            // 学科列表
            subjects: [],
            subject: null,
            // 目录列表
            catalogs: [],
            catalog: null,
            // 企业列表
            companys: [],
            company: null,
            // 城市列表
            provinces: [],
            // 选择城市
            city: null,
            // 地区列表
            region: [],
            // 地区选择
            area: null,
            // 方向列表
            directions: direction,
            direction: null,
            // 题型选项
            questionTypes: questionType,
            questionType: "1",
            // 难易度选项
            levels: difficulty,
            level: 1,
            // 题干
            questionStem: null,
            // 单选选项
            singleChoice: "A",
            // 多选选项
            multipleChoice: ["A"],
            // 选项标题
            title: null,
            // 选项图片地址
            imgURL: null,
            // 视频解析
            videoURL: null,
            // 答案解析
            answer: null,
            // 题目备注
            remark: null,
            // 标签列表
            tags: [],
            // 试题标签
            tag: null
          };
        } catch (error) {
          this.$message({
            type: "warning",
            message: "请填写选项"
          });
        }
      }
    }
  },
  created() {
    this.getList();
    this.getListCata();
    this.getCompany();
    this.getCity();
    this.getRegion();
    this.getTags();
  },
  watch: {
    "dataForm.city": function(newValue, oldValue) {
      this.getRegion(newValue);
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
