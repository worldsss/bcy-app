import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/element.js'
import Vant from "vant"
import axios from 'axios'
import { ActionSheet } from 'vant';
import { Lazyload } from 'vant';
import { Uploader } from 'vant';

Vue.use(Uploader);
Vue.use(Lazyload);
Vue.use(ActionSheet);
Vue.use(Vant)
Vue.config.productionTip = false;
Vue.prototype.$axioss = axios;
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
