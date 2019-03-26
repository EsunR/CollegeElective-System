<template>
  <div id="manageStudent">
    <h1>管理学生</h1>
    <div class="container">
      <div class="left">
        <div class="card student" v-for="(item,index) in studentData" :key="item.id">
          <div class="info">
            <div class="name">系别：{{item.faculity}}</div>
            <div class="account">学号：{{item.account}}</div>
            <el-button
              type="danger"
              size="small"
              style="background: #7266ba; border-color: #7266ba"
              @click="deleteUser(item.id,index)"
            >删除</el-button>
          </div>
          <div class="avant">{{item.name}}</div>
        </div>
        <el-button
          type="primary"
          v-show="this.studentData.length < this.total"
          style="float: right"
          @click="getMore"
        >加载更多</el-button>
      </div>
      <div class="right">
        <ve-pie :data="chartData"></ve-pie>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentData: [],
      chartData: {
        columns: ["用户", "数量"],
        rows: [{ 用户: "已展示用户", 数量: 0 }, { 用户: "未展示用户", 数量: 0 }]
      },
      total: 0,
      page: 1
    };
  },
  methods: {
    getStudentData(callback) {
      this.axios
        .get("/getStudentData?page=" + this.page)
        .then(res => {
          if (res.data.code == 1) {
            this.total = res.data.total;
            this.studentData = [
              ...this.studentData,
              ...res.data.data.studentData
            ];
            callback();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    },
    getMore() {
      this.page++;
      this.getStudentData(() => {
        this.chartData.rows[0].数量 = this.teacherData.length;
        this.chartData.rows[1].数量 = this.total - this.teacherData.length;
      });
    },
    deleteUser(id, index) {
      this.$confirm("您确定要删除该学生吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/deleteUser?id=" + id)
            .then(res => {
              if (res.data.code == 1) {
                this.total--;
                this.studentData.splice(index, 1);
                this.$message("删除成功！");
              }
            })
            .catch(err => {
              console.log(err);
              this.$message("服务器无法连接");
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
    this.getStudentData(() => {
      this.chartData.rows[0].数量 = this.studentData.length;
      this.chartData.rows[1].数量 = this.total - this.studentData.length;
    });
  }
};
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  .left {
    width: 70%;
    .student {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      .avant {
        background-color: #c4c8c9a2;
        width: 100px;
        height: 100px;
        border-radius: 100px;
        line-height: 100px;
        text-align: center;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
        font-size: 1.4rem;
      }
      .info {
        .name {
          color: #99dadc;
          font-size: 1.2rem;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .account {
          color: #969799;
          margin-bottom: 10px;
        }
      }
    }
  }
  .right {
    width: 30%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    height: 350px;
    margin-left: 20px;
  }
}
</style>