

<template>
  <section class="empty">
    <van-icon size="180px" slot="icon" class-prefix="iconfont icon" :name="icon" />
    <p class="title">{{ title }}</p>
    <p class="desc">{{ desc }}</p>
  </section>
</template>

<script>
export default {
  name: "Empty",
  props: {
    title: {
      type: String,
      default: "空空如也"
    },
    desc: String,
    icon: {
      type: String,
      default: "tip"
    }
  }
};
</script>

<style lang="less" scoped>
.empty {
  position: absolute;
  left: 50vw;
  top: calc(50vh - 50px);
  transform: translate(-50%, -50%);
  text-align: center;
  color: #999;
  p {
    margin: 0;
  }
  .title {
    font-size: 18px;
  }
  .desc {
    font-size: 12px;
  }
}
</style>