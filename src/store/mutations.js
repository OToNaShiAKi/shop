import {
    AddGoods,
    InitUser,
    UpdateShopCart,
    DelAllShop,
    UserInfo,
    ResetUserInfo,
    UpdateAll
} from './mutations-type'

import {
    setItem
} from '@/configs/storage'

import router from '@/configs/router'

export default {
    [AddGoods]: (state, goods) => {
        let ShopCart = state.ShopCart;
        if (ShopCart[goods.goods_id]) ShopCart[goods.goods_id].num++;
        else
            ShopCart[goods.goods_id] = {
                num: 1,
                check: false,
                ...goods
            }
        state.ShopCart = {
            ...ShopCart
        }
        setItem('ShopCart', ShopCart);
    },
    [InitUser]: (state, {
        user,
        shopcart
    }) => {
        state.user = user;
        if (shopcart)
            state.ShopCart = shopcart;
    },
    [UpdateShopCart]: (state, {
        id,
        num,
        check
    }) => {
        let ShopCart = state.ShopCart;
        if (!ShopCart[id]) return;
        if (num == 0) delete ShopCart[id];
        else {
            ShopCart[id].num = num || ShopCart[id].num;
            ShopCart[id].check = check || ShopCart[id].check;
        }
        state.ShopCart = {
            ...ShopCart
        }
        setItem('ShopCart', ShopCart);
    },
    [DelAllShop]: (state, delId) => {
        let ShopCart = state.ShopCart;
        for (let id of delId)
            delete ShopCart[id];
        state.ShopCart = {
            ...ShopCart
        }
        setItem('ShopCart', ShopCart);
    },
    [UserInfo]: (state, user) => {
        state.user = user;
        setItem('user', user);
        router.replace('/');
    },
    [ResetUserInfo]: (state) => {
        state.user = {};
        state.ShopCart = {};
        window.localStorage.removeItem('user');
    },
    [UpdateAll]: (state, bool) => {
        let ShopCart = state.ShopCart;
        for (let key in ShopCart)
            ShopCart[key].check = bool;
        state.ShopCart = {
            ...ShopCart
        }
        setItem('ShopCart', ShopCart);
    }
}