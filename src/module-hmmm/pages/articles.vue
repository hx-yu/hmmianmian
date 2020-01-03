<template>
  <div class="dashboard-container">
    <el-card>
      <el-row slot="header" shadow="never" type="flex" align="middle">
        <el-button type="primary" @click="showAdd">新增面试技巧</el-button>
      </el-row>
      <el-form style="margin-left:25px">
        <el-form-item label="关键字">
          <el-input style="width:240px;margin-right:10px" v-model="pageData.keyword"></el-input>
          <el-button @click="cleanContent">清除</el-button>
          <el-button type="primary" @click="searchContent">搜索</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="datas" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="reads" label="阅读数"></el-table-column>
          <el-table-column :formatter="getState" prop="state" label="状态"></el-table-column>
          <el-table-column prop="creator" label="录入人"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="obj">
              <el-button type="text" size="small">预览</el-button>
              <el-button type="text" size="small" @click="showModify(obj.row)">修改</el-button>
              <el-button type="text" size="small" @click="delArticle(obj.row.id)">删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="changeState(obj.row)"
              >{{obj.row.state===1?'禁用':'启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-row type="flex" style="height:60px" justify="center" align="middle">
        <el-pagination
          background
          layout="total,prev, pager, next"
          @current-change="changepage"
          :total="pageData.counts"
          :page-size="pageData.pagesize"
          :current-page="pageData.page"
        ></el-pagination>
      </el-row>
      <!-- 新增面试技巧 -->
      <el-dialog :visible="dialogVisible" width="50%" :show-close="false">
        <el-form class="form" :model="verify" :rules="rules" ref="ruleForm">
          <el-form-item label="学科名称" prop="title">
            <el-row type="flex" justify="end">
              <el-input style="width:600px" v-model="verify.title"></el-input>
            </el-row>
          </el-form-item>
          <el-form-item label="内容" prop="articleBody">
            <el-row type="flex" justify="end">
              <quill-editor style="width:570px;height:300px" v-model="verify.articleBody"></quill-editor>
            </el-row>
          </el-form-item>
          <el-form-item label="视频地址" style="margin-top:150px" prop="videoURL">
            <el-row type="flex" justify="end">
              <el-input style="width:600px" v-model="verify.videoURL"></el-input>
            </el-row>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="end">
          <el-button type="primary" @click="saveAdd(verify)">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-row>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  list as articlesList,
  remove,
  add,
  update,
  state,
  detail
} from "../../api/hmmm/articles";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "ArticlesList",
  data() {
    return {
      // 校验规则
      rules: {
        title: [
          { required: true, message: "学科名称不能为空！", trigger: "blur" }
        ],
        articleBody: [
          { required: true, message: "内容不能为空！", trigger: "blur" }
        ],
        videoURL: [
          { required: true, message: "视频地址不能为空！", trigger: "blur" }
        ]
      },
      //表单校验
      verify: {
        title: "",
        articleBody: "",
        videoURL: ""
      },
      dialogVisible: false, //弹层状态
      // 文章数据
      datas: [],
      // 分页信息
      pageData: {
        keyword: "",
        counts: 0, //总记录数
        pagesize: 10, //页大小，当前页数
        page: 1 //当前页码
      }
    };
  },
  methods: {
    //搜索
    searchContent() {
      // alert(this.search)
      this.pageData.page = 1;
      this.getarticle();
    },
    getCondition() {
      let params = {
        page: this.pageData.page,
        pagesize: this.pageData.pagesize,
        keyword: this.pageData.search
      };
      this.getarticle(params)
    },
    //清除搜索内容
    cleanContent() {
      this.pageData.keyword = "";
    },
    // 改变文章状态
    changeState(row) {
      this.$confirm("确定更改状态？").then(() => {
        state({ id: row.id, state: row.state === 1 ? 0 : 1 });
        this.getarticle();
      });
    },
    // 文章状态
    getState(row) {
      return row.state === 1 ? "启用" : "禁用";
    },
    // 修改文章
    showModify(row) {
      // alert(id)
      detail({ id: row.id, state: row.state }).then(res => {
        this.verify = res.data;
        // console.log(this.verify)
        this.openDialog();
      });
    },
    //新增
    showAdd(verify) {
      this.openDialog();
    },
    //确定新增文章
    saveAdd(verify) {
      // let formdata=new FormData()
      // console.log(this.$refs.ruleForm.validate)
      // console.log(formdata)
      this.$refs.ruleForm.validate(isOK => {
        if (isOK) {
          this.verify.id ? update(verify) : add(verify);
          this.getarticle();
          this.verify = {
            title: "",
            articleBody: "",
            videoURL: ""
          };
          this.dialogVisible = false;
        }
      });
    },
    //取消
    cancel() {
      this.verify = {
        title: "",
        articleBody: "",
        videoURL: ""
      };
      this.dialogVisible = false;
    },
    //点击显示弹层
    openDialog() {
      this.dialogVisible = true;
    },
    //删除文章
    delArticle(id) {
      this.$confirm("确定删除此条文章吗？").then(() => {
        // alert(id)
        remove({ id }).then(res => {
          // alert(1)
          this.getarticle();
        });
      });
    },
    // 获取文章列表
    getarticle() {
      let params = this.pageData; 
      articlesList(params).then(res => {
        // debugger
        // console.log(res.data)
        // console.log(res.data.page);
        this.datas = res.data.items;
        this.pageData.counts = res.data.counts;
        this.pageData.pagesize = parseInt(res.data.pagesize);
        this.pageData.page = parseInt(res.data.page);
      });
    },
    //当前页改变
    changepage(newPage) {
      console.log(newPage);

      this.pageData.page = newPage;
      this.getarticle();
    }
  },
  created() {
    this.getarticle();
  }
};
</script>

<style scoped>
.form {
  margin-left: 80px;
}
</style>

