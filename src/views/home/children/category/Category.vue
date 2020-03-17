<template>
  <div>
    <van-search
      shape="round"
      background="#f5f5f5"
      clearable
      v-model="search"
      placeholder="请输入搜索关键词"
    >
      <van-icon size="16px" slot="left-icon" class-prefix="iconfont icon" name="search" />
    </van-search>
    <van-tree-select
      class="tree"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="details"
    >
      <van-pull-refresh slot="content" v-model="isLoading" @refresh="details">
        <cate-item
          v-for="item in activeItem"
          :key="item.id"
          :title="item.name"
          :products="item.products"
        />
      </van-pull-refresh>
    </van-tree-select>
  </div>
</template>

<script>
import { CategorySelect, CategoryDetail } from "@/configs/serve";
import CateItem from "./components/CateItem";

export default {
  name: "Category",
  data: () => ({
    active: 0,
    isLoading: true,
    items: [],
    search: "",
    activeItem: []
  }),
  async created() {
    const select = await CategorySelect();
    for (let value of select) {
      let text = value.name;
      delete value.name;
      value.text = text;
    }
    this.items = select;
    this.details(this.active);
  },
  methods: {
    async details(index) {
      this.isLoading = true;
      let params = index || this.active;
      params = params < 9 ? `lk00${params + 1}` : `lk0${params + 1}`;
      const select = await CategoryDetail(params);
      this.isLoading = false;
      this.activeItem = select;
    }
  },
  components: { CateItem }
};
</script>

<style lang="less" scoped>
.tree {
  height: calc(100vh - 104px) !important;
  .van-tree-select__nav-item {
    font-size: 13px !important;
  }
}
</style>
