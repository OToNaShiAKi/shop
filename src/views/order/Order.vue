<template>
  <div class="order">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.back()" />
    <van-contact-card
      :name="address.name"
      :tel="address.tel"
      @click="$refs.pop.showAddress(true)"
      :type="address.hasOwnProperty('id') ? 'edit' : 'add'"
      add-text="选择收货地址"
    />
    <van-cell-group title="订单列表">
      <van-cell :value="`共${checkLength}件`" center is-link>
        <van-row slot="title" type="flex">
          <van-image
            v-for="item in showImage"
            height="60"
            width="60"
            :key="item.id"
            :src="item.src"
          />
        </van-row>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="支付">
      <van-cell title="支付方式" value="微信" is-link />
      <van-cell title="商品金额" :value="totalPrice / 100 | money" />
      <van-cell title="配送费" :value="delivery | money" />
      <van-cell title="选择优惠券" is-link />
    </van-cell-group>
    <van-field
      show-word-limit
      label="备注"
      rows="2"
      type="textarea"
      v-model="remarks"
      clearable
      maxlength="60"
      placeholder="选填，请输入备注信息"
    />
    <van-submit-bar
      label="实付："
      :disabled="!address.hasOwnProperty('id') && !totalPrice"
      :price="totalPrice + delivery * 100"
      button-text="支付订单"
    />
    <pop-address @selected="selected" ref="pop" />
  </div>
</template>

<script>
import PopAddress from "@/components/PopAddress";
import { getItem } from "@/configs/storage";
import { GetUserAddress } from "@/configs/serve";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Order",
  data: () => ({
    remarks: "",
    address: {},
    delivery: 5
  }),
  computed: {
    ...mapGetters(["totalPrice", "checkLength"]),
    ...mapState(["ShopCart"]),
    showImage() {
      let i = 0;
      let image = [];
      for (let key in this.ShopCart) {
        image.push({
          id: this.ShopCart[key].goods_id,
          src: this.ShopCart[key].small_image
        });
        if (++i == 3) break;
      }
      return image;
    }
  },
  components: {
    PopAddress
  },
  methods: {
    selected(item) {
      this.address = item;
    }
  },
  async created() {
    let address = await GetUserAddress();
    if (!address) address = getItem("address");
    for (let item of address)
      if (item.isDefault) {
        this.address = item;
        return;
      }
  }
};
</script>

<style lang="less" scoped>
.order {
  min-height: 100vh;
}
</style>
