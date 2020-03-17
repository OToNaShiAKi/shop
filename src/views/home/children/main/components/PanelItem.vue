<template>
  <van-panel :title="panel.title" :desc="panel.desc" :status="panel.status">
    <van-row type="flex" class="cell">
      <cell-item :item="value" v-for="value in sale" :key="value.id" />
    </van-row>
  </van-panel>
</template>

<script>
import CellItem from "./CellItem";

export default {
  name: "PanelItem",
  props: {
    panel: {
      type: Object,
      required: true
    },
    sale: {
      type: Array,
      required: true
    }
  },
  components: { CellItem }
};
</script>

<style lang="less" scoped>
.cell {
  flex-wrap: nowrap;
  overflow-y: auto;
  padding-bottom: 15px;
  .sale {
    width: 30%;
  }
}
</style>
