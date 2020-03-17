<template>
  <div class="sale">
    <van-image lazy-load :alt="item.name" :src="item.small_image" />
    <div class="title van-ellipsis">{{ item.name }}</div>
    <div class="price">
      <span class="now">{{ item.price | money }}</span>
      <br />
      <span class="origin">{{ item.origin_price | money }}</span>
    </div>
    <cart-button :good="item"  class="cart" />
  </div>
</template>

<script>
import CartButton from "@/views/home/components/CartButton";

export default {
  name: "CellItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: { CartButton }
};
</script>

<style lang="less" scoped>
.sale {
  flex-shrink: 0;
  padding: 0 10px;
  position: relative;
  .title {
    font-size: 12px;
  }
  .price {
    margin-top: 5px;
    .now {
      font-size: 14px;
      color: rgb(210, 10, 10);
    }
    .origin {
      font-size: 10px;
      text-decoration: line-through;
      color: grey;
    }
  }
  .cart {
    position: absolute;
    right: 15px;
    bottom: 0;
    width: 25px;
    height: 25px;
    padding: 0;
    text-align: center;
    line-height: 25px;
  }
}
</style>
