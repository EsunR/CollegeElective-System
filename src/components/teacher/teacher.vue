<template>
  <div id="teacher" class="full_screen">
    <el-container>
      <el-aside width="300px">
        <user-info class="user_info"></user-info>
        <el-menu
          class="nav_bar"
          default-active="teacherCourse"
          background-color="#1d2b36"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="select"
        >
          <el-menu-item index="teacherCourse">
            <i class="el-icon-menu"></i>
            <span slot="title">教师课表</span>
          </el-menu-item>
          <el-menu-item index="addCourse">
            <i class="el-icon-document"></i>
            <span slot="title">添加课程</span>
          </el-menu-item>
          <el-menu-item index="manageGrade">
            <i class="el-icon-setting"></i>
            <span slot="title">成绩管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="tobar base_shadow">
          <div class="title">学生在线选课系统</div>
          <el-button class="exit_btn" type="danger" @click="exit">退出</el-button>
        </div>
        <transition>
          <router-view class="router"></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import userInfo from "../subcomponents/userInfo.vue";
export default {
  data() {
    return {};
  },
  components: {
    "user-info": userInfo
  },
  methods: {
    exit() {
      localStorage.clear();
      window.location.href = this.COMMON.login_location;
    },
    select(index) {
      this.$router.push("/teacher/" + index);
    }
  }
};
</script>

<style lang='scss' scoped>
.tobar {
  background-color: #fff;
  margin: -20px;
  line-height: 50px;
  padding: 10px;
  padding-left: 20px;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  .exit_btn {
    margin-right: 20px;
    height: 40px;
    margin-top: 5px;
  }
}
.router {
  margin-top: 40px;
  color: rgba(0, 0, 0, 0.8);
}
</style>