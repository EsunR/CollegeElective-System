<template>
  <div id="app"  v-loading.fullscreen.lock="loading" element-loading-text="正在验证用户身份">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    getUserInfo(callback) {
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
    this.getUserInfo(() => {
      this.loading = false;
      switch (this.$store.state.identity) {
        case "student":
          this.$router.push("/student");
          break;
        case "teacher":
          this.$router.push("/teacher");
          break;
        case "admin":
          this.$router.push("/admin");
          break;
      }
    });
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

