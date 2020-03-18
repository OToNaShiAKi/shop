import {
    filter
} from 'vue'

filter('money', num => `￥${Number(num).toFixed(2)}`);
filter('phoneFormat', phone => `${phone.slice(0, 3)} ${phone.slice(3, 7)} ${phone.slice(7, 11)}`)