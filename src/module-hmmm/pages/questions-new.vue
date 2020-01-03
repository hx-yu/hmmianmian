<template>
  <el-card>
    <el-row slot="header">
      <el-button @click="$router.push('/questions/new')" type="primary">新增试题</el-button>
      <el-button type="primary">批量导入</el-button>
    </el-row>
    <el-form :model="formData" ref="myForm" inline label-width="80px">
      <el-form-item label="学科" prop="subjectID">
        <el-select v-model="formData.subjectID">
          <el-option
            v-for="item in subjects"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status">
          <el-option
            v-for="item in status"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-select v-model="formData.difficulty">
          <el-option
            v-for="item in difficulty"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试题类型" prop="questionType">
        <el-select v-model="formData.questionType">
          <el-option
            v-for="item in questionType"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="formData.tags">
          <el-option v-for="item in tags" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="formData.keyword"></el-input>
      </el-form-item>
      <el-form-item label="题目备注" prop="remarks">
        <el-input v-model="formData.remarks"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="shortName">
        <el-input v-model="formData.shortName"></el-input>
      </el-form-item>

      <el-form-item label="录入人" prop="creatorID">
        <el-select v-model="formData.creatorID">
          <el-option v-for="(item) in users" :key="item.id" :value="item.id" :label="item.username"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级目录" prop="catalogID">
        <el-select v-model="formData.catalogID">
          <el-option
            v-for="(item) in directioy"
            :key="item.id"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="province">
        <el-select v-model="formData.province">
          <el-option v-for="(item,index) in provinces" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="city">
        <el-select v-model="formData.city">
          <el-option v-for="(item,index) in myCitys" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向" prop="direction">
        <el-select v-model="formData.direction">
          <el-option v-for="(item,index) in direction" :key="index" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="center" style="margin: 20px 0">
      <el-button @click="clear">清除</el-button>
      <el-button @click="search" type="primary">搜索</el-button>
    </el-row>
    <el-row style="margin:20px 0">
      <el-radio-group v-model="queryStatus">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="wait">待发布</el-radio-button>
        <el-radio-button label="publish">已发布</el-radio-button>
      </el-radio-group>
    </el-row>

    <el-table :data="currentList">
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="试题编号" prop="number"></el-table-column>
      <el-table-column label="学科" :formatter="subjectFormatter" prop="subjectID"></el-table-column>
      <el-table-column label="题型" :formatter="questionFormatter" prop="questionType"></el-table-column>
      <el-table-column label="题干" prop="question"></el-table-column>
      <el-table-column label="录入时间" prop="addDate" width="180px">
        <template slot-scope="obj">
          {{
          obj.row.addDate | parseTimeByString
          }}
        </template>
      </el-table-column>
      <el-table-column label="录入人" prop="creator"></el-table-column>
      <el-table-column label="难度" prop="city"></el-table-column>
      <el-table-column label="审核状态" prop="chkState" :formatter="chkFormatter"></el-table-column>
      <el-table-column label="审核意见" prop="chkRemarks"></el-table-column>
      <el-table-column label="审核人" prop="chkUser"></el-table-column>
      <el-table-column label="发布状态" prop="publishState">
        <template
          slot-scope="obj"
        >{{ obj.row.publishState === 0 ? '待发布' :obj.row.publishState === 1 ? '已发布':'已下架' }}</template>
      </el-table-column>

      <el-table-column label="操作" width="180px">
        <template slot-scope="obj">
          <el-button type="text" size="small">审核</el-button>
          <el-button type="text" size="small">预览</el-button>
          <el-button type="text" size="small" @click="UpDown(obj.row)">
            {{
            (obj.row.publishState === 0 || obj.row.publishState ===1) ? '上架' : '下架'
            }}
          </el-button>
          <el-button type="text" size="small" @click="modify(obj.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="delItem(obj.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" style="height:60px" align="middle">
      <el-pagination
        background
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        layout="total, prev, pager, next"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import {
  choice as questionList,
  remove,
  choicePublish
} from "../../api/hmmm/questions";
import { simple as TagList } from "../../api/hmmm/tags";
import {
  difficulty,
  questionType,
  direction,
  status
} from "../../api/hmmm/constants";
import { simple as subjectList } from "../../api/hmmm/subjects";
import { simple as UserList } from "../../api/base/users";
import { simple as directioy } from "../../api/hmmm/directorys";
import { citys, provinces } from "../../api/hmmm/citys";
export default {
  data() {
    return {
      queryStatus: "all",
      list: [],
      subjects: [],
      tags: [],
      direction,
      difficulty,
      questionType,
      directioy,
      citys: [],
      status: [
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "拒绝"
        }
      ],
      provinces: provinces(),
      users: [],
      formData: {
        chkState: null,
        difficulty: null,
        questionType: null,
        tags: null,
        subjectID: null,
        province: null,
        city: null,
        keyword: null,
        remarks: null,
        shortName: null,
        direction: null,
        creatorID: null,
        catalogID: null
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    myCitys() {
      return citys(this.formData.province);
    },
    currentList() {
      if (this.queryStatus === "all") return this.list.map(item => item);
      else if (this.queryStatus === "wait")
        return this.list.filter(
          item => item.publishState === 0 || item.publishState === 2
        );
      else return this.list.filter(item => item.publishState === 1);
    }
  },

  methods: {
    modify(id) {
      this.$router.push({ path: "/questions/new", query: { id } });
    },
    subjectFormatter(row, column, cellValue) {
      let result = this.subjects.filter(item => item.value === cellValue);
      return result.length ? result[0].label : "-";
    },
    chkFormatter(row, column, cellValue) {
      return cellValue === 0 ? "待审核" : cellValue === 1 ? "通过" : "拒绝";
    },
    async UpDown(row) {
      await this.$confirm("确定要进行此操作吗");
      await choicePublish({
        id: row.id,
        publish: row.publishState === 0 || row.publishState === 2 ? 1 : 0
      });
      this.getCondition();
      this.$message({ type: "success", message: "操作成功" });
    },
    // 删除文章
    async delItem(id) {
      await this.$confirm("是否删除此文章");
      await remove({ id });
      this.$message({ type: "success", message: "删除成功" });
      this.getCondition();
    },
    changePage(newPage) {
      this.page.currentPage = newPage;
      this.getCondition();
    },

    getCondition() {
      let params = {
        page: this.page.currentPage,
        pageSize: this.page.pageSize,
        ...this.formData
      };
      this.getQuestion(params);
    },
    questionFormatter(row, column, cellValue) {
      let result = this.questionType.filter(item => item.value == cellValue);
      return result.length ? result[0].label : "未知";
    },
    search() {
      this.page.currentPage = 1;
      this.getCondition();
    },
    clear() {
      this.$refs.myForm.resetFields();
    },
    async getSubject() {
      let result = await subjectList();
      this.subjects = result.data;
    },
    async getQuestion(data) {
      let result = await questionList(data);
      this.list = result.data.items;
      this.page.total = result.data.counts;
    },
    async getTags() {
      let result = await TagList();
      this.tags = result.data;
    },
    async getUserList() {
      let result = await UserList();
      this.users = result.data;
    },
    async getDirectioy() {
      let result = await directioy();
      this.directioy = result.data;
    }
  },
  async created() {
    this.getDirectioy();
    this.getUserList();
    this.getTags();
    this.getSubject();
    this.getQuestion();
  }
};
</script>

<style lang="scss"></style>
