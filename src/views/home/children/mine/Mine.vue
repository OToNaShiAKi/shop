<template>
  <div class="mine">
    <div class="back-image" :style="`background-image: url(${user.image})`">
      <van-nav-bar @click-right="setInfo" :border="false" class="navbar">
        <van-icon size="18" class-prefix="iconfont icon" name="set" slot="right" />
      </van-nav-bar>
      <my-info :nick="user.nick" :image="user.image" :sign="user.sign" />
    </div>
    <van-cell-group>
      <van-cell
        title-class="cell-title"
        value-class="cell-title"
        title="我的订单"
        value="查看全部订单"
        is-link
      >
        <van-icon slot="icon" class-prefix="iconfont icon" name="order" />
      </van-cell>
      <van-grid :column-num="4">
        <van-grid-item v-for="order in orderForm" :key="order.icon" :text="order.text">
          <van-icon slot="icon" class-prefix="iconfont icon" :name="order.icon" />
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-cell-group class="group-margin">
      <van-cell title-class="cell-title" value-class="cell-title" title="优惠券" value="1张" is-link>
        <van-icon slot="icon" class-prefix="iconfont icon" name="coupon" />
      </van-cell>
      <van-cell title-class="cell-title" @click="$refs.pop.showAddress(false)" title="收货地址" is-link>
        <van-icon slot="icon" class-prefix="iconfont icon" name="locate" />
      </van-cell>
    </van-cell-group>
    <van-cell-group v-for="(cell, index) in cellGroup" :key="index" class="group-margin">
      <van-cell
        title-class="cell-title"
        v-for="item in cell"
        :key="item.name"
        :title="item.title"
        is-link
      >
        <van-icon slot="icon" class-prefix="iconfont icon" :name="item.name" />
      </van-cell>
    </van-cell-group>
    <pop-address ref="pop" />
    <transition name="van-slide-right">
      <router-view />
    </transition>
  </div>
</template>

<script>
import MyInfo from "./components/MyInfo";
import PopAddress from "@/components/PopAddress";
import { mapState } from "vuex";

export default {
  name: "Mine",
  components: { MyInfo, PopAddress },
  data: () => ({
    orderForm: [
      {
        icon: "payment",
        text: "代付款"
      },
      {
        icon: "transport",
        text: "待收货"
      },
      {
        icon: "evaluate",
        text: "待评价"
      },
      {
        icon: "refund",
        text: "售后/退款"
      }
    ],
    cellGroup: [
      [
        { title: "联系客服", name: "service" },
        { title: "意见反馈", name: "opinion" }
      ],
      [
        { title: "下载APP", name: "download" },
        { title: "用户协议", name: "agreement" }
      ]
    ]
  }),
  computed: { ...mapState(["user"]) },
  methods: {
    setInfo() {
      let { image, nick, sign } = this.user;
      this.$router.push({ name: "SetInfo", params: { image, nick, sign } });
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  min-height: calc(100vh - 50px);
  .back-image {
    overflow: hidden;
    background: top center/cover no-repeat;
    .navbar {
      background-color: rgba(0, 0, 36, 0.6);
      color: #fff;
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
  .group-margin {
    margin: 10px 0;
  }
  .cell-title {
    font-size: 13px;
    padding-left: 10px;
  }
}
</style>