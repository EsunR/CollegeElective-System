<template>
  <div id="studentCourse">
    <h1>学生课表</h1>
    <div class="table">
      <div class="table_head">
        <div class="day">周一</div>
        <div class="day">周二</div>
        <div class="day">周三</div>
        <div class="day">周四</div>
        <div class="day">周五</div>
      </div>
      <div class="table_main">
        <div class="table_aside">
          <div class="time">1</div>
          <div class="time">2</div>
          <div class="time">3</div>
          <div class="time">4</div>
        </div>
        <div class="table_content">
          <div class="class" v-for="(item,index) in data" :key="index">
            <div class="class_inner" v-if="item.id!=''">
              <div class="course">{{item.courseName}}</div>
              <div class="class_info">
                <div class="student">
                  <i class="el-icon-info"></i>
                  {{item.teacherName}}
                </div>
                <div class="classroom">
                  <i class="el-icon-location"></i>
                  {{item.classroom}}
                </div>
              </div>
            </div>
            <div class="no_class" v-if="item.id == ''">无课</div>
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
      data: [
        {
          id: "1",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "1",
          time: "1",
          classroom: "A06-201",
          courseName: "软件工程计算机概论",
          teacherName: "小红红"
        },
        {
          id: "2",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "1",
          time: "2",
          classroom: "A06-201",
          courseName: "软件工程",
          teacherName: "小红红"
        },
        {
          id: "3",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "2",
          time: "3",
          classroom: "A06-201",
          courseName: "软件工程",
          teacherName: "小红红"
        },
        {
          id: "4",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "2",
          time: "4",
          classroom: "A06-201",
          courseName: "软件工程",
          teacherName: "小红红"
        },
        {
          id: "5",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "3",
          time: "1",
          classroom: "A06-201",
          courseName: "软件工程",
          teacherName: "小红红"
        },
        {
          id: "6",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "4",
          time: "2",
          classroom: "A06-201",
          courseName: "软件工程",
          teacherName: "小红红"
        }
      ]
    };
  },
  methods: {
    parseData(data) {
      let finalData = [];
      for (let i = 0; i < 20; i++) {
        finalData[i] = {
          id: "",
          courseId: "",
          classroomId: "",
          day: "",
          time: "",
          classroom: "",
          courseName: ""
        };
      }
      for (let i in data) {
        let day = parseInt(data[i].day);
        let time = parseInt(data[i].time);
        let index = (day - 1) * 4 + time - 1;
        finalData[index] = data[i];
      }
      return finalData;
    },
    getStudentClass() {
      // TODO: 获取学生要上的课节
      this.axios
        .get("/getStudentClass?id=" + this.$store.state.uid)
        .then(res => {
          if (res.data.code == 1) {
            this.data = this.parseData(res.data);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    notify() {
      this.$notify.info({
        title: "提示",
        message: "添加课程并设置上课时间后即可显示教师课表内容",
        customClass: "notifys",
        offset: 100
      });
    }
  },
  mounted() {
    this.getStudentClass();
    // this.data = this.parseData(this.data);
  }
};
</script>

<style lang='scss' scoped>
.table_head {
  padding: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
  display: flex;
  margin-left: 85px;
  .day {
    width: 20%;
    text-align: center;
  }
}
.table_main {
  display: flex;
  .table_aside {
    width: 50px;
    height: 600px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 10px;
    margin-right: 20px;
    .time {
      line-height: 150px;
      text-align: center;
      font-size: 1.5rem;
    }
  }
  .table_content {
    height: 600px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    .class {
      height: 150px;
      width: 20%;
      padding: 10px;
      box-sizing: border-box;
      @media screen and (max-width: 1540px) {
        font-size: 14px;
        .course {
          min-height: 50px !important;
          font-size: 1rem !important;
        }
        .class_info {
          display: block !important;
          line-height: 20px !important;
        }
      }
      .class_inner {
        background-color: #409EFF;
        height: 100%;
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .course {
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
          min-height: 65px;
        }
        .class_info {
          display: flex;
          line-height: 30px;
          color: white;
          .student {
            margin-right: 10px;
          }
        }
      }
      .no_class {
        background-color: rgba(0, 0, 0, 0.05);
        height: 100%;
        border-radius: 10px;
        padding: 20px;
        box-sizing: border-box;
        line-height: 90px;
        text-align: center;
        font-size: 1.2rem;
        font-weight: lighter;
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.notifys {
  background-color: #409eff !important;
  color: #fff !important;
}
</style>