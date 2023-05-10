<template>
  <div class="sysMenu">
    <!--    面包屑导航区域-->
    <Bread :bread-list="breadList"></Bread>
    <!--    卡片区域-->
    <el-card>
      <el-row :gutter="20">
        <el-col :offset="0" :span="12">
          <el-button type="primary" @click="addUserDialog=true">添加菜单</el-button>
          <el-button type="primary">导出</el-button>
        </el-col>
      </el-row>
      <!--搜索区域-->
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="margin-top: 15px;">
            <el-input v-model="queryInfo.query" class="input-with-select" clearable placeholder="请输入菜单名称"
                      @clear="null">
              <template v-slot:append>
                <el-button icon="el-icon-search" @click="null"></el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!--列表显示区域-->
      <el-table :data="userList" border  stripe >
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
  </div>
</template>
<script>
import Bread from "@/common/Bread.vue";

export default {
  name: "SysMenu",
  components: {Bread},
  created() {
    this.getBreadList(this.$route.path).then(result => this.breadList = result)
  },
  data() {
    return {
      userList: [],
      breadList: [],
      //查询数据
      queryInfo: {
        username: '',
        //当前页数
        pageNum: 1,
        //每页条数
        pageSize: 8,
        total: 0
      },
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
          // {validator: checkSalt, trigger: 'blur'}
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
      }
    }
  }
}
</script>

<style scoped lang="less">
.sysMenu {
  margin: 15px;
  padding: 0;
}
</style>