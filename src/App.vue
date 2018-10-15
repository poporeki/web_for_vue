<template>
  <div id="app">
    <Loading></Loading>
    <router-view />
  </div>
</template>
<style lang="scss">
html {
  width: 100%;
  height: 100%;
}
body {
  position: relative;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
<script>
import Loading from "./views/Loading_global";
export default {
  components: {
    Loading
  }
};
</script>


