<template>
  <van-card
    :price="cart.goods_price"
    :title="cart.goods_name"
    :thumb="cart.small_image"
    :desc="cart.spec"
  >
    <van-stepper
      :name="cart.goods_id"
      button-size="24px"
      slot="num"
      integer
      v-model="cart.num"
      @change="update"
    />
    <van-row justify="space-between" type="flex" slot="footer" class="footer-flex">
      <van-checkbox @change="chose" icon-size="16px" v-model="cart.check" />
      <van-icon @click="del" size="16px" class-prefix="iconfont icon" name="delete" />
    </van-row>
  </van-card>
</template>

<script>
import { mapMutations } from "vuex";
import { UpdateShopCart } from "@/store/mutations-type";
import { UpdateGoods, DelUserAddress } from "@/configs/serve";

export default {
  name: "CartItem",
  props: {
    cart: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations([UpdateShopCart]),
    update(num, name) {
      this[UpdateShopCart]({ id: name.name, num });
      UpdateGoods({ id: name.name, num });
    },
    del() {
      this.$dialog
        .confirm({
          message: "确认删除该商品？"
        })
        .then(() => {
          this[UpdateShopCart]({ id: this.cart.goods_id, num: 0 });
          UpdateGoods({ id: this.cart.goods_id, num: 0 });
        })
        .catch(this.$dialog.close);
    },
    chose(check) {
      this[UpdateShopCart]({ id: this.cart.goods_id, check });
      UpdateGoods({ id: this.cart.goods_id, check });
    }
  }
};
</script>

<style>
.footer-flex {
  margin-top: 10px;
}
</style>