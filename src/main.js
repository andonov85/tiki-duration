import Vue from 'vue';
import App from './App.vue';

import { BootstrapVue } from 'bootstrap-vue';
import { store } from "./store.js";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "./styles.css";

// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  // data: function () {
  //   return {
	// 		"amounts":{"years":3,"months":5,"weeks":1,"days":3,"hours":20,"minutes":38,"seconds":9},
	// 		"units":["seconds","minutes","hours","days","weeks","months","years"]
	// 	}
  // },
  beforeMount: function() {
    store.setDuration({
      "amounts":{"years":3,"months":5,"weeks":1,"days":3,"hours":20,"minutes":38,"seconds":9},
      "units":["seconds","minutes","hours","days","weeks","months","years"]
    });
  },
  render: h => h(App),
}).$mount('#app');
