<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


import elementUiConfig from "@/config/element-ui.config";

export default {
  name: 'App',
  created() {
    new elementUiConfig()
  },
  components: {
  }
}
</script>

<style lang="less">



</style>
