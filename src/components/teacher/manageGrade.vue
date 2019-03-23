<template>
  <div id="manageGrade">
    <h1>成绩管理</h1>
    <div class="main">
      <div class="left">
        <div class="title">未结课课程</div>
        <div class="course_box">
          <div class="col" v-for="item in courseData" :key="item.id">
            <div class="course" @click="gotoCourseGrade(item.id)">
              <div class="group">
                <div class="name">{{item.name}}</div>
              </div>
              <div class="group">
                <div class="semester">{{item.semester | semester}}</div>
              </div>
              <div class="group">
                <div class="faculityName">{{item.faculityName}}</div>
              </div>
              <div class="group">
                <div class="credit">{{item.credit}}学分</div>
                <div class="proptype">{{item.proptype | proptype}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">已结课课程</div>
        <div class="course_box">
          <div class="col" v-for="item in courseData_finished" :key="item.id">
            <div class="course" @click="gotoCourseGrade(item.id)">
              <div class="group">
                <div class="name">{{item.name}}</div>
              </div>
              <div class="group">
                <div class="semester">{{item.semester | semester}}</div>
              </div>
              <div class="group">
                <div class="faculityName">{{item.faculityName}}</div>
              </div>
              <div class="group">
                <div class="credit">{{item.credit}}学分</div>
                <div class="proptype">{{item.proptype | proptype}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseData: [
        {
          id: "1",
          name: "软件工程",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "1"
        },
        {
          id: "2",
          name: "计算机组成原理",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "1"
        },
        {
          id: "3",
          name: "课程名",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "1"
        },
        {
          id: "4",
          name: "课程名",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "1"
        },
        {
          id: "5",
          name: "课程名",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "0"
        },
        {
          id: "6",
          name: "课程名",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "0"
        }
      ],
      courseData_finished: [
        {
          id: "1",
          name: "课程名",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "1"
        },
        {
          id: "2",
          name: "课程名",
          credit: "10",
          faculityName: "院系名",
          semester: "1",
          proptype: "1"
        }
      ]
    };
  },
  methods: {
    // TODO: 获取教师已选课程
    getTeacherCourse() {
      this.axios
        .get("/getTeacherCourse?id=" + this.$store.state.uid)
        .then(res => {
          if (res.data.code == 1) {
            this.courseData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取未结课课程失败");
        });
    },
    // TODO: 获取教师未结课课程
    getTeacherCourseFinished() {
      this.axios
        .get("/getTeacherCourseFinished?id=" + this.$store.state.uid)
        .then(res => {
          if (res.data.code == 1) {
            this.courseData_finished = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取教师未结课课程失败");
        });
    },
    gotoCourseGrade(id) {
      this.$router.push("/teacher/manageGrade/" + id);
    }
  },
  mounted() {
    this.getTeacherCourse();
    this.getTeacherCourseFinished();
  }
};
</script>

<style lang='scss' scoped>
.main {
  display: flex;
  align-items: flex-start;
  .title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding-bottom: 10px;
  }
  .left {
    width: 50%;
    margin-right: 30px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .right {
    width: 50%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .course {
      background-color: #6c6fc0 !important;
    }
  }
  .course_box {
    display: flex;
    flex-wrap: wrap;
    margin: 10px -10px;
    .col {
      width: 33.3%;
      padding: 10px;
      box-sizing: border-box;
      .course {
        background-color: #409eff;
        padding: 15px;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        &:hover {
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
        .group {
          display: flex;
          line-height: 1.7;
          font-size: 14px;
          .name {
            font-size: 1.2rem;
            font-weight: bold;
            width: 100%;
          }
          .credit {
            margin-right: 10px;
          }
          .semester {
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid white;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>