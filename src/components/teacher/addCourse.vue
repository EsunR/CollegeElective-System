<template>
  <div id="manageCourse">
    <h1>添加课程</h1>
    <div class="main">
      <div class="title">填写课程信息：</div>
      <hr>
      <el-form :model="form" ref="form" :rules="rules" label-position="top">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="form.courseName" placeholder="请填写该课程的名称"></el-input>
        </el-form-item>

        <el-form-item label="学分" prop="credit">
          <el-input v-model="form.credit" placeholder="请填写选择该课程所能获得的学分"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="课程教授年级" prop="semester">
              <el-select v-model="form.semester" placeholder="请选择">
                <el-option
                  v-for="item in semester"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="课程教授院系" prop="facultyId">
              <el-select v-model="form.facultyId" placeholder="请选择">
                <el-option
                  v-for="item in faculty"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="课程类别" prop="proptype">
              <el-select v-model="form.proptype" placeholder="请选择">
                <el-option label="必修" value="1"></el-option>
                <el-option label="选修" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-button
            type="success"
            round
            icon="el-icon-circle-plus"
            style="margin-top: 20px"
            @click="submit"
          >添加课程</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        courseName: "",
        credit: "",
        semester: "",
        facultyId: "",
        proptype: "",
        teacherId: this.$store.state.uid
      },
      semester: [
        {
          value: 1,
          label: "大一上学期"
        },
        {
          value: 2,
          label: "大一下学期"
        },
        {
          value: 3,
          label: "大二上学期"
        },
        {
          value: 4,
          label: "大二下学期"
        },
        {
          value: 5,
          label: "大三上学期"
        },
        {
          value: 6,
          label: "大三下学期"
        },
        {
          value: 7,
          label: "大四上学期"
        },
        {
          value: 8,
          label: "大四下学期"
        }
      ],
      faculty: [
        {
          id: "1",
          name: "计算机"
        },
        {
          id: "2",
          name: "英语"
        },
        {
          id: "3",
          name: "艺术"
        }
      ],
      rules: {
        courseName: [
          { required: true, message: "请输入课程名称", trigger: ["blur","choose"] }
        ],
        credit: [{ required: true, message: "请输入学分", trigger: ["blur","choose"] }],
        semester: [{ required: true, message: "请选择", trigger: ["blur","choose"] }],
        facultyId: [{ required: true, message: "请选择", trigger: ["blur","choose"] }],
        proptype: [{ required: true, message: "请选择", trigger: ["blur","choose"] }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("您确定要执行此操作吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.addCourse();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "操作已取消"
              });
            });
        } else {
          return false;
        }
      });
    },
    addCourse() {
      // TODO: 添加课程
      this.axios
        .post("/addCourse", this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message("添加成功");
            this.$refs.form.resetFields();
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，添加课程失败");
        });
    },
    getFaculty() {
      this.axios
        .get("/getFaculty")
        .then(res => {
          if (res.data.code == 1) {
            this.faculty = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$message("服务器无法连接，无法获取院系列表");
        });
    }
  },
  mounted() {
    this.getFaculty();
  }
};
</script>

<style lang='scss' scoped>
.main {
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .el-select {
    width: 90%;
  }
}
</style>