import {
  UserInfo,
  InitUser,
} from "./mutations-type";
import {
  PhoneCodeLogin,
  AccountLogin,
  GetUserInfo,
  GetShopCart
} from "@/configs/serve";
import {
  getItem
} from "@/configs/storage";
import {
  Notify
} from "vant";

export default {
  PhoneCode: async ({
    commit
  }, phone, sms) => {
    const result = await PhoneCodeLogin(phone, sms);
    if (result.success_code == 200) commit(UserInfo, result);
    else
      Notify({
        type: "danger",
        message: result.message
      });
  },
  Account: async ({
    commit
  }, account, pass, code) => {
    const result = await AccountLogin(account, pass, code);
    if (result.success_code == 200) commit(UserInfo, result);
    else
      Notify({
        type: "danger",
        message: result.message
      });
  },
  InitUser: async ({
    commit
  }) => {
    let user = getItem("user") || await GetUserInfo();
    if (user) {
      let shopcart = await GetShopCart() || getItem("ShopCart");
      commit(InitUser, {
        user,
        shopcart
      });
    }
  }
};