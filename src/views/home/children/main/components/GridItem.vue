<template>
  <section>
    <p class="guess">—————— {{ title }} ——————</p>
    <van-grid gutter="10px" class :border="false" :column-num="2">
      <van-grid-item
        class="guess-width"
        v-for="value in list"
        :key="value.id"
      >
        <cell-item class="grid-cell" :item="value" />
      </van-grid-item>
    </van-grid>
  </section>
</template>

<script>
import CellItem from "./CellItem";

export default {
  name: "GridItem",
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  components: { CellItem }
};
</script>

<style lang="less" scoped>
.guess {
  text-align: center;
  font-size: 15px;
}
.guess-width {
  width: 50%;
  .sale {
    width: 100%;
  }
}
</style>
