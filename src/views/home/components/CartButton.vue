<template>
  <van-button type="info" :size="size" plain round @click="addCart">
    <van-icon size="18px" class-prefix="iconfont icon" name="cart" />
  </van-button>
</template>

<script>
import { AddGoods } from "@/store/mutations-type";
import { mapMutations, mapState } from "vuex";
import { AddGoodsToCart } from "@/configs/serve";

export default {
  name: "CartButton",
  props: {
    good: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  computed: { ...mapState(["user"]) },
  methods: {
    ...mapMutations([AddGoods]),
    addCart() {
      if (!this.user) {
        this.$dialog
          .confirm({ message: "尚未登录，是否前往登陆？" })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.$notify({
              type: "warning",
              message: "未登录无法加入购物车"
            });
          });
        return;
      }
      let good = {
        goods_id: this.good.id,
        goods_price: this.good.price,
        small_image: this.good.small_image,
        goods_name: this.good.name,
        goods_spec: this.good.spec
      };
      AddGoodsToCart(good);
      this[AddGoods](good);
      this.$notify({
        type: "success",
        message: "添加成功！"
      });
    }
  }
};
</script>
