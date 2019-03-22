<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    getUserInfo(callback) {
      // TODO: 获取身份
      this.axios
        .get("/userInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.$store.commit("setData", res.data.data);
            callback();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    // this.getUserInfo(() => {
    //   switch (this.$store.state.identity) {
    //     case "student":
    //       this.router.push("/student/home");
    //       break;
    //     case "teacher":
    //       this.router.push("/teacher/home");
    //       break;
    //     case "admin":
    //       this.router.push("/admin/home");
    //       break;
    //   }
    // });
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;
  width: 900px;
  position: relative;
  top: 100px;
}
</style>

