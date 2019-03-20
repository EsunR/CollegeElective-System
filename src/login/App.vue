<template>
  <div id="box" class="container">
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#box {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  #main {
    padding: 20px;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>

<style>
html {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
body {
  height: 100%;
  background-color: #f4f5f5 !important;
}
hr{
  margin: 20px 0;
  opacity: .2;
}
</style>

