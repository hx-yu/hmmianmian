<template>
  <div class="dashboard-container">
    <el-card>
      <el-row slot="header">
        <el-button @click="addFlag = true" type="primary" plain>新增标签</el-button>
        <el-button @click="returnSubject" type="primary" plain>返回学科</el-button>
      </el-row>
      <el-form>
        <el-form-item class="search-item" label="标签名称">
          <el-input style="width: 200px;" placeholder="请输入搜索" v-model="page.tagName" clearable></el-input>
          <el-button style="margin-left: 16px;" @click="page.tagName = ''">清除</el-button>
          <el-button type="primary" @click="searchListData">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tagData | filterState">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="tagName" label="标签名称"></el-table-column>
        <el-table-column prop="creatorID" label="创造者"></el-table-column>
        <el-table-column prop="totals" label="面试题数量"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="obj">
            <el-link @click="revise(obj.row)" style="font-size: 12px;color: #3de3f2;" :underline="false">修改</el-link>
            <el-link @click="currStatus(obj.row)" style="font-size: 12px;color: #3de3f2;padding: 0 10px;" :underline="false">{{obj.row.state === "启用" ? "关闭" : "启用"}}</el-link>
            <el-link @click="delCurrList(obj.row)" style="font-size: 12px;color: #3de3f2;" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin: 30px 0;">
        <el-pagination @current-change="pageChange" :current-page="page.page" :page-size="page.pagesize" background :total="page.total"></el-pagination>
      </el-row>
      <!-- 修改的弹框 -->
      <el-dialog :show-close="false" :visible="flag">
        <el-form ref="myForm" :model="source" :rules="sourceRuls" label-width="20%">
          <el-form-item prop="tagName" label="学科名称">
            <el-input placeholder="请输入学科名称" v-model="source.tagName" clearable></el-input>
          </el-form-item>
          <el-form-item prop="subjectID" label="学科">
            <el-select v-model="source.subjectID" placeholder="请选择学科">
              <el-option v-for="item in subJectListData" :key="item.id" :label="item.subjectName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
         <el-row type="flex" justify="end" style="margin-top: 80px;">
            <el-button type="primary" @click="define">确定</el-button>
            <el-button @click="flag = false" plain>取消</el-button>
        </el-row>
      </el-dialog>
      <!-- 添加弹框 -->
      <el-dialog :show-close="false" :visible="addFlag">
        <el-form ref="myForm" :model="addData" :rules="sourceRuls" label-width="20%">
          <el-form-item prop="tagName" label="学科名称">
            <el-input placeholder="请输入学科名称" v-model="addData.tagName" clearable></el-input>
          </el-form-item>
          <el-form-item prop="subjectID" label="学科">
            <el-select v-model="addData.subjectID" placeholder="请选择学科">
              <el-option v-for="item in subJectListData" :key="item.id" :label="item.subjectName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
         <el-row type="flex" justify="end" style="margin-top: 80px;">
            <el-button type="primary" @click="define">确定</el-button>
            <el-button @click="addFlag = false" plain>取消</el-button>
        </el-row>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {list as tagsList, update, removeState, remove, add} from '../../api/hmmm/tags.js'
import {list as subjectsList} from '../../api/hmmm/subjects.js'
export default {
  name: 'TagsList',
  data() {
    return {
      tagData: [],

      // 请求列表数据的条件
      page: {
        page: 1,
        pagesize: 10,
        total: 1,
        tagName: ''
      },

      // 修改弹框的打开关闭状态
      flag: false,
      // 添加弹框的打开关闭状态
      addFlag: false,
      // 定义要修改的数据
      source: {
        tagName: '',
        subjectID: null,
        id: null
      },
      // 定义要添加的数据
      addData: {
        tagName: '',
        subjectID: null
      },
      // 定义验证规则
      sourceRuls: {
        tagName: [{
          required: true,
          message: '修改内容不能为空'
        }],
        subjectID: [{
          required: true,
          message: '请选择学科',
        }]
      },

      // 定义接收学科列表数据
      subJectListData: [],
      
    }
  },
  methods: {

    // 获取列表数据
      async getTagListData () {
         let result = await tagsList(this.page)
         // 获取总条数
         this.page.total = result.data.counts
         this.tagData = result.data.items.reverse()
      },

      // 点击每一页的时候重新发送请求获取数据
      pageChange (page) {
        this.page.page = page
        this.getTagListData()
      },

      // 点击搜索搜索列表数据
      searchListData () {
        // 每次搜索的时候应该吧当前页面变成第一页
        this.page.page = 1
        this.getTagListData()
      },

      // 显示要修改的数据
      async revise (data) {
        this.flag = true
        this.source.tagName = data.tagName
        // 因为无法获取到学科的id，故使用这种方法
        let selectedname = ["大数据", "python", "c", "c#", "php", "运维", "算法", "数据库", "c++", "产品"]
        let selectedId = [16, 14, 13, 12, 11, 10, 9, 8, 7 ,6]
        selectedname.find(function (item, index) {
          if (data.subjectName === item) {
            data.subjectName = selectedId[index]
          }
        })
        this.source.subjectID = data.subjectName
        this.source.id = data.id
      },

      // 点击确定修改内容
      async define () {
        // 验证数据
        try {
          let isOk = await this.$refs.myForm.validate()
          // 通过判断修改对象中的数据的id有没有，有的话就是修改没有的话就是添加
          let result = await this.source.id ? update(this.source) : add(this.addData)
          this.getTagListData()
          if (this.source.id) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
          this.flag = false
          this.addFlag = false
        } catch (err) {
          this.$message({
            type: 'warning',
            message: '参数异常不能为空'
          })
        }
      },

      // 获取学科列表
      async getSubjectList () {
        let result = await subjectsList()
        this.subJectListData = result.data.items
      },

      // 启用或者禁用状态
      async currStatus (data) {
        try {
          await this.$confirm(`您确定要${data.state === "启用" ? "关闭" : "启用"}这条信息吗?`)

          // 将状态恢复成0和1的数值
          data.state = data.state === '启用' ? 0 : 1
          let result = await removeState(data)
          this.getTagListData()
        } catch (err) {
          this.$message({
            message: '已取消'
          })
        }
      },

      // 删除当前列表数据
      async delCurrList (data) {
        try {
          await this.$confirm('您确定要删除这条评论吗?')
          await remove(data)
          this.getTagListData()
        } catch (err) {
          this.$message({
            message: '已取消'
          })
        }
        
      },
      // 返回学科组件
      returnSubject () {
        this.$router.push('/subjects/list')
      },
  },
  created () {
   this.getTagListData()
   this.getSubjectList()
  },

  filters: {
    filterState (value) {
      return value.map(function (item, index) {
        if (item.state === 1) {
          item.state = '启用'
        } else if (item.state === 0) {
          item.state = '屏蔽'
        }
        return item
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .search-item {
    padding-left: 10px;
  }
</style>
