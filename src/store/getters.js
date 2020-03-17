export default {
    totalPrice: (state) => {
        let total = 0;
        for (let key in state.ShopCart)
            if (state.ShopCart[key].check)
                total += state.ShopCart[key].num * state.ShopCart[key].goods_price;
        return total * 100;
    },
    totalLength: (state) => {
        let length = 0;
        for (let key in state.ShopCart)
            length += state.ShopCart[key].num;
        return length
    },
    checkLength: (state) => {
        let length = 0;
        for (let key in state.ShopCart)
            if (state.ShopCart[key].check)
                length += state.ShopCart[key].num;
        return length;
    }
}