<template>
  <div class="aside">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false"
             v-bind:unique-opened="isUniqueOpened" router
             @open="handleOpen" @close="handleClose" background-color="#3d4b61" text-color="#fff"
             active-text-color="#409EFF">

      <div class="topBtn" @click="toCollapse">
        <i class="el-icon-s-fold"></i>
      </div>
      <el-menu-item index="/system/home">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <!--      一级菜单-->
      <el-submenu :index="`${item.id}`" v-for="item in menuList" :key="item.id">
        <!--        一级菜单的模板区域-->
        <template slot="title">
          <!--          图标-->
          <i :class="`${item.icon}`"></i>
          <!--          文本-->
          <span>{{ item.menuName }}</span>
        </template>
        <!--        二级菜单-->
        <el-menu-item :index="`${child.path}`" v-for="child in item.child" :key="child.id">
          <template>
            <i :class="`${child.icon}`"></i>
            <span>
          {{ child.menuName }}
            </span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false,
      isUniqueOpened: true,
      menuList: [
        // {menuName: '系统管理', id: 1, icon: 'el-icon-s-tools', child: [{menuName: '用户管理', id: '/sysUser'}]},
        // {menuName: '项目管理', id: 2, icon: 'el-icon-s-cooperation', child: [{menuName: '项目立项', id: 112}]},
      ]
    }
  },
  emits: ['collapse'],
  created() {
    this.getMenuList()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 折叠方法
    toCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('collapse',this.isCollapse)
    }
    ,
    // 获取左侧导航菜单列表
    async getMenuList() {
      const {data} = await this.$http.get('/sysMenu/getMenuList')
      if (data.code !== 200) return this.$message.error('获取菜单列表失败!')
      this.menuList = data.data
    }
  }
}
</script>

<style scoped lang="less">
.el-menu {
  //text-align: center;
  border-right: 0;

  .topBtn {
    color: #909399;
    height: 50px;
    font-size: 22px;
    //background-color: orange;
    line-height: 50px;
    text-align: center;
  }
  .topBtn:hover {
    cursor: pointer;
    color: #E9EEF3;
  }
  .is-active {
    //color: #409EFF !important;
  }

  //> .el-menu-item:nth-child(1) {
  //  color: orangered !important;
  //  text-align: center;
  //}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px !important;
    min-height: 400px;
  }
}

</style>