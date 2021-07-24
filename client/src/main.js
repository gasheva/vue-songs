import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import Paginate from 'vuejs-paginate'

import App from './App.vue'
import Loader from './components/Loader'
import router from './router'
import store from './store'

import msgPlugin from './plugins/msg.plugin';
import localeFilter from './filters/localize.filter';
import 'materialize-css/dist/css/materialize.min.css';
// import './assets/css/styles.scss's


Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueMeta)
Vue.use(msgPlugin);
Vue.filter('localize', localeFilter);
Vue.component('paginate', Paginate);
Vue.component('Loader', Loader);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
