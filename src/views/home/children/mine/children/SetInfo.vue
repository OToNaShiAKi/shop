<template>
  <div class="setinfo">
    <van-nav-bar title="个人中心" left-arrow @click-left="$router.back()" />
    <van-cell-group title="资料">
      <van-cell center title="头像" is-link>
        <van-image round width="60" fit="cover" height="60" :src="image" />
      </van-cell>
      <van-cell title="昵称" :value="nick" is-link />
      <van-cell title="个性签名" :value="sign" is-link />
      <van-cell title="OID" :value="id" />
    </van-cell-group>
    <van-cell-group title="安全">
      <van-cell title="修改密码" is-link></van-cell>
      <van-cell title="账户安全" is-link></van-cell>
    </van-cell-group>
    <div class="botton-top">
      <van-button block>切换账户</van-button>
      <van-button block @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { Logout } from "@/configs/serve";
import { mapMutations } from "vuex";
import { ResetUserInfo } from "@/store/mutations-type";

export default {
  name: "SetInfo",
  data: () => ({
    image: null,
    nick: null,
    sign: null,
    id: null
  }),
  mounted() {
    let { image, nick, sign } = this.$route.params;
    this.image = image;
    this.nick = nick;
    this.sign = sign;
    this.id = "OToNaShi·AKi";
  },
  methods: {
    ...mapMutations([ResetUserInfo]),
    logout() {
      this.$dialog
        .confirm({ message: "确认退出登录？" })
        .then(async () => {
          const result = await Logout();
          if (result) {
            this[ResetUserInfo]();
            this.$router.replace("/home/checklog");
          }
        })
        .catch(this.$dialog.close);
    }
  }
};
</script>

<style lang="less" scoped>
.setinfo {
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  .botton-top {
    margin-top: 15px;
  }
}
</style>
