<template>
  <div id="addClass">
    <h1>添加上课时间</h1>
    <div class="main">
      <div class="left"></div>
      <div class="right">
        <div class="title">选择教室：</div>
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
        <div class="tag">请选择上方对应的上课时间，灰色区块为不可选择上课时间，提交课程后将不能更改。</div>
        <div class="choose_list">
          <div class="title">已选时间：</div>
          <div class="no_chooseData" v-if="chooseData.length == 0">请选课</div>
          <div class="list" v-for="(item,index) in chooseData" :key="index">
            <div>{{item.day | toWeek}}</div>
            <div>第{{item.time}}节</div>
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
          day: item.day.toString(),
          time: item.time.toString(),
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
</style>