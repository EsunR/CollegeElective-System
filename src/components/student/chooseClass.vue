<template>
  <div id="chooseClass">
    <h1>学生选课</h1>
    <div class="main">
      <el-row class="course_box card" :gutter="20">
        <div
          class="title"
        >当前可选课程范围：{{$store.state.faculity}} | {{$store.state.semester | semester}}课程</div>
        <el-col :md="12" :lg="8" :xl="6" v-for="item in courseData" :key="item.id">
          <div class="course" @click="choose(item.id)" :class="{choose:(item.id == chooseCourse)}">
            <div class="group">
              <div class="name">{{item.name}}</div>
            </div>
            <div class="group">
              <div class="faculityName">{{item.faculityName}}</div>
            </div>
            <div class="group">
              <div class="credit">{{item.credit}}学分</div>
              <div class="proptype">{{item.proptype | proptype}}</div>
            </div>
          </div>
        </el-col>
        <transition>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            v-if="flag && chooseCourse != ''"
            @click="submit"
          ></el-button>
        </transition>
      </el-row>
      <div class="class_box card" style="overflow: visible">
        <div class="header">
          <div class="day">周一</div>
          <div class="day">周二</div>
          <div class="day">周三</div>
          <div class="day">周四</div>
          <div class="day">周五</div>
        </div>
        <div class="choose_card">
          <div class="class" v-for="(item,index) in classTable" :key="index">
            <div class="class_inner" v-if="item.id == ''"></div>
            <div class="ban" :class="{choose:item.choose, error:item.error}" v-if="item.id != ''"></div>
          </div>
        </div>

        <transition>
          <div class="card tag" v-if="chooseCourse == ''" style="background:#409EFF">请选择左侧您想要选课的课程</div>
        </transition>

        <transition>
          <div class="card tag" v-if="flag == false" style="background:#F56C6C">该课程与已选课程时间冲突，无法选课</div>
        </transition>

        <transition>
          <div
            class="card tag"
            v-if="flag == true && chooseCourse != ''"
            style="background:#67C23A"
          >本节课为可选状态</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classData: [
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
      ],
      courseData: [
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
      chooseCourseClassData: [
        {
          id: "1",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "1",
          time: "3",
          classroom: "A06-201",
          courseName: "软件工程",
          teacherName: "小红红",
          choose: true
        },
        {
          id: "2",
          courseId: "2",
          classroomId: "2",
          teacherId: "1",
          day: "1",
          time: "5",
          classroom: "A06-202",
          courseName: "软件工程",
          teacherName: "小红红",
          choose: true
        }
      ],
      classTable: [],
      chooseCourse: "",
      flag: true
    };
  },
  methods: {
    getStudentClass() {
      // TODO: 获取教师要上的课节
      this.axios
        .get("/getStudentClass?id=" + this.$store.state.uid)
        .then(res => {
          if (res.data.code == 1) {
            this.classData = res.data.data;
            this.parseData();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getCourseData() {
      // TODO: 获取学生可选课程
      this.axios
        .get(
          `/getChooseCourseList?faculity=${
            this.$store.state.faculity
          }&semester=${this.$store.state.semester}`
        )
        .then(res => {
          if (res.data.code == 1) {
            this.courseData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取学生可选课程失败");
        });
    },
    // parseData:将获取到的classData（学生已选课节）填充数据，转存到classTable中
    parseData() {
      let data = this.classData;
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
      this.classTable = finalData;
    },
    // 连带执行chooseClassToClassData
    choose(id) {
      this.chooseCourse = id;
      // TODO: 测试代码
      this.chooseClassToClassData();
      // TODO: 获取选择课程的课节
      this.axios
        .get("/getClassByCourse?id=" + id)
        .then(res => {
          if (res.data.code == 1) {
            this.chooseCourseClassData = res.data.data;
            this.chooseClassToClassData();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，获取选择课程课节失败");
        });
    },
    chooseClassToClassData() {
      // 1. 清空classTable数据
      this.classTable = [];
      // 2. 调用parseData填充数据
      this.parseData();
      // =====初始化课程表=======

      for (let i in this.chooseCourseClassData) {
        // 3. 为chooseCourseClassData添加choose属性
        this.chooseCourseClassData.choose = true;
        let day = this.chooseCourseClassData[i].day;
        let time = this.chooseCourseClassData[i].time;
        // 5. 将chooseCourseClassData与classData中的数据做比对，如果比对冲突，将this.flag设置为false，并且将冲突的对象添加error: true字段
        this.classData.some(item => {
          if (item.day == day && item.time == time) {
            this.chooseCourseClassData[i].error = true;
            this.flag = false;
            return true;
          }
        });
        // 4. 将chooseCourseClassData中的数据填充到classTable
        day = parseInt(day);
        time = parseInt(time);
        let index = (day - 1) * 4 + time - 1;
        this.classTable[index] = this.chooseCourseClassData[i];
      }
    },
    submit() {
      let obj = {
        uid: this.$store.state.uid.toString(),
        courseId: this.chooseCourse
      };
      // TODO: 学生选课
      this.axios
        .post("/chooseCourse", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.chooseCourse = "";
            this.classTable = [];
            this.parseData();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getStudentClass(); //连带执行parseData
    this.getCourseData();
    // TODO: 删除测试代码
    this.parseData();
  }
};
</script>

<style lang='scss' scoped>
.choose {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
  color: white !important;
}
.error {
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
  color: white !important;
}
.main {
  position: relative;
  display: flex;
  .course_box {
    flex: 1 1 auto;
    margin-right: 20px !important;
    margin-left: 0px !important;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0px;
    .title {
      color: white;
      background-color: #409eff;
      margin: -20px -10px;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 10px 10px 0 0;
    }
    .course {
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 10px;
      box-sizing: border-box;
      border: 3px solid rgba(0, 0, 0, 0.12);
      cursor: pointer;
      font-size: 14px;
      color: #606266;
      .group {
        display: flex;
        line-height: 1.7;
        .name {
          font-size: 20px;
          font-weight: bold;
        }
        .credit {
          margin-right: 10px;
        }
      }
    }
    .el-button {
      width: 50px;
      height: 50px;
      position: absolute;
      bottom: -25px;
      right: 30px;
    }
  }
  .class_box {
    width: 290px;
    height: 240px;
    .header {
      display: flex;
      .day {
        width: 20%;
        font-size: 14px;
        text-align: center;
      }
    }
    .choose_card {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 220px;
      .class {
        width: 20%;
        height: 55px;
        padding: 10px;
        box-sizing: border-box;
        .class_inner {
          height: 100%;
          border-radius: 5px;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }
        .ban {
          height: 100%;
          border-radius: 5px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
  .tag {
    margin: 40px -20px;
    color: white;
  }
}
</style>