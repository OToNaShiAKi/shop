<template>
  <div class="cart">
    <van-nav-bar fixed right-text="删除选中" title="购物车" @click-right="delAll" />
    <div class="cart-padding" v-if="totalLength">
      <cart-item v-for="cart in ShopCart" :key="cart.goods_id" :cart="cart" />
    </div>
    <empty v-else desc="快去购物吧" />
    <van-submit-bar
      @submit="$router.push('/order')"
      :disabled="!totalPrice"
      class="move"
      :price="totalPrice"
      button-text="提交订单"
    >
      <van-checkbox :disabled="!totalLength" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { DelAllShop, UpdateAll } from "@/store/mutations-type";
import { DelShopCart, UpdateAllShop } from "@/configs/serve";

import Empty from "./components/Empty";
import CartItem from "./components/CartItem";

export default {
  name: "Cart",
  computed: {
    ...mapState(["ShopCart"]),
    ...mapGetters(["totalPrice", "totalLength", "checkLength"]),
    checked: {
      set(value) {
        UpdateAllShop(value);
        this[UpdateAll](value);
      },
      get() {
        return this.checkLength == this.totalLength;
      }
    }
  },
  methods: {
    ...mapMutations([DelAllShop, UpdateAll]),
    delAll() {
      if (!this.totalLength)
        this.$notify({
          type: "warning",
          message: "购物车中无商品"
        });
      else if (!this.totalPrice)
        this.$notify({
          type: "warning",
          message: "未选中任何商品"
        });
      else
        this.$dialog
          .confirm({
            message: "确认删除该商品？"
          })
          .then(() => {
            let delId = [];
            for (let key in this.ShopCart)
              if (this.ShopCart[key].check) delId.push(key);
            this[DelAllShop](delId);
            DelShopCart(delId);
          })
          .catch(this.$dialog.close);
    }
  },
  components: { Empty, CartItem }
};
</script>

<style lang="less" scoped>
.cart {
  height: calc(100vh - 100px);
  position: relative;
  .move {
    bottom: 50px;
  }
  .cart-padding {
    padding: 50px 0 100px;
  }
}
</style>
