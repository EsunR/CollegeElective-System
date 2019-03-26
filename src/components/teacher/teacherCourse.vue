<template>
  <div id="teacherCourse">
    <h1>教师课表</h1>
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
                <div class="teacher">
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
      data: []
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
    getTeacherClass() {
      // TODO: 获取教师要上的课节
      this.axios
        .get("/getTeacherClass?id=" + this.$store.state.uid)
        .then(res => {
          if (res.data.code == 1) {
            this.data = this.parseData(res.data.data);
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
    this.getTeacherClass();
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
        background-color: #e6a23c;
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
          .teacher {
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