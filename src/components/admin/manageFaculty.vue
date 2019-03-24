<template>
  <div id="manageFaculty">
    <h1>管理院系</h1>
    <div class="add_box">
      <div class="title">添加院系</div>
      <el-input
        style="margin-top: 20px;"
        placeholder="输入院系名称"
        v-model="facultyName"
        class="input-with-select"
      >
        <el-button slot="append" type="primary" icon="el-icon-circle-plus-outline" @click="submit">添加</el-button>
      </el-input>
    </div>
    <el-row class="faculty_box" :gutter="20">
      <el-col :xl="8" :md="12" :xs="24" v-for="item in facultyData" :key="item.id">
        <div class="list light_shadow">{{item.name}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facultyData: [
        {
          id: "1",
          name: "系别名"
        },
        {
          id: "2",
          name: "系别名"
        },
        {
          id: "3",
          name: "系别名"
        },
        {
          id: "4",
          name: "系别名"
        },
        {
          id: "5",
          name: "系别名"
        },
        {
          id: "6",
          name: "系别名"
        },
        {
          id: "7",
          name: "系别名"
        },
        {
          id: "8",
          name: "系别名"
        }
      ],
      facultyName: ""
    };
  },
  methods: {
    getFaculty() {
      // TODO: 获取院系
      this.axios
        .get("/getFaculty")
        .then(res => {
          if (res.data.code == 1) {
            this.facultyData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    submit(){
      if(this.facultyName != ""){
        this.$confirm(`您确定要添加“${this.facultyName}”到系统吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addFaculty();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          });
        });
      }else{
        this.$message.error('请填写院系名称');
      }
    },
    addFaculty(){
      // TODO: 添加院系
      this.axios
        .post('/addFaculty', {facultyName: this.facultyName})
        .then(res => {
          if (res.data.code == 1) {
            this.$message.success('添加成功');
            this.facultyName = "";
            this.getFaculty();
          }
      })
      .catch(err => {
        console.log(err);
        this.$message('服务器无法连接');
      });
    }
  },
  mounted(){
    this.getFaculty();
  }
};
</script>

<style lang='scss' scoped>
.add_box {
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  .title {
    margin: -40px -20px;
    margin-bottom: 0;
    color: white;
    background-color: #409eff;
    padding: 20px;
  }
}
.faculty_box{
  .list{
    background-color: #409EFF;
    margin-top: 20px;
    padding: 20px;
    border-color: white;
    border-radius: 10px;
    color: white;
    font-size: 1.2rem;
  }
}
</style>