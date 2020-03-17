<template>
  <van-button
    @click="to()"
    v-show="show"
    class="to-top"
    type="info"
    round
    plain
  >
    <van-icon class-prefix="iconfont icon" name="top" size="16px" />
  </van-button>
</template>

<script>
export default {
  name: "ToTop",
  created() {
    window.addEventListener(
      "scroll",
      () => {
        const docBody = document.documentElement || document.body;
        this.show = docBody.scrollTop >= 600;
      },
      false
    );
  },
  data: () => ({
    show: false
  }),
  methods: {
    to() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="less" scoped>
.to-top {
  position: fixed;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0;
  right: 20px;
  bottom: 70px;
}
</style>
