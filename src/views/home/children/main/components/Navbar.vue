<template>
  <section>
    <van-row type="flex" align="center">
      <van-search
        shape="round"
        background="#f5f5f5"
        class="flex"
        clearable
        v-model="search"
        placeholder="请输入搜索关键词"
      >
        <van-icon size="16px" slot="left-icon" class-prefix="iconfont icon" name="search" />
      </van-search>
      <van-icon size="20px" class-prefix="iconfont icon" name="locate" />
      <van-col class="text-center" span="5" @click="showPicker = true">{{ city }}</van-col>
    </van-row>
    <van-popup v-model="showPicker" position="bottom">
      <van-area
        :columns-num="2"
        :value="code"
        :area-list="area"
        @confirm="confirm"
        title="选择城市"
        @cancel="showPicker = false"
      />
    </van-popup>
  </section>
</template>

<script>
import area from "@/configs/area";
import { GetCity } from "@/configs/serve";

export default {
  name: "Navbar",
  data: () => ({
    city: "正在定位",
    search: "",
    code: "",
    showPicker: false,
    area
  }),
  methods: {
    confirm(list) {
      this.code = list[1].code;
      this.city = list[1].name.slice(0, list[1].name.length - 1);
      this.showPicker = false;
    }
  },
  async created() {
    const result = await GetCity();
    if (result) {
      this.city = result.city;
      this.code = result.adcode;
    } else this.city = "定位失败";
  }
};
</script>

<style lang="less" scoped>
.flex {
  flex-grow: 1;
}
.text-center {
  text-align: center;
  font-size: 14px;
}
</style>
