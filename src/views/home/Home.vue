<template>
  <div class="home">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home/main">
        <van-icon slot="icon" class-prefix="iconfont icon" name="main" />
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/category">
        <van-icon slot="icon" class-prefix="iconfont icon" name="category" />
        <span>分类</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/cart" :info="totalLength">
        <van-icon slot="icon" class-prefix="iconfont icon" name="cart" />
        <span>购物车</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/mine">
        <van-icon slot="icon" class-prefix="iconfont icon" name="mine" />
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  isLoading: false,
  data: () => ({
    active: "main"
  }),
  computed: {
    ...mapGetters(["totalLength"])
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
}
</style>
