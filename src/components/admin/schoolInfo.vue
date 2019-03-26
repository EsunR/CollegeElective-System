<template>
  <div id="schoolInfo">
    <h1>概览</h1>
    <div class="card student">
      <div class="titel">学生数</div>
      <div class="count">{{this.data.studentNum}}</div>
    </div>
    <div class="card teacher">
      <div class="titel">教师数</div>
      <div class="count">{{this.data.teacherNum}}</div>
    </div>
    <div class="card classroom">
      <div class="titel">教室数</div>
      <div class="count">{{this.data.classroomNum}}</div>
    </div>
    <ve-pie :data="chartData"></ve-pie>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        teacherNum: 99,
        studentNum: 99,
        classroomNum: 100
      },
      chartData: {
        columns: ["用户", "数量"],
        rows: [
          { 用户: "教师用户", 数量: 1393 },
          { 用户: "学生用户", 数量: 3530 }
        ]
      }
    };
  },
  methods: {
    getSchoolInfo(callback) {
      this.axios
        .get("/getSchoolInfo")
        .then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data;
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
    this.getSchoolInfo(() => {
      this.chartData.rows[0].数量 = this.data.teacherNum;
      this.chartData.rows[1].数量 = this.data.studentNum;
    });
  }
};
</script>

<style lang='scss' scoped>
.card {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 40px 40px;
}
.teacher {
  color: #23b7e5;
}
.student {
  background-color: #6c6fc0;
  color: white;
}
.classroom {
  background-color: #23b7e5;
  color: white;
}
.ve-pie {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-size: 1rem !important;
}
</style>