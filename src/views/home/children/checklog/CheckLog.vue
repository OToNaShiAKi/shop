<template>
  <section class="center">
    <van-image width="240" :src="require('@/assets/logo.png')" />
    <van-button to="/login" class="tab-button" plain round type="info">前往登录 / 注册</van-button>
  </section>
</template>

<script>
export default {
  name: "CheckLogin"
};
</script>

<style lang="less" scoped>
.center {
  text-align: center;
  padding-top: 90px;
  height: 100vh;
  box-sizing: border-box;
  .tab-button {
    width: 240px;
    margin-top: 20px;
  }
}
</style>