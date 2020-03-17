import Vue from 'vue'
import Vant, {
    Lazyload,
    Notify
} from 'vant'
import 'vant/lib/index.css'
import '@/configs/font.css'
Notify.setDefaultOptions({
    duration: 1000
})
Vue.use(Vant).use(Lazyload);