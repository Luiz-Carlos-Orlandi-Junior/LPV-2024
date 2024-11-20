import Vue from "vue";
import Vuex from 'vuex'

import shopping from './modules/shopping'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    shopping,
  }
})

export default store
