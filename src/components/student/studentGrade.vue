<template>
  <div id="studentGrade">
    <h1>查看成绩</h1>
    <div class="card semester" v-for="(item,index) in data" :key="index">
      <div class="title">{{ (index+1).toString() | semester }}</div>
      <el-row :gutter="20">
        <el-col :xl="6" :lg="8" :md="12" v-for="subItem in item" :key="subItem.id">
          <div class="content">
            <div class="course_name">{{subItem.courseName}} | {{subItem.credit}}学分</div>
            <div class="grade">
              分数：{{subItem.grade}}
              <span v-if="subItem.grade == ''">未发放</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      semester: this.$store.state.semester,
      data: []
    };
  },
  methods: {
    getData() {
      for (let i = 1; i <= Number(this.semester); i++) {
        // TODO: 获取学生成绩
        this.axios
          .get(`/getStudentGrade?id=${this.$store.state.uid}&semester=${i}`)
          .then(res => {
            if (res.data.code == 1) {
              this.$set(this.data, i - 1, res.data.data);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message("服务器无法连接，成绩获取失败");
          });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang='scss' scoped>
.semester {
  .title {
    padding-bottom: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .content {
    background-color: #409eff;
    padding: 20px;
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .course_name {
      font-weight: bold;
      padding-right: 10px;
    }
  }
}
</style>