import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/element.js'
import axios from 'axios'
import { ActionSheet } from 'vant';

Vue.use(ActionSheet);
Vue.config.productionTip = false;
Vue.prototype.$axioss = axios;
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
