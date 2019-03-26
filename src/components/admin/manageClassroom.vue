<template>
  <div id="manageClassroom">
    <h1>管理教室</h1>
    <div class="main">
      <div class="left">
        <div
          class="classroom_card"
          v-for="item in data"
          :key="item.id"
          :style="{background: item.color}"
        >
          <div class="location">位置：{{item.location}}</div>
          <div class="id">教室ID：{{item.id}}</div>
        </div>
      </div>
      <div class="right">
        <div class="title">添加教室</div>
        <el-input placeholder="请输入教室门牌号" v-model="number" class="input-with-select">
          <el-select style="width: 90px;" v-model="select" slot="prepend" placeholder="请选择">
            <el-option v-for="item in build" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-input>
        <el-button class="submit_btn" type="success" icon="el-icon-check" @click="submit" circle></el-button>
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
          id: 1,
          location: "A01-403"
        },
        {
          id: 2,
          location: "A01-403"
        },
        {
          id: 3,
          location: "A02-403"
        },
        {
          id: 4,
          location: "A04-403"
        },
        {
          id: 5,
          location: "A04-403"
        },
        {
          id: 6,
          location: "A05-403"
        },
        {
          id: 7,
          location: "A06-403"
        }
      ],
      select: "",
      number: "",
      build: ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09"]
    };
  },
  methods: {
    // 要在data被挂在前，拦截res.data的数据，然后添加res.data.color属性，再挂载到this.data上
    renderCard(data) {
      let color = ["#FF4366", "#FC9D9B", "#FACDAE", "#C9C8AA", "#84AF9B"];
      for (let i in data) {
        let num = data[i].location.split("-")[0].substr(1);
        let index = parseInt(num) % 5;
        data[i].color = color[index];
      }
      return data;
    },
    getData() {
      this.axios
        .get("/getClassroom")
        .then(res => {
          if (res.data.code == 1) {
            this.data = this.renderCard(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("无法获取教室，服务器无法连接");
        });
    },
    submit() {
      if (this.select == "" || this.number == "") {
        this.$message("教室信息不完整");
        return;
      } else {
        this.$confirm("您确定要执行此操作吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.addClassroom();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "操作已取消"
            });
          });
      }
    },
    addClassroom() {
      let obj = {
        location: `${this.select}-${this.number}`
      };
      console.log(obj);
      this.axios
        .post("/addClassroom", obj)
        .then(res => {
          if (res.data.code == 1) {
            this.$message("添加成功");
            this.select = "";
            this.number = "";
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接");
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang='scss' scoped>
.main {
  display: flex;
  .left {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    .classroom_card {
      width: 31%;
      box-sizing: border-box;
      margin-right: 15px;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      margin-bottom: 20px;
      height: 150px;
      color: white;
      .location {
        font-size: 1.5rem;
        margin-bottom: 15px;
        margin-top: 20px;
      }
    }
  }
  .right {
    position: relative;
    height: 135px;
    width: 30%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    color: rgba(0, 0, 0, 0.8);
    .input-with-select {
      margin-top: 30px;
    }
    .title {
      color: rgba(0, 0, 0, 0.4);
    }
    .submit_btn {
      position: absolute;
      bottom: -25px;
      right: 30px;
      width: 50px;
      height: 50px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    }
  }
}
</style>