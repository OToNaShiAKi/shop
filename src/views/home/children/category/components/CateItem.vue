<template>
  <section>
    <p class="title">{{ title }}</p>
    <van-card
      lazy-load
      v-for="commodity in products"
      :key="commodity.id"
      :price="commodity.price"
      :desc="commodity.spec"
      :title="commodity.name"
      :origin-price="commodity.origin_price"
      :thumb="commodity.small_image"
    >
      <cart-button size="mini" :good="commodity" slot="footer"/>
    </van-card>
  </section>
</template>

<script>
import CartButton from "@/views/home/components/CartButton";

export default {
  name: "CateItem",
  props: {
    title: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  components: { CartButton }
};
</script>

<style lang="less" scoped>
.title {
  color: grey;
  font-size: 12px;
  padding-left: 10px;
}
</style>
