<template>
  <div class="sysUser">
    <!--    面包屑导航区域-->
    <Bread :bread-list="breadList"></Bread>
    <!--    卡片区域-->
    <el-card>
      <!--用户功能操作区域-->
      <el-row :gutter="20">
        <el-col :offset="0" :span="12">
          <el-button type="primary" @click="addUserDialog=true">添加用户</el-button>
          <el-button type="primary">导出</el-button>
          <el-button type="primary" @click="deleteBaths">删除</el-button>
        </el-col>
      </el-row>
      <!--搜索区域-->
      <el-form >
        <el-row :gutter="20">
          <div class="el-row_div">
            <el-col :offset="0" :span="5.5">
              <el-date-picker v-model="fullTime" type="datetimerange" @change="changeFullTime" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-col>
            <el-col :offset="0" :span="3">
              <el-select v-model="queryInfo.status" placeholder="请选择状态" clearable>
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
              </el-select>
            </el-col>
            <el-col :offset="0" :span="5">
              <el-input v-model="queryInfo.query" class="input-with-select" clearable placeholder="请输入检索的用户账号"
                        @clear="this.getUserList">
                <template v-slot:append>
                  <el-button icon="el-icon-search" @click="searchUser"></el-button>
                </template>
              </el-input>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <!--列表显示区域-->
      <el-table :data="userList" border stripe @selection-change="changeIndex">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template v-slot="scope">
            <el-switch v-model.number="scope.row.status" :active-value=0 :disabled="false"
                       :inactive-value=1 active-color="#13ce66" inactive-color="#ff4949"
                       @change="userStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="createTime"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="editUser(scope.row.id)"></el-button>
            <el-button icon="el-icon-delete" size="mini" type="primary" @click="deleteUser(scope.row.id)"></el-button>
            <el-tooltip :enterable="false" class="item" content="查看详情" effect="light" placement="top-start">=
              <el-button icon="el-icon-view" size="mini" type="primary"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination :page-size="queryInfo.pageSize" :page-sizes="[8,13]" :total="queryInfo.total"
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>

    <!--添加用户的对话框-->
    <el-dialog :close-on-click-modal="false" :visible.sync="addUserDialog" center close-on-press-escape title="添加用户"
               width="50%" @close="resetForm('userForm')">
      <!--    添加用户表单区域-->
      <el-form ref="userForm" :inline="true" :model="rulesForm" :rules="rules" label-width="auto">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户账号" prop="username">
              <el-input v-model="rulesForm.username"></el-input>
            </el-form-item>
            <el-form-item label="账户状态" prop="status">
              <el-radio v-model="rulesForm.status" :label="0">启用</el-radio>
              <el-radio v-model="rulesForm.status" :label="1">停用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="rulesForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="管理员" prop="isAdmin">
              <el-radio v-model="rulesForm.isAdmin" :label="0">是</el-radio>
              <el-radio v-model="rulesForm.isAdmin" :label="1">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加密盐" prop="salt">
              <el-input v-model="rulesForm.salt"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('userForm')">重 置</el-button>
        <el-button type="primary" @click="addUser('userForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑用户对话框-->
    <el-dialog :close-on-click-modal="false" :visible.sync="editUserDialog" center close-on-press-escape
               title="编辑用户" width="30%" @close="closeUser('editForm')">
      <el-form ref="editForm" :model="rulesForm" :rules="rules" label-width="100px">
        <el-row>
          <el-row :span="24">
            <el-form-item label="用户账号" prop="username">
              <el-input v-model="rulesForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="rulesForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="管理员" prop="isAdmin">
              <el-radio v-model="rulesForm.isAdmin" :label="0">是</el-radio>
              <el-radio v-model="rulesForm.isAdmin" :label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="加密盐">
              <el-input v-model="rulesForm.salt" disabled></el-input>
            </el-form-item>
            <el-form-item label="注册时间">
              <el-input v-model="rulesForm.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio v-model="rulesForm.status" :label="0">启用</el-radio>
              <el-radio v-model="rulesForm.status" :label="1">停用</el-radio>
            </el-form-item>
          </el-row>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUser('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm',rulesForm.id)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import Bread from "@/common/Bread.vue";

export default {
  name: "SysUser",
  components: {Bread},
  data() {
    let checkSalt = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9]+$/
      if (!reg.test(value)) {
        return callback(new Error('加密盐只能是数值或者字母'))
      }
      //使用了自定义验证规则,必须结尾调用回调函数,否则后面表单验证不会执行通过后的代码
      callback()
    }
    return {
      userList: [],
      //查询数据
      queryInfo: {
        username: '',
        status: null,
        beginTime: '',
        endTime: '',
        //当前页数
        pageNum: 1,
        //每页条数
        pageSize: 8,
        total: 0
      },
      //时间选择器的时间
      fullTime: [],
      //多选框选中的数据id
      selectUserIds: [],
      addUserDialog: false,
      editUserDialog: false,
      //校验规则
      rules: {
        username: [
          {required: true, message: '用户账号不可以为空', trigger: 'blur'},
          {min: 3, max: 15, message: '用户账号长度应为3-15个字符', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: '用户昵称不可以为空', trigger: 'blur'},
          {min: 1, max: 15, message: '用户昵称长度应为1-15个字符', trigger: 'blur'}
        ],
        salt: [
          {required: true, message: '加密盐不能为空'},
          {max: 10, message: '长度不能超过10个字符'},
          {validator: checkSalt, trigger: 'blur'}
        ],
        isAdmin: [
          {required: true, message: '请选择用户身份'}
        ],
        status: [
          {required: true, message: '请选择用户状态'}
        ]
      },
      //表单数据
      rulesForm: {
        id: '',
        username: '',
        password: '',
        nickName: '',
        salt: '',
        isAdmin: '',
        status: '',
        createTime: '',
        updateTime: ''
      },
      //面包屑数据
      breadList: []
    }
  },
  created() {
    this.getUserList()
    this.getBreadList(this.$route.path).then(result => this.breadList = result)
  },
  methods: {
    // 更改页容量
    handleSizeChange(newPageSize) {
      console.log(`每页 ${newPageSize} 条`);
      this.queryInfo.pageSize = newPageSize
      this.getUserList()
    },
    //更改当前页
    handleCurrentChange(newPageNum) {
      console.log(`当前页: ${newPageNum}`);
      this.queryInfo.pageNum = newPageNum
      this.getUserList()
    },
    //获取用户列表
    async getUserList() {
      const {data: result} = await this.$http.post('/sysUser/getUserList', {
        username: this.queryInfo.query,
        isAdmin: null,
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
        status : this.queryInfo.status,
        beginTime: this.queryInfo.beginTime,
        endTime: this.queryInfo.endTime
      })
      if (result.code !== 200) return this.$message.error('获取用户列表失败!')
      this.userList = result.data.list
      this.queryInfo.total = Number(result.data.total)
    },
    //通过多选框选择用户
    changeIndex(value) {
      this.selectUserIds = value.map((item) => {
        return item.id
      })
    },
    //switch开关change事件改变用户状态
    async userStatusChange(userInfo) {
      const {data} = await this.$http.put(`/sysUser/updateStatus/${userInfo.id}/${userInfo.status}`)
      if (data.code !== 200) return this.$message.error(data.message)
      await this.getUserList()
      this.$message.success('状态已更改!')
    },
    //查询按钮点击事件
    searchUser() {
      this.getUserList()
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //添加用户
    addUser(formName) {
      this.$refs[formName].validate(async (valid) => {
            if (!valid) return

            const {data} = await this.$http.post('/sysUser/add', this.rulesForm)
            this.resetForm(formName)
            if (data.code !== 200) return this.$message.error(data.message)
            this.addUserDialog = false
            this.$message.success('添加成功!')
            await this.getUserList()
          }
      )
    },
    //展示编辑用户页面
    async editUser(id) {
      const {data} = await this.$http.get(`/sysUser/getById/${id}`)
      if (data.code !== 200) return this.$message.error('查询失败!')
      this.rulesForm = data.data
      this.editUserDialog = true
    },
    //关闭编辑页面
    closeUser(formName) {
      this.resetForm(formName)
      this.editUserDialog = false
    },
    //提交编辑信息
    submitEditForm(formName, id) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return
        const {data} = await this.$http.put(`/sysUser/${id}`, {
          nickName: this.rulesForm.nickName,
          isAdmin: this.rulesForm.isAdmin,
          status: this.rulesForm.status
        })
        if (data.code !== 200) return this.$message.error(data.message === 'success' ? null : data.message)
        this.editUserDialog = false
        this.$message.success('编辑成功!')
        await this.getUserList()
      })
    },
    //操作栏删除
    deleteUser(id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data} = await this.$http.delete(`sysUser/${id}`)
        if (data.code !== 200) return this.$message.error('删除失败!')
        this.$message.success('删除成功!')
        await this.getUserList()
      }).catch(() => {
        this.$message.info('已取消删除!')
      });
    },
    //功能栏删除
    deleteBaths() {
      if (this.selectUserIds.length === 0) return this.$message.error('请选择要删除的用户!')
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data} = await this.$http.delete(`sysUser/deleteBatch/${this.selectUserIds}`)
        if (data.code !== 200) return this.$message.error('删除失败!')
        this.$message.success('删除成功!')
        await this.getUserList()
      }).catch(() => {
        this.$message.info('已取消删除!')
      });
    },
    //时间选择器事件
    changeFullTime(value) {
      console.log('1233')
      if (value === null){
        this.queryInfo.beginTime = value
        this.queryInfo.endTime = value
        return
      }
      this.queryInfo.beginTime = this.fullTime[0]
      this.queryInfo.endTime = this.fullTime[1]

    }
  }
}
</script>

<style lang="less" scoped>
.sysUser {
  margin: 15px;
  padding: 0;

  .el-row_div {
    margin-top: 15px;
  }
}

</style>