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
  data: function () {
    return {
			duration: {
        // value: {"years":3,"months":5,"weeks":1,"days":3,"hours":20,"minutes":38,"seconds":9},
        value: 108765489000,
        units: ["years","months","days","hours","minutes","seconds","milliseconds"],
        start_stop: true
        // units: ["years","months","weeks","minutes","seconds","milliseconds"],
        // units: ["days","hours","minutes","seconds"]
        // units: ["minutes","seconds"]
      }
		}
  },
  beforeMount: function() {
    store.setInitialDuration(this.duration);
  },
  render: h => h(App),
}).$mount('#app');
