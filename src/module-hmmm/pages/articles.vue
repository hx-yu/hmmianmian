<template>
  <div class="dashboard-container">
    <el-card>
      <el-row slot="header" shadow="never" type="flex" align="middle">
        <el-button type="primary" @click="openDialog">新增面试技巧</el-button>
      </el-row>
      <el-form style="margin-left:25px">
        <el-form-item label="关键字">
          <el-input style="width:240px;margin-right:10px"></el-input>
          <el-button>清除</el-button>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table :data="datas" style="width: 100%">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="reads" label="阅读数"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column prop="creator" label="录入人"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <el-button type="text" size="small">预览</el-button>
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small" @click="delArticle(datas[0].id)">删除</el-button>
            <el-button type="text" size="small">禁用</el-button>
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
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-row>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { list as articlesList, remove, add } from "../../api/hmmm/articles";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "ArticlesList",
  data() {
    return {
      // 校验规则
      rules: {
        name: [{ required: true, message: "学科名称不能为空！" }],
        content: [{ required: true, message: "内容不能为空！" }],
        location: [{ required: true, message: "视频地址不能为空！" }]
      },
      //表单校验
      verify: {
        title: "",
        articleBody: "",
        videoURL: ""
      },
      dialogVisible: false, //弹层状态
      // 文章数据
      datas: [
        {
          id: 0,
          title: "",
          reads: -1,
          state: false,
          creator: ""
        }
      ],
      // 分页信息
      pageData: {
        counts: 0, //总记录数
        pagesize: 10, //页大小，当前页数
        page: 1 //当前页码
      }
    };
  },
  methods: {
    //确定新增文章
    saveAdd(verify) {
      // let formdata=new FormData()
      // console.log(this.$refs.ruleForm.validate)
      // console.log(formdata)
      this.$refs.ruleForm.validate(isOK => {
        if (isOK) {
          add(verify).then(res => {
            this.getarticle();
          });
          this.dialogVisible = false;
        }
      });
    },
    //点击新增弹层
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
      let params=this.pageData
      console.log(params);
      
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

