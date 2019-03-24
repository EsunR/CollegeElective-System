<template>
<div id='manageFaculty'>
  <h1>管理院系</h1>
  <div class="main">

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      facultyData:[
        {
            id: '1',
            name: '系别名'
        },
        {
            id: '2',
            name: '系别名'
        },
        {
            id: '3',
            name: '系别名'
        },
        {
            id: '4',
            name: '系别名'
        },
        {
            id: '5',
            name: '系别名'
        },
        {
            id: '6',
            name: '系别名'
        },
        {
            id: '7',
            name: '系别名'
        },
        {
            id: '8',
            name: '系别名'
        },
      ]
    }
  },
  methods:{
    getFaculty(){
      // TODO: 获取院系
      this.axios
        .get('/getFaculty')
        .then(res => {
          if (res.data.code == 1) {
            this.facultyData = res.data.data;
          }
      })
      .catch(err => {
        console.log(err);
        this.$message('服务器无法连接');
      });
    }
  }
}
</script>

<style lang='scss' scoped>

</style>