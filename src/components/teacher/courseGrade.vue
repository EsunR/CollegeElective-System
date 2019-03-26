<template>
  <div id="courseGrade">
    <h1>
      <router-link style="cursor: pointer" tag="span" to="/teacher/manageGrade">课程信息</router-link>
      > {{courseInfo.name}}
      <span class="tag proptype">{{courseInfo.proptype.toString() | proptype}}</span>
      <span class="tag status">{{courseInfo.status.toString() | status}}</span>
    </h1>
    <div id="main">
      <div class="left">
        <el-row>
          <el-col
            class="card"
            style="margin-top: 10px; margin-left: 10px;"
            v-if="studentData.length == 0"
          >尚未有学生选该课程</el-col>
          <el-col class="student_card" :md="12" :xl="8" v-for="item in studentData" :key="item.id">
            <div class="inner">
              <div class="left">
                <div class="name">{{item.name}}</div>
                <div class="grade">
                  成绩：{{item.grade}}
                  <span v-if="item.grade == null" style="color: #F56C6C">暂无</span>
                </div>
              </div>
              <div class="righ">
                <el-button type="primary" @click="setGrade(item.id)">登录成绩</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <ve-pie :data="chartData"></ve-pie>
        <el-button type="danger" v-if="courseInfo.status == 1" @click="finishedCourse">课程结课</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseInfo: {
        name: "课程名",
        faculityName: "专业名",
        faculityId: "专业ID",
        credit: "10",
        semester: "1",
        proptype: "1",
        teacherName: "格格巫",
        teacherId: "1",
        status: "0"
      },
      studentData: [],
      chartData: {
        columns: ["user", "number"],
        rows: [
          { user: "已登录成绩", number: 0 },
          { user: "未登录成绩", number: 0 }
        ]
      }
    };
  },
  methods: {
    setGrade(id) {
      this.$prompt("请输入学生成绩", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: "成绩格式不正确"
      })
        .then(({ value }) => {
          let obj = {
            courseId: this.$route.params.id.toString(),
            studentId: id.toString(),
            grade: value.toString()
          };
          this.axios
            .post("/setGrade", obj)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  type: "success",
                  message: "成绩登录成功！"
                });
                this.getCourseStudentInfo(this.chartDataInit);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接");
            });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    getCourseInfo() {
      this.axios
        .get("/getCourseInfo?id=" + this.$route.params.id)
        .then(res => {
          if (res.data.code == 1) {
            this.courseInfo = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，课程信息获取失败");
        });
    },
    getCourseStudentInfo(callback) {
      this.axios
        .get("/getCourseStudentInfo?id=" + this.$route.params.id)
        .then(res => {
          if (res.data.code == 1) {
            this.studentData = res.data.data;
            callback();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取学生信息失败");
        });
    },
    chartDataInit() {
      let have_grade = 0;
      let no_grade = 0;
      for (let i in this.studentData) {
        if (this.studentData[i].grade == null) {
          no_grade++;
        } else {
          have_grade++;
        }
      }
      this.chartData.rows[0].number = have_grade;
      this.chartData.rows[1].number = no_grade;
    },
    finishedCourse() {
      this.$confirm(
        "结课后该课程将移出学生课表和教师课表，您确定要结课吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.axios
            .get("/finishedCourse?id=" + this.$route.params.id)
            .then(res => {
              if (res.data.code == 1) {
                this.$router.push("/teacher/manageGrade");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("服务器无法连接，结课失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    }
  },
  mounted() {
    this.getCourseInfo();
    this.getCourseStudentInfo(this.chartDataInit);
  }
};
</script>

<style lang='scss' scoped>
h1 {
  .tag {
    font-size: 16px;
    color: white;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    position: relative;
    top: -2px;
  }
  .proptype {
    background-color: #409eff;
    margin-right: 10px;
  }
  .status {
    background-color: #f56c6c;
  }
}
#main {
  color: #606266;
  margin: 0 -10px;
  display: flex;
  align-items: flex-start;
  .left {
    width: 100%;
    .student_card {
      padding: 10px;
      .inner {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }
  }
  .right {
    width: 40%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    .ve-pie {
      height: 380px !important;
    }
    .el-button {
      display: block;
      margin: 0 auto;
      position: relative;
    }
  }
}
</style>