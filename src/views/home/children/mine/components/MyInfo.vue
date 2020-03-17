<template>
  <div class="info">
    <van-image width="75" height="75" round :src="image" fit="cover" />
    <p class="nick">{{ nick }}</p>
    <p class="sign">{{ sign }}</p>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  props: {
    nick: {
      type: String,
      default: "数院科协"
    },
    image: {
      type: String,
      default: "http://118.31.58.18/haru/image/portrait.jpg"
    },
    sign: {
      type: String,
      default: "这个人很懒，什么都没有留下"
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  background-color: rgba(0, 0, 36, 0.6);
  color: #fff;
  padding: 15px;
  text-align: center;
  .nick {
    font-size: 14px;
    margin: 10px 0 5px;
  }
  .sign {
    font-size: 12px;
    margin: 0;
  }
}
</style>
