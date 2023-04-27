<template>
  <el-row>
    <el-col :span="22">
      <div class="grid-content bg-purple-dark">
        <h1>徐 州 电 力 审 计 管 理 系 统</h1>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content bg-purple-dark">
        <span>admin</span>&nbsp;
        <a class="logout" href="" @click.prevent="logout">
          <i class="el-icon-switch-button"></i>
        </a>
      </div>
    </el-col>
  </el-row>
  <!--  <h1>徐 州 电 力 审 计 管 理 系 统</h1>-->
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$confirm('此操作将退出当前用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data} = await this.$http.get('/sysUser/logout')
        if (data.code !== 200) {
          await this.$router.push('/login')
          window.sessionStorage.clear()
          return this.$message.error(data.message)
        }
        window.sessionStorage.clear()
        await this.$router.push('/login')
        this.$message.success('已退出当前用户!')
      }).catch(() => {
        this.$message.info('已取消退出!')
      });
    }
  }
}
</script>

<style scoped lang="less">
.el-row {
  .el-col:nth-child(1) {
    div {
      margin-left: 170px;
    }
  }
}
</style>