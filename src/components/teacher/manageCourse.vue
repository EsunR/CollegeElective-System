<template>
  <div id="manageCourse">
    <h1>添加课程</h1>
    <div class="main">
      <div class="left">
        <div class="header">
          <div class="day">周一</div>
          <div class="day">周二</div>
          <div class="day">周三</div>
          <div class="day">周四</div>
          <div class="day">周五</div>
        </div>
        <div class="choose_card">
          <div class="class" v-for="(item,index) in data" :key="index">
            <div
              :class="{choose:item.choose}"
              class="class_inner"
              v-if="item.id == ''"
              @click="choose(item,index);"
            ></div>
            <div class="ban" v-if="item.id != ''"></div>
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
      ],
      chooseData: []
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
          day: (i + 1) % 4 == 0 ? (i + 1) / 4 : parseInt((i + 1) / 4 + 1),
          time: (i + 1) % 4 == 0 ? 4 : (i + 1) % 4,
          classroom: "",
          courseName: "",
          choose: false
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
    choose(item, index) {
      this.data[index].choose = !this.data[index].choose;
      if (this.data[index].choose) {
        let obj = {
          day: item.day,
          time: item.time,
          index: index
        };
        this.chooseData.push(obj);
      } else {
        console.log(index);
        for (let i in this.chooseData) {
          if (this.chooseData[i].index == index) {
            this.chooseData.splice(i, 1);
          }
        }
      }
    }
  },
  mounted() {
    this.data = this.parseData(this.data);
  }
};
</script>

<style lang='scss' scoped>
.main {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .left {
    .header{
      display: flex;
      width: 280px;
      padding: 0 10px;
      .day{
        width: 56px;
        font-size: 14px;
        text-align: center;
      }
    }
    .choose_card {
      width: 280px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 200px;
      .class {
        width: 20%;
        height: 50px;
        padding: 10px;
        box-sizing: border-box;
        .class_inner {
          height: 100%;
          border-radius: 5px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;
          &:hover {
            background-color: #67c23a;
            border: 2px solid #67c23a;
          }
        }
        .ban {
          height: 100%;
          border-radius: 5px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          background: rgba(0, 0, 0, 0.5);
          cursor: not-allowed;
        }
        .choose {
          background-color: #67c23a;
          border: 2px solid #67c23a;
        }
      }
    }
  }
}
</style>