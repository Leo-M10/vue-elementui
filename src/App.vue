<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


import Login from "@/components/login/Login.vue";

export default {
  name: 'App',
  components: {
    Login

  }
}
</script>

<style lang="less">



</style>
