import Vue from 'vue'
import App from './App.vue'
import router from './configs/router'
import store from './store'
import './plugins/vant'
import './plugins/fastclick'
import './configs/filter'
// import './config/rem'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
