<template>
  <div class="center">
    <van-nav-bar left-arrow class="nav" @click-left="$router.replace('/')" />
    <van-image width="180" :src="require('@/assets/logo.png')" />
    <van-tabs class="tab-margin" v-model="active">
      <van-tab title="手机登陆">
        <van-field maxlength="11" clearable type="tel" label="手机号" v-model="phoneSms.phone">
          <van-icon slot="left-icon" class-prefix="iconfont icon" name="phone" />
        </van-field>
        <van-field maxlength="6" center label="验证码" v-model="phoneSms.sms">
          <van-icon slot="left-icon" class-prefix="iconfont icon" name="message" />
          <van-button
            :disabled="phoneSms.phone.length != 11 || phoneSms.button"
            slot="button"
            size="small"
            type="info"
            @click="sendCode"
          >{{ phoneSms.button ? `已发送(${ phoneSms.countdown }s)` : "发送验证码" }}</van-button>
        </van-field>
        <p class="tip">
          温馨提示：未注册用户使用手机登录，登录时将自动注册，并代表已同意
          <a>服务协议与隐私政策</a>
        </p>
      </van-tab>
      <van-tab title="密码登录">
        <van-field clearable label="账号" v-model="user.account">
          <van-icon slot="left-icon" class-prefix="iconfont icon" name="mine" />
        </van-field>
        <van-field
          @click-right-icon="user.hide = !user.hide"
          :type="user.hide ? 'password' : 'text'"
          clearable
          label="密码"
          v-model="user.pass"
        >
          <van-icon
            slot="right-icon"
            class-prefix="iconfont icon"
            :name="user.hide ? 'hide' : 'show'"
          />
          <van-icon slot="left-icon" class-prefix="iconfont icon" name="password" />
        </van-field>
        <van-field center label="验证码" v-model="user.code">
          <van-icon slot="left-icon" class-prefix="iconfont icon" name="safe" />
          <van-image @click="getCaptcha" width="90" slot="button" :src="user.captcha" />
        </van-field>
        <van-row class="tip" type="flex" justify="space-between">
          <a>忘记密码</a>
          <a>前往注册</a>
        </van-row>
      </van-tab>
    </van-tabs>
    <van-button @click="login" :disabled="loginButton" class="tab-button" type="info" plain round>登录</van-button>
  </div>
</template>

<script>
import { GetPhoneCode } from "@/configs/serve";
import { mapActions } from "vuex";
import { UserInfo } from "@/store/mutations-type";

const phoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
const url = "http://demo.itlike.com/web/xlmc/api/captcha";

export default {
  name: "Login",
  data: () => ({
    active: 0,
    phoneSms: {
      sms: "",
      phone: "",
      button: false,
      countdown: 60
    },
    user: {
      account: "",
      pass: "",
      hide: true,
      code: "",
      captcha: url
    },
    code: ""
  }),
  computed: {
    loginButton() {
      if (this.active) return !(this.user.account && this.user.pass);
      else
        return !(
          this.phoneSms.sms.length == 6 && phoneRule.test(this.phoneSms.phone)
        );
    }
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    ...mapActions(["PhoneCode", "Account"]),
    async sendCode() {
      if (!phoneRule.test(this.phoneSms.phone)) {
        this.$notify({ type: "danger", message: "请输入合法手机号" });
        return;
      }
      this.phoneSms.button = true;
      let timer = setInterval(() => {
        this.phoneSms.countdown--;
        if (this.phoneSms.countdown == 0) {
          this.phoneSms.button = false;
          clearInterval(timer);
        }
      }, 1000);
      this.code = await GetPhoneCode(this.phoneSms.phone);
    },
    login() {
      if (this.active)
        this.Account(this.user.account, this.user.pass, this.user.code);
      else this.PhoneCode(this.phoneSms.phone, this.phoneSms.sms);
    },
    getCaptcha() {
      this.user.captcha = url + "?time=" + new Date().getTime();
    }
  }
};
</script>

<style lang="less" scoped>
.center {
  text-align: center;
  height: 100vh;
  .nav {
    background-color: transparent;
    margin-bottom: 20px;
  }
  .tab-margin {
    margin: 20px 30px 0;
    .tip {
      font-size: 12px;
      text-align: left;
      margin: 10px 15px;
      a {
        color: #1989fa;
      }
    }
  }
  .tab-button {
    margin-top: 20px;
    width: 240px;
  }
}
</style>