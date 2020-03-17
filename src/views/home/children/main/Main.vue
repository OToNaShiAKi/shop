<template>
  <div>
    <navbar />
    <van-pull-refresh v-model="isLoading" @refresh="load">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="swipe in swipes"
          :key="swipe.cid"
          :alt="swipe.public_name"
        >
          <van-image :src="swipe.icon_url" />
        </van-swipe-item>
      </van-swipe>
      <van-grid :column-num="5">
        <van-grid-item
          class="nav-width"
          v-for="nav in middle"
          :key="nav.cid"
          :text="nav.name"
        >
          <van-image
            width="45px"
            slot="icon"
            :src="nav.icon_url"
            :alt="nav.name"
          />
          <span slot="text" class="grid-text van-ellipsis">{{ nav.name }}</span>
        </van-grid-item>
      </van-grid>
      <panel-item :sale="sale" :panel="panel" />
      <grid-item :list="like" title="猜你喜欢" />
    </van-pull-refresh>
    <to-top />
  </div>
</template>

<script>
import { Main } from "@/configs/serve";
import Navbar from "./components/Navbar";
import PanelItem from "./components/PanelItem";
import GridItem from "./components/GridItem";
import ToTop from "@/components/ToTop";

export default {
  name: "Main",
  created() {
    this.load();
  },
  components: {
    Navbar,
    PanelItem,
    GridItem,
    ToTop
  },
  data: () => ({
    isLoading: true,
    swipes: [],
    middle: [],
    sale: [],
    panel: {},
    like: []
  }),
  methods: {
    async load() {
      this.isLoading = true;
      const res = await Main();
      this.swipes = res[0].icon_list;
      this.middle = res[2].icon_list;
      this.sale = res[3].product_list;
      this.like = res[12].product_list;

      const date = new Date().getTime();
      let { start_time, end_time } = res[3],
        status;
      if (date < start_time) status = "未开始";
      else if (date > end_time) status = "已结束";
      else if (date >= start_time && date <= end_time) status = "进行中";
      this.panel = {
        title: res[3].link.data.title,
        desc: res[3].sub_title,
        status
      };
      this.isLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.nav-width {
  width: 20%;
  .grid-text {
    font-size: 10px;
    margin-top: 5px;
  }
}
</style>
