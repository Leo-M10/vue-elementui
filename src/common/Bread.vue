<template>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Bread",
  props: ['breadList'],
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>