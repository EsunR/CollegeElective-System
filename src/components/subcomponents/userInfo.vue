<template>
  <div id="userInfo">
    <div class="name">{{$store.state.name}}</div>
    <div class="identity">
      <span>{{$store.state.identity | identity}}</span>
    </div>
    <div class="account">学号/工号：{{$store.state.account}}</div>
    <div class="account" v-if="$store.state.faculity != ''">系别：{{$store.state.faculity}}</div>
    <div class="account semester" v-if="$store.state.semester != ''">学期：{{$store.state.semester | semester}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
#userInfo {
  width: 299px;
  background: #1d2b36;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 2px solid #121f28;
  .name {
    background-color: #6C6FC0;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    line-height: 120px;
    text-align: center;
    margin: 0 auto;
    font-size: 1.5rem;
    margin-bottom: 20px;
    // border: 5px solid white;
    box-shadow: 0 5px 20px rgba(0,0,0,0.8);
  }
  .identity {
    text-align: center;
    position: relative;
    top: -80px;
    span {
      text-align: center;
      font-size: 14px;
      display: inline;
      padding: 3px 10px;
      border-radius: 10px;
      font-weight: bold;
    }
  }
  .account {
    color: rgba(211, 211, 211, 0.664);
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>