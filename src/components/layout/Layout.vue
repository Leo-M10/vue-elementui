<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="collapseFlag ? '64px' : '200px'" style="transition: 0.5s">
          <Aside v-on:collapse="collapse"></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header.vue";
import Aside from "@/components/layout/aside/Aside.vue";
import Content from "@/components/layout/content/Content.vue";

export default {
  name: "layout",
  components: {
    Content,
    Aside,
    Header

  },
  data() {
    return {
      collapseFlag: false
    }
  },
  methods: {
    collapse(flag) {
      console.log(flag)
      this.collapseFlag = flag
    }
  }
}
</script>

<style scoped lang="less">

.el-aside {
background-color: #3d4b61;
color: #a1faea;
//text-align: center;
line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  padding: 0;
  height: 100%;
  //color: #333;
  //text-align: center;
  //line-height: 160px;
}
.el-header, .el-footer {
  background-color: #1C9399;
  color: #fff;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-container {
  height: 100%;
}
.layout {
  height: 100%;
}


</style>