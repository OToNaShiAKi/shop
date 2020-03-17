import axios from "axios";
import { Notify } from "vant";

const baseURL = "http://demo.itlike.com/web/xlmc/api/";

const error = err => {
  console.warn("err", err);
  Notify({
    type: "warning",
    message: "请求失败，请确认网络后重试"
  });
};

//获取主页面全部数据
export const Main = () =>
  axios
    .get(baseURL + "homeApi")
    .then(res => {
      if (res.data.success) return res.data.data.list;
      else throw res;
    })
    .catch(error);

//获取分类页面侧边栏数据
export const CategorySelect = () =>
  axios
    .get(baseURL + "homeApi/categories")
    .then(res => {
      if (res.data.success) return res.data.data.cate;
      else throw res;
    })
    .catch(error);
//获取分类页面商品数据
export const CategoryDetail = (params = "001") =>
  axios
    .get(baseURL + "homeApi/categoriesdetail/" + params)
    .then(res => {
      if (res.data.success) return res.data.data.cate;
      else throw res;
    })
    .catch(error);

/* 以下为任务所需接口 */
const base = ""; //接口基础路径

// 获取手机验证码（生成6位假验证码存session里）
export const GetPhoneCode = phone =>
  axios
    .get(base + "send_code", {
      params: {
        phone
      }
    })
    .then(res => {
      if (res.data.success_code == 200) return res.data.code;
      else throw res;
    })
    .catch(error);

// 手机号登陆
export const PhoneCodeLogin = (phone, code) =>
  axios
    .post(base + "login_code", {
      phone,
      code
    })
    .then(res => res.data)
    .catch(error);
// 账号密码登陆
export const AccountLogin = (user_name, user_pwd, captcha) =>
  axios
    .post(base + "login_pwd", {
      user_name,
      user_pwd,
      captcha
    })
    .then(res => res.data)
    .catch(error);
// 获取用户信息
export const GetUserInfo = () =>
  axios.get(base + "/userinfo").then(res => {
    if (res.data.success_code == 200) return res.data.userInfo;
  });
// 退出登录
export const Logout = () =>
  axios
    .get(base + "/logout")
    .then(res => {
      if (res.data.success_code == 200) return res.data.success_code;
      else throw res;
    })
    .catch(error);

/* 以下购物车内容数据库与前端本地化同步，若后端服务出错，前端调用本地化数据 */
// 添加商品到购物车
export const AddGoodsToCart = good => axios.post(base + "cart/add", good);
// 获取购物车列表数据
export const GetShopCart = () =>
  axios.get(base + "cart/search").then(res => {
    if (res.data.success_code == 200) {
      let shopcart = {};
      for (let item of res.data.shopcart) {
        shopcart[item.id] = item;
        delete shopcart[item.id].id;
      }
      return shopcart;
    }
  });
// 更新购物车商品状态
export const UpdateGoods = good => axios.post(base + "cart/update", good);
// 删除购物车商品
export const DelShopCart = delId =>
  axios.post(base + "cart/clear", {
    delId
  });
// 更新购物车全部商品选中状态
export const UpdateAllShop = bool =>
  axios.post(base + "cart/all", {
    bool
  });
// 更新购物车全部选中商品
export const delAllSelect = () => axios.get(base + "cart/del_checked");

// 获取用户地址列表
export const GetUserAddress = () =>
  axios.get(base + "address/search").then(res => {
    if (res.data.success_code == 200) return res.data.address;
  });
// 编辑用户地址
export const EditUserAddress = address =>
  axios.post(base + "address/add", address);
// 编辑用户地址
export const DelUserAddress = address_id =>
  axios.post(base + "address/add", {
    address_id
  });

// 用户提交订单接口（假支付也不搞了，直接更新成待支付状态）
/* export const PostOrder = (order) => axios.post(base + "order/post", order).then(res => {
  console.log(res);
}).catch(error); */

// 获取订单列表接口
/* export const GetOrder = (user_id, status = "all") => axios.post(base + "order/get", {
  user_id,
  status
}).then(res => {
  console.log(res);
}).catch(error); */

/* 任务内容结束 */

// 获取用户定位
const key = "71bbf31a7e650fb722a34632b8ef6244";
const CityURL = "http://restapi.amap.com/v3/ip";
export const GetCity = () =>
  axios
    .get(CityURL, {
      params: {
        key
      }
    })
    .then(res => {
      if (res.data.status == 1) {
        let { city, adcode } = res.data;
        city = city.slice(0, city.length - 1);
        return {
          city,
          adcode
        };
      } else throw res;
    })
    .catch(error);

/* export const PayOrder = (user_id, order_id) => axios.post(baseURL + "order/change_status", {
  user_id,
  order_id
}).then(res => {
  console.log(res);
}).catch(error); */
