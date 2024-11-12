import store from './stores';
import Vue from "vue";
import router from "src/router";
import App from "src/App.vue";
import Vuetify from 'Vuetify';


Vue.config.productionTip = false;

new Vue ({
  router,
  Vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
